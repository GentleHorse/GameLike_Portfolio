import { useRef, useState } from "react";
import * as THREE from "three";
import { clamp, lerp } from "three/src/math/MathUtils.js";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { useMouseCapture } from "../../../hooks/useMouseCapture.js";
import { useKeyboard } from "../../../hooks/useKeyboard.js";

/**
 * INITIAL CHARACTER / CAMERA POSITION
 */
const INITIAL_POSITION = [0, 1.25, 0];

/**
 * INITIAL PARAMS
 */
const MOVE_STRENGTH = 3.0;
const MOVE_VELOCITY = 2.0;
const MAX_MOVE_VELOCITY = 4.5;
const INITIAL_CHARACTER_POSITION = INITIAL_POSITION;
const INITIAL_CAMERA_POSITION = { x: 0, y: 1.7, z: 0 };

/**
 * EXPORT - PLAYER CONTROL
 */
export default function FirstPersonViewControl() {
  const keyboard = useKeyboard();
  const mouse = useMouseCapture();

  return (
    <>
      <Player
        walk={MOVE_VELOCITY}
        jump={5}
        input={() => getInput(keyboard, mouse)}
      />
    </>
  );
}

/**
 * FUNCTION - MOUSE & KEYBOARD INPUT (QWERTY + AZERTY keyboards)
 */
function getInput(keyboard, mouse) {
  let [x, y, z] = [0, 0, 0];

  // Move forward
  if (keyboard["w"] || keyboard["z"] || keyboard["ArrowUp"]) {
    z -= MOVE_STRENGTH;
  }

  // Move backward
  if (keyboard["s"] || keyboard["ArrowDown"]) {
    z += MOVE_STRENGTH;
  }

  // Move leftward
  if (keyboard["a"] || keyboard["q"] || keyboard["ArrowLeft"]) {
    x -= MOVE_STRENGTH;
  }

  // Move rightward
  if (keyboard["d"] || keyboard["ArrowRight"]) {
    x += MOVE_STRENGTH;
  }

  return {
    move: [x, y, z],
    look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight],
    running: keyboard["Shift"],
  };
}

/**
 * COMPONENT - PLAYER
 */
function Player({
  walk = 3, // Default walking speed
  jump = 4, // Default jump force for the player
  input = () => ({ move: [0, 0, 0], look: [0, 0] }), // Function to get the player input
}) {
  const body = useRef(null); // Ref to RigidBody API
  const mesh = useRef(); // Ref to the 3D mesh
  const { scene, camera } = useThree();

  let phi = 0; // Horizontal angle of the camera's orientation
  let theta = 0; // Vertical angle of the camera's orientation

  // Declare reusable, non-persistant variables
  const speed = new THREE.Vector3(walk, jump, walk); // x: leftward / rightward,  y: jump, z: forward / backward
  const offset = new THREE.Vector3(0, 0, 0);
  const gaze = new THREE.Quaternion();
  const yaw = new THREE.Quaternion();
  const pitch = new THREE.Quaternion();
  const cameraOffset = new THREE.Vector3(
    INITIAL_CAMERA_POSITION.x,
    INITIAL_CAMERA_POSITION.y,
    INITIAL_CAMERA_POSITION.z
  );
  const down = new THREE.Vector3(0, -1, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);
  const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), down, 0, 2);

  // Function to update the player's camera orientation based on user input
  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 3;
    const step = 0.3;

    phi = lerp(phi, -x * cameraSpeed, step); // Interpolate horizontal camera rotation
    theta = lerp(theta, -y * cameraSpeed, step); // Interpolate vertical camera rotation
    theta = clamp(theta, -Math.PI / 3, Math.PI / 3); // Set vertical rotation limit

    yaw.setFromAxisAngle(yAxis, phi);
    pitch.setFromAxisAngle(xAxis, theta);
    gaze.multiplyQuaternions(yaw, pitch).normalize();
  };

  // UseFrame
  useFrame(() => {
    if (!body.current || !mesh.current) return;

    const position = body.current.translation();
    const { move, look, running } = input();

    updateOrientation(look); // Update the player's camera orientaion

    raycaster.set(position, down);

    // Calculate the offset vector for the player movements
    offset
      .fromArray(move)
      .normalize()
      .multiply(running ? speed.clone().multiplyScalar(2.5) : speed)
      .applyQuaternion(yaw);

    body.current.applyImpulse(offset, true);

    if (move[0] === 0 && move[2] === 0) {
      body.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
    }

    const newPosition = new THREE.Vector3(position.x, position.y, position.z);
    camera.position.lerp(
      newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );

    camera.quaternion.copy(gaze);
  });

  return (
    <>
      <RigidBody
        ref={body}
        name="player"
        lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
        position={INITIAL_CHARACTER_POSITION}
        linearDamping={5.0}
        angularDamping={3.0}
        friction={0.5}
        restitution={0.2}
        colliders={false}
      >
        <BallCollider ref={mesh} args={[1]} />
      </RigidBody>
    </>
  );
}
