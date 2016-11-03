
export function $() {
    if (arguments[0] && typeof arguments[0] !== 'string' &&
        typeof arguments[1] === 'string') {
        var args = Array.prototype.slice.call(arguments);
        var node = args.shift();
        return node.querySelectorAll.apply(node, args);
    } else {
        return document.querySelectorAll.apply(document, arguments);
    }
}

// ObjTest should have every property of objSrc
export function hasProps(objSrc, objTest) {
    var ret = true;
    Object.keys(objSrc).forEach( (prop) => {
        ret = ret && objTest.hasOwnProperty(prop);
    } );
    return ret;
}

export function removeChildren(domTarget) {
    while (domTarget.firstChild) {
        domTarget.removeChild(domTarget.firstChild);
    }
}
