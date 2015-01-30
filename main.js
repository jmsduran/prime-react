/**
 * Utility method which returns true if n is prime,
 * false otherwise.
 */
var primenum = function(n) {
    var s = Math.ceil(Math.sqrt(n));
    var isPrime = true;

    if (n == 2) {
        return isPrime;
    }

    for (; s > 1; s--) {
        if (n % s == 0) {
            isPrime = false;
            break;
        }
    }

    return isPrime;
};

/**
 * <PrimeReact num={num} />
 *
 * Main UI component.
 */
var PrimeReact = React.createClass({
    render: function() {
        var num = this.props.num;
        return (
            <div>
                <Header title={num} />
                <IsPrime num={num} />
                <PrimeFactors num={num} />
            </div>
        );
    }
});

/**
 * <Header title={title} />
 *
 * Displays an H2 header.
 */
var Header = React.createClass({
    render: function() {
        return (
            <h2>{this.props.title}:</h2>
        );
    }
});

/**
 * <IsPrime num={num} />
 *
 * Displays text stating whether the given number is prime.
 */
var IsPrime = React.createClass({
    render: function() {
        var n = this.props.num;
        var isPrime = primenum(n);
        var r = (isPrime) ? "" : "not ";

        return (
            <div>
                Is {r}a prime number.
            </div>
        );
    }
});

/**
 * <PrimeFactors num={num} />
 *
 * Module which displays the prime factorization of a number.
 */
var PrimeFactors = React.createClass({
    render: function() {
        var n = this.props.num;
        var s = [];

        for (var i = 2; n > 1;) {
            if (primenum(i) && n % i == 0) {
                s.push(i);
                n = n / i;

            } else {
                i++;
            }
        }

        var r = [];
        var isLast = false;

        for (var i = 0; i < s.length; i++) {
            if (i == s.length - 1) {
                isLast = true;
            }

            r[i] = (function() {
                return (
                    <PrimeNumber num={s[i]} isLast={isLast} />
                );
            })();
        }

        return (
            <div>
                <h3>Prime Factorization:</h3>
                {r}
            </div>
        );
    }
});

/**
 * <PrimeNumber num={num} isLast={isLast} />
 *
 * Child module used by PrimeFactors to display a number
 * followed by a multiplication sign if isLast=false.
 */
var PrimeNumber = React.createClass({
    render: function() {
        var mult = (this.props.isLast) ? "" : " x ";

        return (
            <span>{this.props.num} {mult}</span>
        );
    }
});

React.render(<PrimeReact num="4910" />, document.body);
