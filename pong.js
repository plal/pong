function Pong() {

    this.score   = { width: 800, height: 50 };
    this.field   = { width: 800, height: 500 };
    this.ball    = { x: 0, y: 0, radius:20, vx: 1, vy:1 };

    var margin       = 40;
    var player_width = 20; 

    this.player1 = { x: margin, 
                     y: this.field.height/2, 
                     width:20, 
                     height: 120,
                     score: 0};

    this.player2 = { x: this.field.width - margin, 
                     y: this.field.height/2,
                     width:20, 
                     height: 120,
                     score: 0
                   };


    this.score_element = 
        d3.select("body")
        .append("svg")
        .attr("width", this.score.width)
        .attr("height", this.score.height)
        .style("background-color", "gray");

    this.player1_score_element = 
        this.score_element
        .append("text")
        .text("Green " + this.player1.score)
        .style("font", "Helvetica")
        .style("font-size", "18pt")
        .attr("x", 25)
        .attr("y", 32);

    this.player2_score_element = 
        this.score_element
        .append("text")
        .text("Orange  " + this.player2.score)
        .style("font", "Helvetica")
        .style("font-size", "18pt")
        .attr("x", 600)
        .attr("y", 32);

    this.field_element = 
        d3.select("body")
        .append("svg")
        .attr("width", this.field.width)
        .attr("height", this.field.height)
        .style("background-color", "black");

    this.ball_element  = 
        this.field_element
          .append("circle")
          .attr("transform","translate(" + this.ball.x + "," + this.ball.y + ")")
          .style("fill","white")
          .style("stroke","none")
          .attr("r",this.ball.radius);

    this.player1_element  = 
        this.field_element
          .append("rect")
          .attr("x",this.player1.x - this.player1.width/2.0)
          .attr("y",this.player1.y - this.player1.height/2.0)
          .attr("width",  this.player1.width)
          .attr("height", this.player1.height)
          .style("fill","green")
          .style("stroke","none");

    this.player2_element  = 
        this.field_element
          .append("rect")
          .attr("x",this.player2.x - this.player2.width/2.0)
          .attr("y",this.player2.y - this.player2.height/2.0)
          .attr("width",  this.player2.width)
          .attr("height", this.player2.height)
          .style("fill","orange")
          .style("stroke","none");


    // debugger;

    var that = this;
    d3.select("body")
        .on("keydown",function() {
 // 37      37      37      37      37      Left arrow
 // 38      38      38      38      38      Up arrow
 // 39      39      39      39      39      Right arrow
 // 40      40      40      40      40      Down arrow
            // if (d3.event.keyCode == 37) {
            //     that.update();
            // }
            // else if (d3.event.keyCode == 39) {
            //     that.update();
            // }
            if (d3.event.keyCode == 38) {
                that.player2.y -= 5;
                if (that.player2.y - that.player2.height/2.0 < 0) {
                    that.player2.y = that.player2.height/2.0;
                }
                that.updatePlayers();
            }
            else if (d3.event.keyCode == 40) {
                that.player2.y += 5;
                if (that.player2.y + that.player2.height/2.0 > that.field.height) {
                    that.player2.y = that.field.height - that.player2.height/2.0;
                }
                that.updatePlayers();
            }

            if (d3.event.keyCode == 65) {
                that.player1.y -= 5;
                if (that.player1.y - that.player1.height/2.0 < 0) {
                    that.player1.y = that.player1.height/2.0;
                }
                that.updatePlayers();
            }
            else if (d3.event.keyCode == 90) {
                that.player1.y += 5;
                if (that.player1.y + that.player1.height/2.0 > that.field.height) {
                    that.player1.y = that.field.height - that.player1.height/2.0;
                }
                that.updatePlayers();
            }

        });



    var that = this;
    this.timer = $.timer(function() { 
        that.updateBall();
    }, 1, true);


}

Pong.prototype.updateBall = function() {

    // test if ball hits player
    if (this.ball.x - this.ball.radius == this.player1.x + this.player1.width/2.0) {
        if (this.ball.y >= this.player1.y - this.player1.height/2.0 &&
            this.ball.y <= this.player1.y + this.player1.height/2.0) {
            this.ball.vx = -this.ball.vx;
        }
    }
    else if (this.ball.x + this.ball.radius == this.player2.x - this.player2.width/2.0) {
        if (this.ball.y >= this.player2.y - this.player2.height/2.0 &&
            this.ball.y <= this.player2.y + this.player2.height/2.0) {
            this.ball.vx = -this.ball.vx;
        }
    }

    //
    var newx = this.ball.x + this.ball.vx;
    var newy = this.ball.y + this.ball.vy;

    var goal = 0;

    if (newx < 0) {
        newx = 0;
        this.ball.vx = -this.ball.vx;

        goal = -1;
        this.player2.score += 1;
    }
    else if (newx > this.field.width) {
        newx = this.field.width;
        this.ball.vx = -this.ball.vx;
        this.player1.score += 1;
        goal = 1;
    }

    if (newy - this.ball.radius < 0) {
        newy = this.ball.radius;
        this.ball.vy = -this.ball.vy;
    }
    else if (newy > this.field.height - this.ball.radius) {
        newy = this.field.height  - this.ball.radius;
        this.ball.vy = -this.ball.vy;
    }

    if (goal != 0) {
        this.player1_score_element
            .text("Green " + this.player1.score);

        this.player2_score_element
            .text("Orange " + this.player2.score);

        this.ball.x = this.field.width/2.0;
        this.ball.y = this.field.height/2.0;
        console.log("score: player1 " + this.player1.score + " x " + this.player2.score + " player2");
    }
    else {
        this.ball.x = newx;
        this.ball.y = newy;
    }















    this.ball_element
        .attr("transform","translate(" + this.ball.x + "," + this.ball.y + ")")

}


Pong.prototype.updatePlayers = function() {

    this.player1_element
        .attr("x",this.player1.x - this.player1.width/2.0)
        .attr("y",this.player1.y - this.player1.height/2.0);

    this.player2_element 
        .attr("x",this.player2.x - this.player2.width/2.0)
        .attr("y",this.player2.y - this.player2.height/2.0);

}



// create a pong object
var pong = new Pong();
// pong.update();
