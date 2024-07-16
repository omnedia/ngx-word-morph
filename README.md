# Ngx Word-Morph Component

`@omnedia/ngx-word-morph` is an Angular library designed to facilitate word morphing animations within Angular applications.

## Features
- Morph words within your Angular application.
- Easily customizable.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-word-morph
```

## Usage

Import the `NgxWordMorphComponent` in your Angular module:

```typescript
import { NgxWordMorphComponent } from '@omnedia/ngx-word-morph';

@Component({
  ...
  imports: [
    ...
    NgxWordMorphComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-word-morph [words]="['Hello', 'World']" styleClass="custom-class"></om-word-morph>
```

## API

```html
<om-word-morph
  [words]="words"
  [morphDuration]="morphDuration"
  [morphDelay]="morphDelay"
  styleClass="your-custom-class"
></om-word-morph>
```

Starts the word morphing effect.

- `words`: An array of strings to be animated.
- `morphDuration`: (optional): The duration of the morphing animation in milliseconds. Default is 1000.
- `morphDelay`: (optional): The delay between morphing one word to the next in milliseconds. Default is 5000.
- `styleClass`: (optional): Add a class to the `<div>` wrapper tag.

## Styling
If you want to style the text, do it globally via the `styleClass`. <br>
To change the font size make sure to change the `--om-word-morph-font-size` variable instead of directly changing the size.

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.