# Angular 2 Deep Dive

This is the source code accompanying the Angular 2 Deep Dive course.
This repository is based on [Antony Budianto's Angular 2 starter](https://github.com/antonybudianto/angular2-starter)

## Getting started

1. Clone the repository using `git clone https://mchauvinc@bitbucket.org/mchauvinc/angular2-deep-dive.git`
1. Change to the repo's directory `cd angular2-deep-dive`
1. Checkout out the tag corresponding to the video you are viewing, for the first video use `git checkout tags/s1v2`
1. Install dependencies: `npm install && bower install`
1. Run the server with `gulp`

Note that at the beginning of the Section 1 Video 2, the code will simply show an orange spinner in the browser.

## Common issues

1. **I see over 100 semantics errors in TypeScript and a SystemJS error in the browser**  
Please make sure that you have checked out the tag for the first video using `git checkout tags/s1v2` and then re-install the npm dependencies
1. **I see around 50 semantics errors in TypeScript only, mostly related to Promises**  
In general, semantics errors are non-blocking, meaning you can proceed safely. However to fix those errors, please use [this response](https://bitbucket.org/mchauvinc/angular2-deep-dive/issues/1/compile-error-on-initial-clone)
1. **`npm i && bower i` gave a permissions related issue and I had to run the command with `sudo`**  
Do not proceed. Remove the entire `angular2-deep-dive` directory and start fresh from the "clone" step. If you are still facing problems with npm install, please [open an issue](https://bitbucket.org/mchauvinc/angular2-deep-dive/issues/new)
1. **From video 6.1 or 6.2, I see "angular2-prettyjson not found"**  
Please run `npm i` to install the new dependency. If the `package.json` file doesn't include `angular2-prettyjson` as a dev dependency, run `npm i angular2-prettyjson`
1. **Section 4 doesn't work with Angular 2 version X.**  
Section 4 was created for Angular 2 RC 1 as the "new" router was announced. Sadly, shortly after, the "new new" router was chosen for RC2. I am waiting for the router project to stabilize (at least RC) before re-recording this section. What you learn in section 4 will still be relevant to understanding the new new router.
1. **Section 6 uses the old form module**  
Similar to section 4 and the router, late changes have been decided by the Angular team on forms. Once the "new" angular forms stabilizes, I will re-record this section. What you learn in section 6 will still be relevant to understanding the new forms module. As of Angular 2 RC2, the old forms still work with a deprecation notice

## Use tags to get the correct code

For each video, the easiest way to grab the correct code is using tags. Tags are all using the main release, currently Angular 2 RC 1.
Use `git checkout tags/sNvM` where N is the section number, and M the video number e.g. s3v2.
All videos also have a sNvM_end tag which allows you to see the working code at the end of the video.
The sNvM_extras tag corresponds to the "extra" section of each video.

Below are the sections, videos and corresponding tags:

| Section                             | Video                                                   | Start tag | End tag  | Extras tag  |
|-------------------------------------|---------------------------------------------------------|-----------|----------|-------------|
| 1. Head first into Angular 2        | Introduction                                            | -         | -        | -           |
| 1. Head first into Angular 2        | The <root> of all things                                | s1v2      | s1v2_end | s1v2_extras |
| 1. Head first into Angular 2        | To TypeScript or not to TypeScript, that is no question | s1v3      | s1v3_end | s1v3_extras |
| 2. It's all about components        | One-way data binding                                    | s2v1      | s2v1_end | s2v1_extras |
| 2. It's all about components        | Binding to events                                       | s2v2      | s2v2_end | s2v2_extras |
| 2. It's all about components        | Creating your own component                             | s2v3      | s2v3_end | s2v3_extras |
| 2. It's all about components        | I/O: Component data and event emitters                  | s2v4      | s2v4_end | s2v4_extras |
| 2. It's all about components        | Content projection                                      | s2v5      | s2v5_end | s2v5_extras |
| 2. It's all about components        | Directives                                              | s2v6      | s2v6_end | s2v6_extras |
| 3. Injectables and providers        | Build-in services                                       | s3v1      | s3v1_end | s3v1_extras |
| 3. Injectables and providers        | Creating an Injectable                                  | s3v2      | s3v2_end | s3v2_extras |
| 3. Injectables and providers        | The Power of Providers                                  | s3v3      | s3v3_end | s3v3_extras |
| 3. Injectables and providers        | Hierarchy of Injectors                                  | s3v4      | s3v4_end | s3v4_extras |
| 3. Injectables and providers        | Testing a service                                       | s3v5      | s3v5_end | s3v5_extras |
| 4. Routing through the app          | Creating routes                                         | s4v1      | s4v1_end | s4v1_extras |
| 4. Routing through the app          | Routing with parameters                                 | s4v2      | s4v2_end | s4v2_extras |
| 4. Routing through the app          | Child routing                                           | s4v3      | s4v3_end | s4v3_extras |
| 4. Routing through the app          | Lifecycle hooks                                         | s4v4      | s4v4_end | s4v4_extras |
| 5. Pipes                            | Using built-in pipes                                    | s5v1      | s5v1_end | s5v1_extras |
| 5. Pipes                            | Custom pipes                                            | s5v2      | s5v2_end | s5v2_extras |
| 5. Pipes                            | Stay pure                                               | s5v3      | s5v3_end | s5v3_extras |
| 5. Pipes                            | Asynchronous piping                                     | s5v4      | s5v4_end | s5v4_extras |
| 6. Fun with forms                   | Go full template                                        | s6v1      | s6v1_end | s6v1_extras |
| 6. Fun with forms                   | When the model gets involved                            | s6v2      | s6v2_end | s6v2_extras |
| 6. Fun with forms                   | Validate plenty                                         | s6v3      | s6v3_end | -           |
| 7. We live in an asynchronous world | Keep your promises                                      | s7v1      | s7v1_end | s7v1_extras |
| 7. We live in an asynchronous world | The power of Observables                                | s7v2      | s7v2_end | s7v2_extras |
