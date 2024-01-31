"""Simple robot controller."""

from controller import Robot

# Variables for the arm movement
angle = 0.0
delta_angle = 0.03

# Getting the robot instance
robot = Robot()
time_step = int(robot.getBasicTimeStep())

# Enabling the LEDs and setting their colors
headLed = robot.getDevice("HeadLed")
eyeLed = robot.getDevice("EyeLed")
headLed.set(0xff0000)
eyeLed.set(0xa0a0ff)

# Main loop
while robot.step(time_step) != -1:
    # Simple logic to swing the arms back and forth
    if angle >= 1.0 or angle <= -1.0:
        delta_angle *= -1
    angle += delta_angle

    robot.getDevice("ArmLowerL").setPosition(angle)
    robot.getDevice("ArmLowerR").setPosition(angle)
