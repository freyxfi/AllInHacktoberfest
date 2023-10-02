import random

# List of words for the game
word_list = ["python", "hangman", "programming", "computer", "game", "challenge"]

# Function to choose a random word from the list
def choose_word():
    return random.choice(word_list)

# Function to display the current state of the word
def display_word(word, guessed_letters):
    display = ""
    for letter in word:
        if letter in guessed_letters:
            display += letter
        else:
            display += "_"
    return display

# Main game loop
def hangman():
    print("Welcome to Hangman!")
    word_to_guess = choose_word()
    guessed_letters = []
    attempts_left = 6

    while attempts_left > 0:
        print("\nWord:", display_word(word_to_guess, guessed_letters))
        print("Lives left:", attempts_left)  # Display lives left
        guess = input("Guess a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue

        if guess in guessed_letters:
            print("You've already guessed that letter.")
            continue

        guessed_letters.append(guess)

        if guess in word_to_guess:
            print("Good guess!")
        else:
            print("Wrong guess!")
            attempts_left -= 1

        if "_" not in display_word(word_to_guess, guessed_letters):
            print("\nCongratulations! You've guessed the word:", word_to_guess)
            break

    if attempts_left == 0:
        print("\nGame over! The word was:", word_to_guess)

if __name__ == "__main__":
    hangman()
