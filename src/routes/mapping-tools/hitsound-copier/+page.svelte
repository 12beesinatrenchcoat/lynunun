<script lang="ts">
	// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
	/* eslint-disable unicorn/no-negated-condition -- I promise it makes the code more readable here. */

	// Missing most of the properties, only defining the relevant ones
	type MapLight = {
		notes: Array<{
			hitsounds?: string[];
			timeMs: number;
		}>;
	};

	let source = $state("");
	let dest = $state("");
	let output = $state("");

	let didSourceError: boolean = $state(false);
	let didDestError: boolean = $state(false);

	let buttonText = $state("copy hitsounds");

	const createOutput = () => {
		console.debug("Creating output…");
		let sourceObject: MapLight;
		let outputObject: MapLight;

		try {
			sourceObject = JSON.parse(source!);
			const destObject: MapLight = JSON.parse(dest!);
			outputObject = structuredClone(destObject!);
		} catch {
			// Will be dealt with elsewhere.
			return;
		}

		let j = 0; // Destination notes index
		let hitsoundsCopied = 0;
		let notesSkipped = 0;
		for (let i = 0; i < sourceObject.notes.length; i++) {
			const note = sourceObject.notes[i];
			console.debug(note);

			// Ignore notes without hitsounds.
			if (!note.hitsounds) {
				continue;
			}

			while (j < outputObject.notes.length) {
				if (Math.abs(note.timeMs - outputObject.notes[j].timeMs) < 0.001) {
					if (outputObject.notes[j].hitsounds) {
						console.log(`Note at ${outputObject.notes[j].timeMs} already has hitsounds…`);
						j++;
						notesSkipped++;
						continue;
					}

					outputObject.notes[j].hitsounds = structuredClone(note.hitsounds);
					hitsoundsCopied++;
					break;
				}

				// In case there is no note, and we went over.
				if (note.timeMs - outputObject.notes[j].timeMs < -10) {
					j--;
					break;
				}

				j++;
			}
		}

		output = JSON.stringify(outputObject);
		buttonText = `hitsounds copied! (${hitsoundsCopied} hitsounds copied, ${notesSkipped} notes skipped)`;

		setTimeout(() => {
			buttonText = "copy hitsounds";
		}, 5000);
	};

	$effect(() => {
		try {
			JSON.parse(source);
			didSourceError = false;
		} catch (error) {
			console.error(error);
			didSourceError = true;
		}
	});

	$effect(() => {
		try {
			JSON.parse(dest);
			didDestError = false;
		} catch (error) {
			console.error(error);
			didDestError = true;
		}
	});

	const status = $derived(
		!source
			? "Waiting on source…"
			: didSourceError
				? "Source failed to parse."
				: !dest
					? "Waiting on destination…"
					: didDestError
						? "Destination failed to parse."
						: 'Ready! (Click the "copy hitsounds" button.)'
	);

	let copyButtonText = $state("copy");

	const sourceToClipboard = () => {
		navigator.clipboard.writeText(output).then(() => {
			copyButtonText = "copied!";
			setTimeout(() => {
				copyButtonText = "copy";
			}, 5000);
		});
	};
</script>

<div class="subtitle accent">// the same sounds from one to another</div>
<h1>hitsound copier</h1>

<p>
	This should probably be in the game, but this is something quick and dirty until it actually is.<br
	/>
	Extremely user-unfriendly, sorry.
</p>

<p>
	⚠️ <strong>WARNING</strong>: This was quickly thrown together. It may not work sometimes.
	<strong>Please backup your map files.</strong>
</p>

<h2>inputs</h2>
<section id="inputs">
	<label>
		Source
		<textarea
			name="source-in"
			id="source-in"
			class:error={didSourceError}
			placeholder="Paste in .json"
			bind:value={source}></textarea>
	</label>

	<label>
		Destination
		<textarea
			name="source-in"
			id="source-in"
			class:error={didDestError}
			placeholder="Paste in .json"
			bind:value={dest}></textarea>
	</label>
</section>

<button disabled={didSourceError || didDestError} onclick={createOutput}>{buttonText}</button>

<h2>output</h2>
<section id="output">
	<textarea name="output-out" id="output-out" placeholder={status} bind:value={output}></textarea>

	<span>
		<button onclick={sourceToClipboard}>{copyButtonText}</button>
	</span>
</section>

<style>
	#inputs {
		display: flex;
		flex-direction: row;
		gap: 2ch;
		height: 24em;

		& > * {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}
	}

	#output {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	textarea {
		height: 100%;
		font-family: "IBM Plex Mono", monospace;
	}

	#output {
		height: 36em;
	}

	.error {
		border: 2px solid var(--red);
	}
</style>
