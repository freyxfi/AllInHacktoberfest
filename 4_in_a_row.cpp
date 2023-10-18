#include<bits/stdc++.h>

using namespace std;

void print_board(vector<vector<char>> & board){

for(int i  = 0;i<6;i++)
cout<<" ____ ";

cout<<endl;

for(auto rows : board){

    for(auto cols:rows){
        cout<<"|____"<<cols;
    }
    cout<<"|"<<endl;
}
}

bool is_draw(vector<vector<char>> & board ){

for(int i = 0;i<6;i++)
{
    if(board[0][i] == ' ') return false;
}
return true;
}


pair<int,int> play_turn(vector<vector<char>> & board , char player){

int col;
int possible_row = 5;
while(true){
  cout<<"Enter the column you want to drop the ball "<<endl;
  cin>> col;

if(board[0][col] != ' ')
{
    cout<<" The Column is already filled "<<endl;
    cout<<"Enter Another Column "<<endl;
    continue;
}

while(board[possible_row][col] != ' ') possible_row--;
 
 board[possible_row][col] = player;

 break;

}

return { possible_row,col};

}

bool is_win(vector<vector<char>> & board,int row ,int col,char curr){

    int no_of_rows = board.size();
    int no_of_cols = board[0].size();
    int cnt = 0;
    int curr_col = col;
    int curr_row = row;
    int to_left = 0;
    int to_right = 0;


    // counting left.
    while(curr_col >= 0 and board[row][curr_col--] == curr) cnt++;
    to_left = cnt;

    cout<<cnt;

    if(cnt == 4) return true;

    cnt = 0;
    curr_col = col;

    // counting right.
    while(curr_col < no_of_cols and board[row][curr_col++] == curr) cnt++;
    to_right = cnt;
    if(cnt == 4) return true;

    if(to_left + to_right - 1 >=4) return true;

    cnt = 0;
    curr_col = col;

    int to_up = 0;
    int to_down = 0;
    // counting up.

    curr_col = col;
    while(curr_row>=0 and board[curr_row--][col] == curr ) cnt++;
    to_up = cnt;
    cnt = 0;
    if(to_up == 4) return true;

    cnt = 0;
    curr_row = row;
    curr_col = col;
    // counting down.

     while(curr_row<no_of_rows and board[curr_row++][col] == curr ) cnt++;
     to_down = cnt;

      if(to_down == 4) return true;

      if(to_up + to_down - 1 >=4) return true;

      cnt = 0;

      // left diagonals.

      curr_row = row;
      curr_col = col;

      while( curr_row >=0 and curr_row<no_of_rows and curr_col >=0 and curr_col < no_of_cols and board[curr_row--][curr_col--] == curr){
        cnt++;
      }

      int upper_left = cnt;
      cnt = 0;
      if(upper_left == 4) return true;

      int upper_right = 0;

      curr_row = row;
      curr_col = col;

        while( curr_row >=0 and curr_row < no_of_rows and curr_col >=0 and curr_col < no_of_cols and board[curr_row++][curr_col++] == curr){
        cnt++;
      }
      upper_right = cnt;

      if(upper_right == 4) return true;


      if(upper_right+upper_left - 1 >= 4) return true;


      // right diagonals

      curr_row = row;
      curr_col = col;
cnt = 0;
      int lower_right = 0;

       while( curr_row >=0 and curr_row<no_of_rows and curr_col >=0 and curr_col < no_of_cols and board[curr_row--][curr_col++] == curr){
        cnt++;
      }

      lower_right = cnt;
cnt = 0;
      if(lower_right == 4) return true;

        curr_row = row;
      curr_col = col;

      int lower_left = 0;

       while( curr_row >=0 and curr_row<no_of_rows and curr_col >=0 and curr_col < no_of_cols  and board[curr_row++][curr_col--] == curr){
        cnt++;
      }
lower_left = cnt;
      if(lower_left == 4) return true;

      if(lower_left + lower_right - 1 == 4) return true;

      return false;

}

bool is_win2(vector<vector<char>> & board,int row ,int col,char curr){
return false;
}


int main(){

vector<vector<char>> board(6,vector<char>(6,' '));

char player_0 = 'B';
char player_1 = 'R';

int turn = 0;

while(true){

// displaying the board before the user makes the move;
print_board(board);

char current_player = turn == 0 ? player_0 : player_1;

cout<<"      P L A Y E R - "<<turn<<endl;

// letting the player to make his  move.
auto move_made = play_turn(board,current_player);

int row_used  =move_made.first;
int col_used = move_made.second;


// displaying the board after the player had made the move;
print_board(board);

// checking if the player won
if(is_win(board,row_used,col_used,current_player)){

    cout<<" P L A Y E R "<<turn<<"  "<<" W O N "<<endl;
    return 0;

}

// checking for draw..

if(is_draw(board)){
    cout<<"M A T C H - D R A W "<<endl;
    return 0;
}

// change player.
turn ^= 1;

cout<<endl;

}
