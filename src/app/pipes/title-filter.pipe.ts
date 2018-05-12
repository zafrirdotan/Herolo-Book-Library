import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "titleFilter"
})
export class TitleFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var words = value
      .replace(/[^\w\s]/gi, "")
      .trim()
      .toLowerCase()
      .split(" ");

    var desiredString = words
      .map(word => {
        word = word.trim();
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");

    return desiredString;
  }
}
