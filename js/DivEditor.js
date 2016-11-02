
import { getCaretCharacterOffsetWithin, setCaretPosition } from 'DomHelpers';

// var editor = new DivEditor({
//     domNode: DOM node which will be editable
//     onEdit: function or undefined
//     transformText: function or undefined <-- Will be called every 50 ms and allowed
//       to transform domNode's HTML, given domNode's textContent. Use this for fancy highlighting
//     detachOnBlur: function or undefined
// });


export default class DivEditor {

    constructor (config) {
        
        this.node = config.domNode;
        this.onedit = config.onEdit;

        this.node.setAttribute('contenteditable', 'true');
        this.node.setAttribute('spellcheck', 'false');

        var that = this;

        this.transformText = config.transformText;
        this.awaitingTransform = false;
        this.transformLatency = 50;
        this.lastText = '';

        this.oneditCb = function(event) {
            
            that.onEdit && that.onEdit.call(that, that.node.textContent);

            // Delay text transform for transformLatency milliseconds
            if (that.transformText && !that.awaitingTransform) {
                that.awaitingTransform = true;
                that.timeout = setTimeout(function () {
                    var text = that.node.textContent;
                    if (text != that.lastText) {
                        var offset = getCaretCharacterOffsetWithin(that.node);
                        var ret = that.transformText(text);
                        if (ret !== undefined) {
                            that.node.innerHTML = ret;
                        }
                        setCaretPosition(that.node, offset);
                        that.lastText = text;
                        that.awaitingTransform = false;
                    }
                }, that.transformLatency);
                
            }
        };

        this.node.addEventListener('input', this.oneditCb);

        this.detachOnBlur = config.detachOnBlur;

        if (this.detachOnBlur) {
            this.node.onblur = function () {
                that.timeout && clearTimeout(that.timeout)
                var text = that.node.textContent;
                that.detach();
                that.detachOnBlur.call(that.node, text);
            };
        }
        
    }

    getText() {
        return this.node.textContent;
    }

    clearText() {
        this.node.innerHTML = '';
    }

    detach() {
        this.node.removeEventListener('input', this.oneditCb);
        this.node.setAttribute('contenteditable', 'false');
        this.interval && clearInterval(this.interval);
    }

};

