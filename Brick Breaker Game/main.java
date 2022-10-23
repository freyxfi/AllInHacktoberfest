package brickbreaker;

import javax.swing.JFrame;

public class main {
    public static void main(String[] args) {
        JFrame obj = new JFrame();
        obj.setBounds(10,10,700,600);
        obj.setTitle("BREAKOUT BALL");
        obj.setResizable(false);
        obj.setVisible(true);
        obj.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Gameplay gamePlay = new Gameplay();
        obj.add(gamePlay);
    }
}
