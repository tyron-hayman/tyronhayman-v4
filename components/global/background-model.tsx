"use client";

/**
 * HeadStatueBackground
 * ---------------------------------------------------------------
 * A large, barely-visible marble bust (GLB) floating in a black void.
 * The statue rotates slowly as the page scrolls. Intended as a fixed
 * background layer behind your page content.
 *
 * Deps:  npm i three motion && npm i -D @types/three
 *
 * Setup: copy head.glb to  public/models/head.glb
 *
 * Usage (app/page.tsx or app/layout.tsx):
 *   import HeadStatueBackground from "@/components/HeadStatueBackground";
 *   <HeadStatueBackground />
 *   <main className="relative z-10">...your content...</main>
 */

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

type Props = {
  /** Path to the GLB, served from /public. */
  modelUrl?: string;
  /**
   * Folder containing the Draco decoder files (draco_decoder.js / .wasm,
   * draco_wasm_wrapper.js). Defaults to Google's CDN so it works out of the
   * box. To self-host, copy node_modules/three/examples/jsm/libs/draco/gltf
   * to public/draco/ and pass "/draco/".
   */
  dracoPath?: string;
  /** Overall light strength. 1 = subtle. Raise to reveal more of the statue. */
  intensity?: number;
  /** Total rotation (radians) across the full page scroll. */
  rotationRange?: number;
  /** Starting yaw in radians (0 = facing camera). */
  startAngle?: number;
  /** Rendered height of the whole statue in scene units. Bigger = larger. */
  modelHeight?: number;
  /** Horizontal offset in scene units (+ = right). */
  offsetX?: number;
  /** Vertical offset in scene units (+ = up). Negative shows more of the head. */
  offsetY?: number;
  /** Camera distance; lower = bigger statue. */
  cameraDistance?: number;
  /**
   * Corrects which way the raw model faces. This scan looks toward -X, so it
   * needs +90° (Math.PI / 2) to face the camera.
   */
  modelYaw?: number;
  className?: string;
};

export default function HeadStatueBackground({
  modelUrl = "/models/head.glb",
  dracoPath = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  intensity = 0.3,
  rotationRange = Math.PI * 1.2,
  startAngle = -0.5,
  modelHeight = 4,
  offsetX = 0,
  offsetY = -0.85,
  cameraDistance = 4.4,
  modelYaw = Math.PI / 2,
  className = "",
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Motion: smoothed scroll progress drives the 3D rotation
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 22,
    mass: 1.2,
  });
  const scale = useTransform(smooth, [0, 1], [1, 1.52]);
  const y = useTransform(smooth, [0, 1], ["0%", "-5%"]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    /* scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(
      0x000000,
      cameraDistance + 0.5,
      cameraDistance + 5,
    );

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    /* statue: pivot (scroll rotation) > fit (scale + facing) > model */
    const marble = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.88,
      metalness: 0.0,
    });

    const statue = new THREE.Group(); // receives scroll rotation + offsets
    statue.position.set(offsetX, offsetY, 0);
    statue.visible = false; // shown once the model has loaded
    scene.add(statue);

    let disposed = false;
    let loadedAt = -1; // clock time when the model finished loading
    const clock = new THREE.Clock();

    const draco = new DRACOLoader();
    draco.setDecoderPath(dracoPath);
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((o) => {
            if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).geometry.dispose();
          });
          return;
        }

        const model = gltf.scene;

        // Swap in the marble material (this GLB ships without one)
        model.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.material = marble;
            mesh.frustumCulled = false;
          }
        });

        // Center the model on the origin and normalise its height
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const fit = new THREE.Group();
        fit.scale.setScalar(modelHeight / size.y);
        fit.rotation.y = modelYaw;
        fit.add(model);
        statue.add(fit);

        statue.visible = true;
        loadedAt = clock.getElapsedTime();
      },
      undefined,
      (err) =>
        console.error("[HeadStatueBackground] failed to load model", err),
    );

    /* lights: deliberately dim so the statue is only just perceptible */
    const AMBIENT_I = 0.4;
    const KEY_I = 1; // primary: white, from the left
    const HIGHLIGHT_I = 0.7; // highlight: very subtle, from the right
    const ambient = new THREE.AmbientLight(0x14151a, AMBIENT_I * intensity);
    const key = new THREE.DirectionalLight(0xbe123c, KEY_I * intensity);
    key.position.set(-4, 1.5, 0);
    const rim = new THREE.DirectionalLight(0x4f46e5, HIGHLIGHT_I * intensity);
    rim.position.set(4, 0.8, 1.5);
    scene.add(ambient, key, rim);

    /* sizing */
    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      // keep the statue large on narrow / portrait screens
      camera.position.z = cameraDistance * (camera.aspect < 1 ? 1.25 : 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* loop */
    let raf = 0;
    let visible = true;

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) {
        clock.getDelta();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (!visible) return;
      const t = clock.getElapsedTime();
      const progress = smooth.get(); // 0 → 1 across page scroll

      // Slow fade-up of the lights once the model is in, so it never pops
      const reveal = loadedAt < 0 ? 0 : Math.min(1, (t - loadedAt) / 3);
      const eased = reveal * reveal * (3 - 2 * reveal);
      ambient.intensity = AMBIENT_I * intensity * eased;
      key.intensity = KEY_I * intensity * eased;
      rim.intensity = HIGHLIGHT_I * intensity * eased;

      statue.rotation.y = startAngle + progress * rotationRange;
      if (!reduceMotion) {
        // barely perceptible idle drift
        statue.rotation.y += Math.sin(t * 0.15) * 0.03;
        statue.rotation.x = Math.sin(t * 0.11) * 0.015;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      statue.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) mesh.geometry.dispose();
      });
      marble.dispose();
      draco.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [
    modelUrl,
    dracoPath,
    intensity,
    rotationRange,
    startAngle,
    modelHeight,
    offsetX,
    offsetY,
    cameraDistance,
    modelYaw,
    reduceMotion,
    smooth,
  ]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black ${className}`}
    >
      <motion.div
        ref={mountRef}
        className="absolute inset-0"
        style={{ scale, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      {/* vignette to melt the edges into pure black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
