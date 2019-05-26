function ball(){
  this.x = width/2;
  this.y = height/2;
  this.xv = 7;
  this.yv = 7;
  this.r = 15;
  this.show = function(){
    ellipse(this.x,this.y,this.r,this.r);
  }

  this.move = function(){
    if(this.y < 1)
      this.yv = 5;
    if(this.y >= height)
      this.yv = -5;
    this.y += this.yv;
    this.x += this.xv;
  }

  this.collision = function(p){
    var d = dist(this.x,this.y,p.x,p.y);
    if(d < 35){
      return true;
    }
    return false;
  }

    this.colissionbar = function(p){
    var d = dist(this.x,this.y,p.x,p.y);
    if(d < 35){
      return true;
    }
    return false;
  }
  this.colissionbarext = function(p){
    var d = dist(this.x,this.y,p.x,p.y);
    if(d < 25){
      return true;
    }
    return false;
  }

}
