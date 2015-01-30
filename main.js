/**
 * main.js
 * A fun UI component created with React.js.
 * Copyright (C) 2015  James M. Duran
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

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

    if (n < 2) {
        return false;
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
            <div className={"row"}>
                <div className={"col-md-4 col-md-offset-4"}>
                    <div className={"panel panel-primary"}>
                        <Header title={num} />

                        <div className={"panel-body"}>
                            <IsPrime num={num} />
                            <PrimeFactors num={num} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

/**
 * <Header title={title} />
 *
 * Displays an H3 header.
 */
var Header = React.createClass({
    render: function() {
        return (
            <div className={"panel-heading"}>
                <h3 className={"panel-title"}>The number {this.props.title}</h3>
            </div>
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
            <p>
                Is {r}a prime number.
            </p>
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

        if (n < 2) {
            return (
                <p>
                    Has no prime factorization, it's {n} after all!
                </p>
            );
        }

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
            <p>
                Has a prime factorization of: {r}
            </p>
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
            <b>{this.props.num} {mult}</b>
        );
    }
});

// Each request, generate a random number from 0 to 7919 (1000th prime).
var rnd = Math.floor(Math.random() * 7919);
React.render(<PrimeReact num={rnd} />, document.getElementById("prime-react"));
