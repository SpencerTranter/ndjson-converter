# ndjson-converter

This program takes in folder of JSON files and creates a single file with each of the original files taking up a new line as a flattened object. This new file is then to be used by googles dataprep.

### Installation
```
npm Install
```

### Usage

1) Add a folder of JSON files to the project directory and re-name the folder `input`.

2) Run `$node index.js` to start the program.

3) A new file will be created in the `output` directory named as the date-time it was created.
