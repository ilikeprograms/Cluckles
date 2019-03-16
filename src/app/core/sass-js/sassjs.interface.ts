export interface ISassJsCompileCallbackResult {
  files: Array<string>;
  map: {
    file: string;
    mappings: string;
    names: Array<any>;
    sourceRoot: string;
    sources: Array<string>;
    sourcesContent: Array<string>;
    version: number;
  };
  status: number;
  text: string;
}

export interface ISassJs {
  setWorkerUrl: (workerUrl: string) => void;
  preloadFiles: (base: string, directory: string, files: Array<string>, callback: () => void) => void;
  compile: (textToCompile: string, callback: (compilationResult: ISassJsCompileCallbackResult) => void) => void;
}
