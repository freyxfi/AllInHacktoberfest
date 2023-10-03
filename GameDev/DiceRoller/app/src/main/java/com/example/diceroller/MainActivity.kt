package com.example.diceroller

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import java.util.Random

class MainActivity : AppCompatActivity() {
    lateinit var rollbtn : Button
    lateinit var num : TextView
    lateinit var diceimage : ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        num = findViewById(R.id.textbox)
        rollbtn = findViewById(R.id.button)
        diceimage = findViewById(R.id.dice_image)

        rollbtn.setOnClickListener{
            rolldice()
        }
    }

    private fun rolldice() {
        var random = Random().nextInt(6) + 1
        num.text = random.toString()
        val imagetodisplay = when(random){
            1 -> R.drawable.dice_1
            2 -> R.drawable.dice_2
            3 -> R.drawable.dice_3
            4 -> R.drawable.dice_4
            5 -> R.drawable.dice_5
            else -> R.drawable.dice_6
        }
        diceimage.setImageResource(imagetodisplay)
    }

    }