package brickbreaker;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class Gameplay extends JPanel implements KeyListener, ActionListener {
    private boolean play = false;
    private int score = 0;
    private int totalBricks = 21;
    private final Timer timer;
    private int delay = 6;
    private int playerX = 310;
    private int ballposX = 120;
    private int ballposY = 350;
    private int ballXdir = -1;
    private int ballYdir = -2;

    private MapGenerator map;

    public Gameplay(){
        map = new MapGenerator(3,7);
        addKeyListener(this);
        setFocusable(true);
        setFocusTraversalKeysEnabled(false);
        timer = new Timer(delay,this);
        timer.start();
    }

    public void paint(Graphics g) {
        g.setColor(new java.awt.Color(242,204,201));
        g.fillRect(1,1,692,592);
        g.setColor(new java.awt.Color(115,29,29));
        g.fillRect(0,0,3,592);
        g.fillRect(0,0,692,3);
        g.fillRect(684,0,3,592);
        g.setColor(new java.awt.Color(56,116,155));
        g.fillRect(playerX, 550,100,8);
        g.setColor(new java.awt.Color(115,29,29));
        g.fillOval(ballposX,ballposY,20,20);
        map.draw((Graphics2D)g);
        g.setColor(new java.awt.Color(56,116,155));
        g.setFont(new Font("sans-serif", Font.BOLD, 25));
        g.drawString(""+score, 590, 30);

        if(totalBricks == 0){
            play = false;
            ballXdir = 0;
            ballYdir = 0;
            g.setColor(new java.awt.Color(56,116,155));
            g.setFont(new Font("serif", Font.BOLD, 30));
            g.drawString("YOU WON!!", 250, 300);

            g.setFont(new Font("serif", Font.BOLD, 20));
            g.drawString("Press ENTER to Restart", 230, 350);
        }

        if(ballposY > 570){
            play = false;
            ballXdir = 0;
            ballYdir = 0;
            g.setColor(new java.awt.Color(56,116,155));
            g.setFont(new Font("serif", Font.BOLD, 30));
            g.drawString("GAME OVER", 230, 300);

            g.setFont(new Font("serif", Font.BOLD, 20));
            g.drawString("Press ENTER to Restart", 230, 350);
        }

        g.dispose();
    }

    @Override
    public void actionPerformed(ActionEvent e){
        timer.start();
        if(play){
            if(new Rectangle(ballposX, ballposY, 20, 20).intersects(new Rectangle(playerX, 550, 100,8))){
                ballYdir = -ballYdir;
            }
            for(int i=0; i<map.map.length; i++){
                for(int j=0; j<map.map[0].length; j++){
                    if(map.map[i][j] > 0){
                        int brickX = j*map.brickWidth + 80;
                        int brickY = i*map.brickHeight + 50;
                        int brickWidth = map.brickWidth;
                        int brickHeight = map.brickHeight;

                        Rectangle rect = new Rectangle(brickX, brickY, brickWidth, brickHeight);
                        Rectangle ballRect = new Rectangle(ballposX, ballposY, 20, 20);
                        Rectangle brickRect = rect;

                        if(ballRect.intersects(brickRect)){
                            map.setBrickValue(0, i, j);
                            totalBricks--;
                            score += 5;

                            if(ballposX + 19 <= brickRect.x || ballposX + 1 >= brickRect.width){
                                ballXdir = -ballXdir;
                            }
                            else{
                                ballYdir = -ballYdir;
                            }
                            break;
                        }
                    }
                }
            }

            ballposX += ballXdir;
            ballposY += ballYdir;
            if(ballposX < 0){
                ballXdir = -ballXdir;
            }
            if(ballposY < 0){
                ballYdir = -ballYdir;
            }
            if(ballposX > 670){
                ballXdir = -ballXdir;
            }
        }
        repaint();
    }
    @Override
    public void keyTyped(KeyEvent e){
    }
    @Override
    public void keyPressed(KeyEvent e){
      if (e.getKeyCode()==KeyEvent.VK_RIGHT){
          if(playerX >=600) playerX = 600;
          else moveRight();
      }
      if (e.getKeyCode()==KeyEvent.VK_LEFT){
          if(playerX <= 10) {playerX = 10;}
          else moveLeft();
      }
      if(e.getKeyCode() == KeyEvent.VK_ENTER){
          if(!play){
             play = true;
             ballposX = 120;
             ballposY = 350;
             ballXdir = -1;
             ballYdir = -2;
             playerX = 310;
             score = 0;
             totalBricks = 21;
             map = new MapGenerator(3,7);
             repaint();
          }
      }
      repaint();
    }
    @Override
    public void keyReleased(KeyEvent e){
    }

    public void moveRight(){
        play = true;
        playerX+=20;
    }
    public void moveLeft(){
        play = true;
        playerX-=20;
    }
}
