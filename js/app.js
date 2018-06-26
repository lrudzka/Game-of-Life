document.addEventListener('DOMContentLoaded', function() {


    var buttPlay = document.getElementById('play');
    var buttPause = document.getElementById('pause');
    var play = 0;
    var pause = 0;
    var inputChange = document.querySelectorAll('fieldset input');

    function GameOfLife(bw, bh) {
        this.width = bw;
        this.height = bh;
        this.board = document.getElementById('board');
        this.cell = [];
        this.createBoard = function () {

            this.board.style.width = (this.width * 10)+"px";
            this.board.style.height = (this.height * 10)+"px";
            var divNumber = bw * bh ;

            for (var i=0; i<divNumber; i++) {
                var newDiv = document.createElement("div");
                this.board.appendChild(newDiv);
                this.cell.push(newDiv);
            }

            for (var i=0; i<this.cell.length; i++) {

                this.cell[i].addEventListener('click', function() {

                    if ( play === 0) {

                        if ( inputChange[0].checked) {

                            this.classList.toggle('live');

                        }

                    }

                });

                this.cell[i].addEventListener('mouseenter', function() {

                    if ( play === 0) {

                        if ( inputChange[1].checked) {

                            this.classList.toggle('live');

                        } else if (inputChange[2].checked ) {

                            this.classList.add('live');
                        } else if (inputChange[3].checked) {
                            this.classList.remove('live');
                        }

                    }

                });


            }

        }

        // indeks - na podstawie współrzędnych x i y odczytywany jest odpowiedni indeks z tabeli cell
        this.index = function(x, y) {
            var num = x + y * this.width;
            return this.cell[num];
        }

        this.computeCellNextState = function(x,y) {

            var divToCheck = this.index(x,y);

            var sumNeighborsAlive = 0;


            var divToCheckAlive = divToCheck.className.indexOf('live');

                // sąsiad 1

                if ( x>0 && y>0) {

                    var n1 = this.index(x - 1, y - 1);

                     if (n1.className.indexOf('live') >= 0) {
                         sumNeighborsAlive++;
                         }

                }

                // sąsiad 2

                if (y>0) {

                    var n2 = this.index(x, y - 1);

                    if (n2.className.indexOf('live') >= 0) {
                        sumNeighborsAlive++;
                        }

                }


                // sąsiad 3

                if (x<(this.width-1) && y>0) {

                    var n3 = this.index(x + 1, y - 1);

                    if (n3.className.indexOf('live') >= 0) {
                         sumNeighborsAlive++;
                        }

                }

                // sąsiad 4

                if (x>0) {

                    var n4 = this.index(x - 1, y);

                     if (n4.className.indexOf('live') >= 0) {
                          sumNeighborsAlive++;
                        }
                }

                // sąsiad 5

                if (x<(this.width-1)) {

                    var n5 = this.index(x + 1, y);

                    if (n5.className.indexOf('live') >= 0) {
                        sumNeighborsAlive++;
                        }
                }

                // sąsiad 6

                if (x>0 && y<(this.height-1)) {

                    var n6 = this.index(x - 1, y + 1);

                    if (n6.className.indexOf('live') >= 0) {
                        sumNeighborsAlive++;
                        }
                }

                // sąsiad 7

                if (y<(this.height-1)) {

                    var n7 = this.index(x, y + 1);

                    if (n7.className.indexOf('live') >= 0) {
                        sumNeighborsAlive++;
                        }

                }

                // sąsiad 8


                if (x<(this.width-1) && y<(this.height-1)) {

                    var n8 = this.index(x + 1, y + 1);

                    if (n8.className.indexOf('live') >= 0) {
                        sumNeighborsAlive++;
                        }
                }

             if (divToCheckAlive < 0 ) { // komórka jest nieżywa

                    if (sumNeighborsAlive === 3) {
                        return 1;
                    } else {
                        return 0;
                    }

             } else  { // komórka jest żywa

                    if (sumNeighborsAlive === 2 || sumNeighborsAlive===3) {

                        return 1;
                 } else {

                        return 0;
                 }

             }



        }

        this.computeNextGeneration = function() {

            var nextGenerationArray = [];

            var arrayValue = 0;

            for (var i=0; i<this.height; i++) { // kolejne wiersze ->  współrzędna y

                for (var j=0; j<this.width; j++) { // kolejne kolumny -> współrzędna x

                    arrayValue = this.computeCellNextState(j,i);

                    nextGenerationArray.push(arrayValue);


                }
            }

            return nextGenerationArray;
        }

        this.printNextGeneration = function() {

            var valueArray = this.computeNextGeneration();

            for (var i=0; i<this.cell.length; i++) {

                if (valueArray[i] === 0 ) {

                    this.cell[i].classList.remove('live');

                } else {

                    this.cell[i].classList.add('live');
                }
            }
        }


    } // koniec obiektu GameOfLife

  //  var game = new GameOfLife(boardWidth, boardHeight);

  //    game.createBoard();




    var sectionStart = document.getElementById('start');

    var sectionGameSet = document.getElementById('game-set');

    var sectionBoardSet = document.getElementById('board-set');

    var buttStart = document.getElementById('start-btn');

    var inputRowNumber = document.getElementById('row-number');

    var inputColNumber = document.getElementById('col-number');

    var alert = document.querySelector('.alert');

    var game = null;

     buttStart.addEventListener('click', function(event) {

           event.preventDefault();

           if (inputRowNumber.value <=0 || inputColNumber.value <=0 ) {

               alert.innerText = "wartości muszą być większe od zera";

           } else if (inputRowNumber.value >70 || inputColNumber.value >70 ) {

               alert.innerText = "wartości nie mogą przekraczać 70";

           } else if ( inputRowNumber.value!= parseInt(inputRowNumber.value)) {


               alert.innerText = "wartości muszą być całkowite";


           }  else  {


               game = new GameOfLife(inputColNumber.value, inputRowNumber.value);

               game.createBoard();

               sectionStart.style.display = 'none';

               sectionGameSet.style.display = 'block';

               sectionBoardSet.style.display = 'block';

            }
     });






    var intervalId = null;



    buttPlay.addEventListener('click', function() {


        if ( play === 0 ) {

            this.classList.add('clicked');

            buttPause.classList.remove('clicked');

            intervalId = setInterval(function() {

                game.printNextGeneration();

            }, 300);

            play = 1;

        }



    });

    buttPause.addEventListener('click', function() {

        this.classList.toggle('clicked');

        if ( play = 1) {

            buttPlay.classList.remove('clicked');

            buttPause.classList.add('clicked');

            clearInterval(intervalId);

            play = 0;

        }

    });











   // ***************** KONIEC ***************
});