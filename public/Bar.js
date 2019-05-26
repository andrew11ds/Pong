function Barra(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.show = function(){
    rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
  }
}
