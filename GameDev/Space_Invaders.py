import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
PLAYER_SPEED = 5
BULLET_SPEED = 10
ENEMY_SPEED = 2
ENEMY_COUNT = 5
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Create the window
win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Invaders")

# Player
player_width = 64
player_height = 64
player_x = WIDTH // 2 - player_width // 2
player_y = HEIGHT - player_height - 10
player_x_change = 0

# Bullet
bullet_width = 4
bullet_height = 12
bullet_x = 0
bullet_y = player_y
bullet_y_change = BULLET_SPEED
bullet_state = "ready"  # "ready" or "fire"

# Enemies
enemy_width = 32
enemy_height = 32
enemy_x = [random.randint(0, WIDTH - enemy_width) for _ in range(ENEMY_COUNT)]
enemy_y = [random.randint(50, 150) for _ in range(ENEMY_COUNT)]

# Game Loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Player movement
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                player_x_change = -PLAYER_SPEED
            if event.key == pygame.K_RIGHT:
                player_x_change = PLAYER_SPEED
            if event.key == pygame.K_SPACE and bullet_state == "ready":
                bullet_x = player_x + player_width // 2 - bullet_width // 2
                bullet_state = "fire"

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                player_x_change = 0

    # Player movement
    player_x += player_x_change

    # Boundary check for player
    if player_x < 0:
        player_x = 0
    elif player_x > WIDTH - player_width:
        player_x = WIDTH - player_width

    # Bullet movement
    if bullet_y <= 0:
        bullet_y = player_y
        bullet_state = "ready"

    if bullet_state == "fire":
        pygame.draw.rect(win, WHITE, (bullet_x, bullet_y, bullet_width, bullet_height))
        bullet_y -= bullet_y_change

    # Collision detection
    for i in range(ENEMY_COUNT):
        if (
            enemy_x[i] < bullet_x < enemy_x[i] + enemy_width
            and enemy_y[i] < bullet_y < enemy_y[i] + enemy_height
        ):
            bullet_y = player_y
            bullet_state = "ready"
            enemy_x[i] = random.randint(0, WIDTH - enemy_width)
            enemy_y[i] = random.randint(50, 150)

    # Draw player and enemies
    win.fill((0, 0, 0))
    pygame.draw.rect(win, RED, (player_x, player_y, player_width, player_height))
    for i in range(ENEMY_COUNT):
        pygame.draw.rect(win, WHITE, (enemy_x[i], enemy_y[i], enemy_width, enemy_height))

    pygame.display.update()

# Quit Pygame
pygame.quit()
