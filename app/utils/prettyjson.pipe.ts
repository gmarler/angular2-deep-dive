import {Pipe, PipeTransform} from '@angular/core';
import {JsonPipe} from '@angular/common';

@Pipe({name: 'json'})
export class PrettyJsonPipe extends JsonPipe {
  transform(obj:any, spacing=2, highlight=true):string {
    return highlight ? this._syntaxHighlight(obj, spacing) : JSON.stringify(obj, null, spacing);
  }
  private _syntaxHighlight(json, spacing) {
    // Credits to the accepted answer here http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, spacing);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}
