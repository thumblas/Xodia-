var invalid=0,last_landed_color=0,i,j,k,same_place_counter=0,d,tempi,tempj,z,bomb_pass1=0,bomb_pass2=0;
var grid = new Array(); //memory allocatioin for the grid
var s="1110212031304140515061607170818060001000400070002000500080003000700040001000600030008000500020004000300020001000800070006000500050006000700080001000200030004000200050008000300060001000400070003000800050002000700040001000600082807270626052504240323022201210";
 
for(i=0;i<8;i++) //grid initialization and display
   {
     grid[i]= new Array();
        for(j=0;j<8;j++)
         {
           grid[i][j]= new Array();

            for(k=0;k<4;k++)
             {
                grid[i][j][k]=s[32*i+4*j+k]; 
               // document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+grid[i][j][k];
             }
           //document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"\t";
          }
     //document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+'<br>';
    }

function bombplacing(i1,j1) //validating bomb placement
{

  if(i1==7*(1-turn%2)) //for player 1 bomb should be in 0th row and for 2nd player 7th row
    {
      document.getElementById("test").innerHTML="valid";
     grid[i1][j1][3]=1;
     return 16;
    }
  else 
  {
    invalid=666;
    document.getElementById("test").innerHTML="invalid position selected!"; //bomb should be placed on valid position
    return invalid;
  }
}

 function validateselection(x,i1,j1)
  {
    if(invalid!=100 && invalid!=200)
    {
   invalid=0;
    //turn++;
                //player moves his own ranger only
   if(grid[i1][j1][1]!=(2-turn%2))  //2-turn%2 gives the player number whose turn it is currently
     {
        invalid=666;
        document.getElementById("test").innerHTML="Select your own ranger!";
        return invalid;
      }
    
  else if(last_landed_color!=grid[i1][j1][2] && turn>3 && x==1)    //ranger should be of correct colour
    {
      invalid=666;
      document.getElementById("test").innerHTML="Wrong coloured ranger selected";
        return invalid;
    }

 else if(x==0)
    {
      if(grid[i1][j1][3]!=1)               //bomb should be present at initial position
        {
          invalid=666;
          document.getElementById("test").innerHTML="Bomb not present at initial position.";
            return invalid;
       }
    }

    
 else if(invalid==0)
   {
     document.getElementById("test").innerHTML="valid"; //if valid move
       return invalid;
   }

}
  }


  function validatelanding(x,i1,j1,i2,j2) //validating landing
  {
    if(invalid!=100 && invalid!=200)
    {
  invalid=16;
    if(turn%2==0)
      d=-1;         //player 2 moves upwards. i decreases that's why d is negative
   else d=1; 
   
   if(x==1)
   {
      if(grid[i2][j2][1]!=0 && (i1!=i2 || j1!=j2)) //landing position should be empty, should not be same as initial position
        { 
         invalid=666;
         document.getElementById("test").innerHTML="Landing position not empty.";
        return invalid;
         
  
        }

    else if((turn%2==1 && i2<i1) || (turn%2==0 && i2>i1))   //backward movement
     {
        invalid=666;
        document.getElementById("test").innerHTML="Backward movement not allowed.";
        return invalid;
 
      }

    else if(i1==i2 && j1==j2)   //same place
     {
        z=parseInt(i1)+parseInt(d);

        if(((j1>0 && j1<7 && z>=0 && z<=7) && (grid[z][j1-1][1]==0 || grid[z][parseInt(j1)+1][1]==0 || grid[z][j1][1]==0)) || ((j1==0 && z>=0 && z<=7) && (grid[z][parseInt(j1)+1][1]==0 || grid[z][j1][1]==0)) || ((j1==7 && z>=0 && z<=7)&&(grid[z][j1-1][1]==0 || grid[z][j1][1]==0))) //checking whether ranger is blocked or not
          {
            invalid=666;
            document.getElementById("test").innerHTML="Not allowed to land on same place unless blocked.";
            return invalid; 
          }

            
        for(i=0;i<8;i++)                                      //finding the bomb
          {
            for(j=0;j<8;j++)
              {
                if(grid[i][j][1]==(2-turn%2) && grid[i][j][3]==1)
                  {
                    //document.getElementById("test3").innerHTML=document.getElementById("test3").innerHTML+"found"+i+j;
                    break;
                  }
              }
            if(j<8)
              break;
          }

          
        for(tempi=i+1;tempi<8;tempi++)  //checking if downward passing can be done
          {
            if(grid[tempi][j][1]==2-(turn+1)%2)
              {
                break;
              }
            if(grid[tempi][j][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
                
              }
          }

        for(tempi=i-1;tempi>=0;tempi--)    //checking if upward passing can be done
          {
            if(grid[tempi][j][1]==2-(turn+1)%2)
              {
                break;
              }
            if(grid[tempi][j][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              
              }
          }

        for(tempj=j+1;tempj<8;tempj++)     // checking if passing towards right is possible or not
          {
            if(grid[i][tempj][1]==2-(turn+1)%2)
              {
                break;
              }
            if(grid[i][tempj][1]==2-turn%2)
              {
               invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              }
          }

        for(tempj=j-1;tempj>=0;tempj--)     //checking if passing towards left is possible or not
          {
            if(grid[i][tempj][1]==2-(turn+1)%2)
             {
                break;
              }
            if(grid[i][tempj][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              }
          }

        for(tempi=i+1,tempj=j+1;tempi<8,tempj<8;tempi++,tempj++)  //right down
          {
            if(grid[tempi][tempj][1]==2-(turn+1)%2)
             {
                break;
              }
            if(grid[tempi][tempj][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              }
          }

        for(tempi=i-1,tempj=j-1;tempi>=0,tempj>=0;tempi--,tempj--)  //left up
          {
            if(grid[tempi][tempj][1]==2-(turn+1)%2)
             {
                break;
              }
            if(grid[tempi][tempj][1]==2-turn%2)
            {
              invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
            }
          }

        for(tempi=i-1,tempj=j+1;tempi>=0,tempj<8;tempi--,tempj++) //right up
         {
           if(grid[tempi][tempj][1]==2-(turn+1)%2)
             {
               break;
              }
            if(grid[tempi][tempj][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              }
          }


        for(tempi=i+1,tempj=j-1;tempi<8,tempj>=0;tempi++,tempj--)  //left  down
         {
            if(grid[tempi][tempj][1]==2-(turn+1)%2)
             {
                break;
             }
            if(grid[tempi][tempj][1]==2-turn%2)
              {
                invalid=666;
                document.getElementById("test").innerHTML="Not allowed to land on same place if bomb passing is possible!";
                return invalid;
              }
         }


        if(invalid==16)
            {same_place_counter++;

            }

        }

          //ranger should move either forward or diagonally forward
      else if(!(j1==j2 || i2-i1==j2-j1 || i2-i1==j1-j2))
        {
          invalid=666;
           document.getElementById("test").innerHTML="Movement in wrong direction!";
           return invalid;
          //document.getElementById("test3").innerHTML="invalid15";
        }

      //if ranger moves forward,
      else if(j2==j1)
        {
          for(z=parseInt(i1)+parseInt(d);z!=i2;z=z+parseInt(d)) //for checking that he does not move over another ranger
            {
              if(grid[z][j2][1]!=0)
                {
                   invalid=666;
           document.getElementById("test").innerHTML="Movement over another ranger not allowed!";
           return invalid;

                }
            }

          same_place_counter=0;   //set to zero if his move is valid ie he moves forward and not on the same place
        }

      else if((i2-i1==j2-j1 || i2-i1==j1-j2) && j2<j1)  //diagonal left movement
       {
          for(z=parseInt(i1)+parseInt(d),j=j1-1;z!=i2,j>j2;z=z+parseInt(d),j--) //i increases if d==1 ie for first player and i decreases if d==-1 ie for second player
            {
              if(grid[z][j][1]!=0)  //ie if there is a ranger present at that place
                {
                   invalid=666;
           document.getElementById("test").innerHTML="Movement over another ranger not allowed!";
           return invalid;
                }
            }
          same_place_counter=0;
        }

      else if((i2-i1==j2-j1 || i2-i1==j1-j2) && j2>j1)  //diagonal right movement
       {
         for(z=parseInt(i1)+parseInt(d),j=parseInt(j1)+1;z!=i2,j<j2;z=z+parseInt(d),j++)   //i increases if d==1 ie for first player and i decreases if d==-1 ie for second player
           {
              if(grid[z][j][1]!=0)                 //ie if there is a ranger present at that place
                {
                  invalid=666;
           document.getElementById("test").innerHTML="Movement over another ranger not allowed!";
           return invalid;
                }
            }
          same_place_counter=0;
       }
  }

  else if (x==0)
   {
     if(i2-i1>0) //for direction
        d=1;
      else d=-1;


     if(grid[i2][j2][1]!=(2-turn%2)) //bomb should land on your own ranger
    {
      invalid=666;
       document.getElementById("test").innerHTML="Bomb should land on your ranger only!";
       return invalid;
    }

    else if(i1==i2 && j1==j2)               //initial position and final position of bomb can't be the same
      {
               invalid=666;
       document.getElementById("test").innerHTML="Bomb cant land on the same place!";
       return invalid;
      }

    else if(!(i1==i2 || j1==j2 || i2-i1==j2-j1 || i2-i1==j1-j2))  //bomb should be passed either vertically,horizontally or diagonally
      {
       invalid=666;
       document.getElementById("test").innerHTML="Wrong bomb passing direction.";
       return invalid;

      }

    else if(j2==j1)                           //vertical movement
      {
        for(i=parseInt(i1)+parseInt(d);i!=i2;i=i+parseInt(d))
          {
             if(grid[i][j2][1]!=0)
               {
                     invalid=666;
       document.getElementById("test").innerHTML="Bomb cant be passed over another ranger.";
       return invalid;
                }
          }
      }

    else if(i2==i1)                          //horizontal movement
      {
        if(j2-j1>0) //for direction(left or right)
          d=1;
        else d=-1;

        for(j=parseInt(j1)+d;j!=j2;j=j+parseInt(d))
          {
            if(grid[i2][j][1]!=0)
              {
                invalid=666;
       document.getElementById("test").innerHTML="Bomb cant be passed over another ranger.";
       return invalid;
              }
          }
      }

    else if((i2-i1==j2-j1 || i2-i1==j1-j2) && j2<j1)  //diagonal left
      {
        for(i=parseInt(i1)+parseInt(d),j=j1-1;i!=i2,j>j2;i=parseInt(i)+parseInt(d),j--)      //if d==1, left down. if d==-1, left up
          {
            if(grid[i][j][1]!=0)
              {
                invalid=666;
       document.getElementById("test").innerHTML="Bomb cant be passed over another ranger.";
       return invalid;
              }
          }
      }

    else if((i2-i1==j2-j1 || i2-i1==j1-j2) && j2>j1)   //diagonal right
      {
        for(i=parseInt(i1)+parseInt(d),j=parseInt(j1)+1;i!=i2,j<j2;i=parseInt(i)+parseInt(d),j++)        //if d==1, right down. if d==-1, right up
         {
           if(grid[i][j][1]!=0)
             {
                invalid=666;
       document.getElementById("test").innerHTML="Bomb cant be passed over another ranger.";
       return invalid;
              }
          }
      }

       //continuous bomb passing condition
            if(bomb_pass1>=15 && turn%2!=0)
            {
                invalid=200;
                winflag=2;
            document.getElementById("test").innerHTML="Player 1 is out due to exceeding continuous bomb passing limit."+'<br>'+"PLAYER 2 WINS!!";
            //return invalid;
            }
            else if(bomb_pass2>=15)
            {
                invalid=100;
                winflag=1;
              document.getElementById("test").innerHTML="Player 2 is out due to exceeding continuous bomb passing limit."+'<br>'+"PLAYER 1 WINS!!";
              //return invalid;
            }


    }
          
  if(same_place_counter==2)   //players consecutively landing in the same place =>deadlock
    {
      //invalid=666;
      winflag=2-(turn+1)%2;
      document.getElementById("test").innerHTML="deadlock: player "+(2-turn%2)+" loses."+'<br>'+"PLAYER "+2-(turn+1)%2+" WINS!!";
      //return invalid;
    }


    if(invalid==16) //Making changes in the grid if valid move is played
      {
        var colour=parseInt(grid[i1][j1][3]*8)+parseInt(grid[i1][j1][2]-1);


         if(x==1 && (i1!=i2 || j1!=j2))
           {
              for(k=1;k<4;k++)
               {
                  grid[i2][j2][k]=grid[i1][j1][k];
                }
              for(k=1;k<4;k++)
                {
                  grid[i1][j1][k]=0;
                }
           }



          else if(x==0)
            {
              grid[i2][j2][3]=1;
              grid[i1][j1][3]=0;
              if(turn%2==1)
              {
                bomb_pass1++;
              }
              else bomb_pass2++;
            }

          if(x==1)
          {
             if(turn%2==1)
               bomb_pass1=0;
            else if(turn%2==0)
            {
              bomb_pass2=0;
            }
          }

        last_landed_color=grid[i2][j2][0];

       //winning condition
       if(2-turn%2==1 && i2==7  && grid[7][j2][3]==1)
          {
          	invalid=100;
            winflag=1;
            document.getElementById("test").innerHTML="PLAYER 1 WINS!!";
           // return invalid;
          }
        else if(2-turn%2==2 && i2==0 && grid[0][j2][3]==1)
          {
          	invalid=200;
            winflag=2;
            document.getElementById("test").innerHTML="PLAYER 2 WINS!!";
           // return invalid;

          }
          
          return colour;
    }
  }


}