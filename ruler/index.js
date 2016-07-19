String.prototype.visualLength = function() {
        var ruler = document.getElementById("ruler");
        ruler.innerHTML = this;
        return ruler.offsetWidth;
}
var text = "beijing";
var len = text.visualLength();
console.log(len);