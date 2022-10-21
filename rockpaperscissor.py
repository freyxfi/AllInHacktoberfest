import random

Rock=('''
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
''')

Paper=('''
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
''')

Scissors=('''
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
''')

game_ascii = [Rock, Paper, Scissors]

user_move = int(input("What do you choose for rock 0, for paper 1 for scissors 2.:-"))
print(game_ascii[user_move])

computer_move = random.randint(0,2)

print("computer chose")
print(game_ascii[computer_move])

if user_move == 0 and computer_move == 2:
    print("You Win!")
elif computer_move == 0 and user_move == 2:
    print("You lose")
elif computer_move > user_move:
    print("You Lose")
elif user_move > computer_move:
    print("You Win")
elif computer_move == user_move:
    print("it's a draw")
else:
    print("You Typed an invalid number")


