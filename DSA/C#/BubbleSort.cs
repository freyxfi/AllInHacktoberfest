using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BubbleSort
{
    class Program
    {
        static void sort(int[] arr)
        {
            int n = arr.Length;
            bool swapped;

            do
            {
                swapped = false;

                for (int i = 1; i < n; i++)
                {
                    if (arr[i - 1] > arr[i])
                    {
                        // Swap the elements
                        int temp = arr[i - 1];
                        arr[i - 1] = arr[i];
                        arr[i] = temp;
                        swapped = true; 
                    }
                }
                n--;
            } while (swapped);
        }
        static void printArray(int[] array) { 
        foreach (int i in array){
        Console.WriteLine(i);
        }
        }
        static void Main(string[] args)
            {
                int[] arr = { 55, 44, 33, 22, 11 };
                sort(arr);
                Console.WriteLine("Sorted array:");
                printArray(arr);
                Console.ReadKey();
            }
    }
}
