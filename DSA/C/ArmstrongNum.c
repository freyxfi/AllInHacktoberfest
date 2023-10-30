#include<stdio.h>
#include<conio.h>
main()
{
	int n,temp,rev,rem;
	printf("Enter any number:");
	scanf("%d",&n);
	temp=n;
	rev=0;
	while(n!=0){
		rem=n%10;
		rev=rev+rem*rem*rem;
		n=n/10;
	}
	if(temp==rev)
		printf("Given number is armstrong number.");
	else 
		printf("Given number is not armstrong number.");
}
