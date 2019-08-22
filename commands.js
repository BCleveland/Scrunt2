module.exports = 
{
    rotate: function(chain, commandQueue)
    {
        let deg = parseFloat(commandQueue.shift());
        chain.rotate("black", deg);
    },
    wave: function(chain, commandQueue)
    {
        let amp = parseFloat(commandQueue.shift());
        let length = parseFloat(commandQueue.shift());
        chain.wave(amp, length);
    }
}