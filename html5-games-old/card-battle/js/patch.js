// give querySelectorAll the same forEach feature from Array.
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach; // mozilla bug that returns HTMLCollection instead of NodeList https://bugzilla.mozilla.org/show_bug.cgi?id=14869

Node.prototype.onAnimationEnd = function(callback) {
  var listener = function(e){
    e.target.removeEventListener('webkitAnimationEnd', listener);
    callback(e);
  }
  this.addEventListener('webkitAnimationEnd', listener);
}
Node.prototype.onTransitionEnd = function(callback) {
  var listener = function(e){
    e.target.removeEventListener('webkitTransitionEnd', listener);
    callback(e);
  }
  this.addEventListener('webkitTransitionEnd', listener);
}