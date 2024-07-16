import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { interval, of, repeat, Subject, takeUntil } from "rxjs";

@Component({
  selector: "om-word-morph",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-word-morph.component.html",
  styleUrl: "./ngx-word-morph.component.scss",
})
export class NgxWordMorphComponent implements OnInit, OnDestroy {
  @Input("styleClass")
  styleClass?: string;

  @Input("words")
  set wordsInput(words: string[]) {
    this.words = words;
    this.textIndex = this.words.length - 1;
  }

  @Input("morphDuration")
  morphDuration = 1000;

  @Input("morphDelay")
  morphDelay = 5000;

  words!: string[];
  activeWord!: string;

  private elts!: any;

  private fontSize!: number;

  private textIndex: number = 0;

  ngOnInit(): void {
    if (!this.words || this.words.length <= 0) {
      throw new Error("om-word-morph: No words were passed to the component!");
    }

    if (this.words.length === 1) {
      this.words = [...this.words, ...this.words];
    }

    this.elts = {
      words: document.getElementById("words") as HTMLElement,
      text1: document.getElementById("text1") as HTMLElement,
      text2: document.getElementById("text2") as HTMLElement,
    };

    this.fontSize = parseFloat(
      window
        .getComputedStyle(this.elts.text1, null)
        .getPropertyValue("font-size")
    );

    this.activeWord = this.words[1];

    this.initMorph();
  }

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initMorph(): void {
    this.elts.text2.style.filter = "";
    this.elts.text2.style.opacity = "100%";

    this.elts.text1.style.filter = "";
    this.elts.text1.style.opacity = "0%";

    this.morphText();

    interval(this.morphDelay + this.morphDuration)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.morphText();
      });
  }

  private morphText() {
    let fraction = 0;

    this.elts.words.style.filter = "url(#threshold) blur(0.6px)";

    this.elts.text1.textContent =
      this.words[this.textIndex % this.words.length];
    this.elts.text2.textContent =
      this.words[(this.textIndex + 1) % this.words.length];

    of([])
      .pipe(
        repeat({ count: 100, delay: this.morphDuration / 100 }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        fraction += 1;
        this.setMorph(fraction / 100);

        if (fraction === 50) {
          this.activeWord =
            this.words[(this.textIndex + 1) % this.words.length];
        }

        if (fraction === 100) {
          this.textIndex++;
          this.elts.words.style.filter = "";
        }
      });
  }

  private setMorph(fraction: number) {
    this.elts.text2.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      this.fontSize
    )}px)`;
    this.elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    this.elts.text1.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      this.fontSize
    )}px)`;
    this.elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  }
}
