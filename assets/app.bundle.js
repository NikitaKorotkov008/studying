(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@supabase/node-fetch/browser.js
  var browser_exports = {};
  __export(browser_exports, {
    Headers: () => Headers2,
    Request: () => Request,
    Response: () => Response2,
    default: () => browser_default,
    fetch: () => fetch2
  });
  var getGlobal, globalObject, fetch2, browser_default, Headers2, Request, Response2;
  var init_browser = __esm({
    "node_modules/@supabase/node-fetch/browser.js"() {
      "use strict";
      getGlobal = function() {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global !== "undefined") {
          return global;
        }
        throw new Error("unable to locate global object");
      };
      globalObject = getGlobal();
      fetch2 = globalObject.fetch;
      browser_default = globalObject.fetch.bind(globalObject);
      Headers2 = globalObject.Headers;
      Request = globalObject.Request;
      Response2 = globalObject.Response;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js
  var require_PostgrestError = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var PostgrestError = class extends Error {
        constructor(context) {
          super(context.message);
          this.name = "PostgrestError";
          this.details = context.details;
          this.hint = context.hint;
          this.code = context.code;
        }
      };
      exports.default = PostgrestError;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js
  var require_PostgrestBuilder = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var node_fetch_1 = __importDefault((init_browser(), __toCommonJS(browser_exports)));
      var PostgrestError_1 = __importDefault(require_PostgrestError());
      var PostgrestBuilder2 = class {
        constructor(builder) {
          this.shouldThrowOnError = false;
          this.method = builder.method;
          this.url = builder.url;
          this.headers = builder.headers;
          this.schema = builder.schema;
          this.body = builder.body;
          this.shouldThrowOnError = builder.shouldThrowOnError;
          this.signal = builder.signal;
          this.isMaybeSingle = builder.isMaybeSingle;
          if (builder.fetch) {
            this.fetch = builder.fetch;
          } else if (typeof fetch === "undefined") {
            this.fetch = node_fetch_1.default;
          } else {
            this.fetch = fetch;
          }
        }
        /**
         * If there's an error with the query, throwOnError will reject the promise by
         * throwing the error instead of returning it as part of a successful response.
         *
         * {@link https://github.com/supabase/supabase-js/issues/92}
         */
        throwOnError() {
          this.shouldThrowOnError = true;
          return this;
        }
        /**
         * Set an HTTP header for the request.
         */
        setHeader(name, value) {
          this.headers = Object.assign({}, this.headers);
          this.headers[name] = value;
          return this;
        }
        then(onfulfilled, onrejected) {
          if (this.schema === void 0) {
          } else if (["GET", "HEAD"].includes(this.method)) {
            this.headers["Accept-Profile"] = this.schema;
          } else {
            this.headers["Content-Profile"] = this.schema;
          }
          if (this.method !== "GET" && this.method !== "HEAD") {
            this.headers["Content-Type"] = "application/json";
          }
          const _fetch = this.fetch;
          let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
          }).then(async (res2) => {
            var _a, _b, _c;
            let error = null;
            let data2 = null;
            let count = null;
            let status = res2.status;
            let statusText = res2.statusText;
            if (res2.ok) {
              if (this.method !== "HEAD") {
                const body = await res2.text();
                if (body === "") {
                } else if (this.headers["Accept"] === "text/csv") {
                  data2 = body;
                } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                  data2 = body;
                } else {
                  data2 = JSON.parse(body);
                }
              }
              const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
              const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
              if (countHeader && contentRange && contentRange.length > 1) {
                count = parseInt(contentRange[1]);
              }
              if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data2)) {
                if (data2.length > 1) {
                  error = {
                    // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                    code: "PGRST116",
                    details: `Results contain ${data2.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                    hint: null,
                    message: "JSON object requested, multiple (or no) rows returned"
                  };
                  data2 = null;
                  count = null;
                  status = 406;
                  statusText = "Not Acceptable";
                } else if (data2.length === 1) {
                  data2 = data2[0];
                } else {
                  data2 = null;
                }
              }
            } else {
              const body = await res2.text();
              try {
                error = JSON.parse(body);
                if (Array.isArray(error) && res2.status === 404) {
                  data2 = [];
                  error = null;
                  status = 200;
                  statusText = "OK";
                }
              } catch (_d) {
                if (res2.status === 404 && body === "") {
                  status = 204;
                  statusText = "No Content";
                } else {
                  error = {
                    message: body
                  };
                }
              }
              if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes("0 rows"))) {
                error = null;
                status = 200;
                statusText = "OK";
              }
              if (error && this.shouldThrowOnError) {
                throw new PostgrestError_1.default(error);
              }
            }
            const postgrestResponse = {
              error,
              data: data2,
              count,
              status,
              statusText
            };
            return postgrestResponse;
          });
          if (!this.shouldThrowOnError) {
            res = res.catch((fetchError) => {
              var _a, _b, _c;
              return {
                error: {
                  message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                  details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                  hint: "",
                  code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
                },
                data: null,
                count: null,
                status: 0,
                statusText: ""
              };
            });
          }
          return res.then(onfulfilled, onrejected);
        }
      };
      exports.default = PostgrestBuilder2;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js
  var require_PostgrestTransformBuilder = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
      var PostgrestTransformBuilder2 = class extends PostgrestBuilder_1.default {
        /**
         * Perform a SELECT on the query result.
         *
         * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
         * return modified rows. By calling this method, modified rows are returned in
         * `data`.
         *
         * @param columns - The columns to retrieve, separated by commas
         */
        select(columns) {
          let quoted = false;
          const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
            if (/\s/.test(c) && !quoted) {
              return "";
            }
            if (c === '"') {
              quoted = !quoted;
            }
            return c;
          }).join("");
          this.url.searchParams.set("select", cleanedColumns);
          if (this.headers["Prefer"]) {
            this.headers["Prefer"] += ",";
          }
          this.headers["Prefer"] += "return=representation";
          return this;
        }
        /**
         * Order the query result by `column`.
         *
         * You can call this method multiple times to order by multiple columns.
         *
         * You can order referenced tables, but it only affects the ordering of the
         * parent table if you use `!inner` in the query.
         *
         * @param column - The column to order by
         * @param options - Named parameters
         * @param options.ascending - If `true`, the result will be in ascending order
         * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
         * `null`s appear last.
         * @param options.referencedTable - Set this to order a referenced table by
         * its columns
         * @param options.foreignTable - Deprecated, use `options.referencedTable`
         * instead
         */
        order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
          const key = referencedTable ? `${referencedTable}.order` : "order";
          const existingOrder = this.url.searchParams.get(key);
          this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
          return this;
        }
        /**
         * Limit the query result by `count`.
         *
         * @param count - The maximum number of rows to return
         * @param options - Named parameters
         * @param options.referencedTable - Set this to limit rows of referenced
         * tables instead of the parent table
         * @param options.foreignTable - Deprecated, use `options.referencedTable`
         * instead
         */
        limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
          const key = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
          this.url.searchParams.set(key, `${count}`);
          return this;
        }
        /**
         * Limit the query result by starting at an offset `from` and ending at the offset `to`.
         * Only records within this range are returned.
         * This respects the query order and if there is no order clause the range could behave unexpectedly.
         * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
         * and fourth rows of the query.
         *
         * @param from - The starting index from which to limit the result
         * @param to - The last index to which to limit the result
         * @param options - Named parameters
         * @param options.referencedTable - Set this to limit rows of referenced
         * tables instead of the parent table
         * @param options.foreignTable - Deprecated, use `options.referencedTable`
         * instead
         */
        range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
          const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
          const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
          this.url.searchParams.set(keyOffset, `${from}`);
          this.url.searchParams.set(keyLimit, `${to - from + 1}`);
          return this;
        }
        /**
         * Set the AbortSignal for the fetch request.
         *
         * @param signal - The AbortSignal to use for the fetch request
         */
        abortSignal(signal) {
          this.signal = signal;
          return this;
        }
        /**
         * Return `data` as a single object instead of an array of objects.
         *
         * Query result must be one row (e.g. using `.limit(1)`), otherwise this
         * returns an error.
         */
        single() {
          this.headers["Accept"] = "application/vnd.pgrst.object+json";
          return this;
        }
        /**
         * Return `data` as a single object instead of an array of objects.
         *
         * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
         * this returns an error.
         */
        maybeSingle() {
          if (this.method === "GET") {
            this.headers["Accept"] = "application/json";
          } else {
            this.headers["Accept"] = "application/vnd.pgrst.object+json";
          }
          this.isMaybeSingle = true;
          return this;
        }
        /**
         * Return `data` as a string in CSV format.
         */
        csv() {
          this.headers["Accept"] = "text/csv";
          return this;
        }
        /**
         * Return `data` as an object in [GeoJSON](https://geojson.org) format.
         */
        geojson() {
          this.headers["Accept"] = "application/geo+json";
          return this;
        }
        /**
         * Return `data` as the EXPLAIN plan for the query.
         *
         * You need to enable the
         * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
         * setting before using this method.
         *
         * @param options - Named parameters
         *
         * @param options.analyze - If `true`, the query will be executed and the
         * actual run time will be returned
         *
         * @param options.verbose - If `true`, the query identifier will be returned
         * and `data` will include the output columns of the query
         *
         * @param options.settings - If `true`, include information on configuration
         * parameters that affect query planning
         *
         * @param options.buffers - If `true`, include information on buffer usage
         *
         * @param options.wal - If `true`, include information on WAL record generation
         *
         * @param options.format - The format of the output, can be `"text"` (default)
         * or `"json"`
         */
        explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
          var _a;
          const options = [
            analyze ? "analyze" : null,
            verbose ? "verbose" : null,
            settings ? "settings" : null,
            buffers ? "buffers" : null,
            wal ? "wal" : null
          ].filter(Boolean).join("|");
          const forMediatype = (_a = this.headers["Accept"]) !== null && _a !== void 0 ? _a : "application/json";
          this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
          if (format === "json")
            return this;
          else
            return this;
        }
        /**
         * Rollback the query.
         *
         * `data` will still be returned, but the query is not committed.
         */
        rollback() {
          var _a;
          if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
            this.headers["Prefer"] += ",tx=rollback";
          } else {
            this.headers["Prefer"] = "tx=rollback";
          }
          return this;
        }
        /**
         * Override the type of the returned `data`.
         *
         * @typeParam NewResult - The new result type to override with
         */
        returns() {
          return this;
        }
      };
      exports.default = PostgrestTransformBuilder2;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js
  var require_PostgrestFilterBuilder = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
      var PostgrestFilterBuilder2 = class extends PostgrestTransformBuilder_1.default {
        /**
         * Match only rows where `column` is equal to `value`.
         *
         * To check if the value of `column` is NULL, you should use `.is()` instead.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        eq(column, value) {
          this.url.searchParams.append(column, `eq.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is not equal to `value`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        neq(column, value) {
          this.url.searchParams.append(column, `neq.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is greater than `value`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        gt(column, value) {
          this.url.searchParams.append(column, `gt.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is greater than or equal to `value`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        gte(column, value) {
          this.url.searchParams.append(column, `gte.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is less than `value`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        lt(column, value) {
          this.url.searchParams.append(column, `lt.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is less than or equal to `value`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        lte(column, value) {
          this.url.searchParams.append(column, `lte.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` matches `pattern` case-sensitively.
         *
         * @param column - The column to filter on
         * @param pattern - The pattern to match with
         */
        like(column, pattern) {
          this.url.searchParams.append(column, `like.${pattern}`);
          return this;
        }
        /**
         * Match only rows where `column` matches all of `patterns` case-sensitively.
         *
         * @param column - The column to filter on
         * @param patterns - The patterns to match with
         */
        likeAllOf(column, patterns) {
          this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
          return this;
        }
        /**
         * Match only rows where `column` matches any of `patterns` case-sensitively.
         *
         * @param column - The column to filter on
         * @param patterns - The patterns to match with
         */
        likeAnyOf(column, patterns) {
          this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
          return this;
        }
        /**
         * Match only rows where `column` matches `pattern` case-insensitively.
         *
         * @param column - The column to filter on
         * @param pattern - The pattern to match with
         */
        ilike(column, pattern) {
          this.url.searchParams.append(column, `ilike.${pattern}`);
          return this;
        }
        /**
         * Match only rows where `column` matches all of `patterns` case-insensitively.
         *
         * @param column - The column to filter on
         * @param patterns - The patterns to match with
         */
        ilikeAllOf(column, patterns) {
          this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
          return this;
        }
        /**
         * Match only rows where `column` matches any of `patterns` case-insensitively.
         *
         * @param column - The column to filter on
         * @param patterns - The patterns to match with
         */
        ilikeAnyOf(column, patterns) {
          this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
          return this;
        }
        /**
         * Match only rows where `column` IS `value`.
         *
         * For non-boolean columns, this is only relevant for checking if the value of
         * `column` is NULL by setting `value` to `null`.
         *
         * For boolean columns, you can also set `value` to `true` or `false` and it
         * will behave the same way as `.eq()`.
         *
         * @param column - The column to filter on
         * @param value - The value to filter with
         */
        is(column, value) {
          this.url.searchParams.append(column, `is.${value}`);
          return this;
        }
        /**
         * Match only rows where `column` is included in the `values` array.
         *
         * @param column - The column to filter on
         * @param values - The values array to filter with
         */
        in(column, values) {
          const cleanedValues = Array.from(new Set(values)).map((s) => {
            if (typeof s === "string" && new RegExp("[,()]").test(s))
              return `"${s}"`;
            else
              return `${s}`;
          }).join(",");
          this.url.searchParams.append(column, `in.(${cleanedValues})`);
          return this;
        }
        /**
         * Only relevant for jsonb, array, and range columns. Match only rows where
         * `column` contains every element appearing in `value`.
         *
         * @param column - The jsonb, array, or range column to filter on
         * @param value - The jsonb, array, or range value to filter with
         */
        contains(column, value) {
          if (typeof value === "string") {
            this.url.searchParams.append(column, `cs.${value}`);
          } else if (Array.isArray(value)) {
            this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
          } else {
            this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
          }
          return this;
        }
        /**
         * Only relevant for jsonb, array, and range columns. Match only rows where
         * every element appearing in `column` is contained by `value`.
         *
         * @param column - The jsonb, array, or range column to filter on
         * @param value - The jsonb, array, or range value to filter with
         */
        containedBy(column, value) {
          if (typeof value === "string") {
            this.url.searchParams.append(column, `cd.${value}`);
          } else if (Array.isArray(value)) {
            this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
          } else {
            this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
          }
          return this;
        }
        /**
         * Only relevant for range columns. Match only rows where every element in
         * `column` is greater than any element in `range`.
         *
         * @param column - The range column to filter on
         * @param range - The range to filter with
         */
        rangeGt(column, range) {
          this.url.searchParams.append(column, `sr.${range}`);
          return this;
        }
        /**
         * Only relevant for range columns. Match only rows where every element in
         * `column` is either contained in `range` or greater than any element in
         * `range`.
         *
         * @param column - The range column to filter on
         * @param range - The range to filter with
         */
        rangeGte(column, range) {
          this.url.searchParams.append(column, `nxl.${range}`);
          return this;
        }
        /**
         * Only relevant for range columns. Match only rows where every element in
         * `column` is less than any element in `range`.
         *
         * @param column - The range column to filter on
         * @param range - The range to filter with
         */
        rangeLt(column, range) {
          this.url.searchParams.append(column, `sl.${range}`);
          return this;
        }
        /**
         * Only relevant for range columns. Match only rows where every element in
         * `column` is either contained in `range` or less than any element in
         * `range`.
         *
         * @param column - The range column to filter on
         * @param range - The range to filter with
         */
        rangeLte(column, range) {
          this.url.searchParams.append(column, `nxr.${range}`);
          return this;
        }
        /**
         * Only relevant for range columns. Match only rows where `column` is
         * mutually exclusive to `range` and there can be no element between the two
         * ranges.
         *
         * @param column - The range column to filter on
         * @param range - The range to filter with
         */
        rangeAdjacent(column, range) {
          this.url.searchParams.append(column, `adj.${range}`);
          return this;
        }
        /**
         * Only relevant for array and range columns. Match only rows where
         * `column` and `value` have an element in common.
         *
         * @param column - The array or range column to filter on
         * @param value - The array or range value to filter with
         */
        overlaps(column, value) {
          if (typeof value === "string") {
            this.url.searchParams.append(column, `ov.${value}`);
          } else {
            this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
          }
          return this;
        }
        /**
         * Only relevant for text and tsvector columns. Match only rows where
         * `column` matches the query string in `query`.
         *
         * @param column - The text or tsvector column to filter on
         * @param query - The query text to match with
         * @param options - Named parameters
         * @param options.config - The text search configuration to use
         * @param options.type - Change how the `query` text is interpreted
         */
        textSearch(column, query, { config, type } = {}) {
          let typePart = "";
          if (type === "plain") {
            typePart = "pl";
          } else if (type === "phrase") {
            typePart = "ph";
          } else if (type === "websearch") {
            typePart = "w";
          }
          const configPart = config === void 0 ? "" : `(${config})`;
          this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
          return this;
        }
        /**
         * Match only rows where each column in `query` keys is equal to its
         * associated value. Shorthand for multiple `.eq()`s.
         *
         * @param query - The object to filter with, with column names as keys mapped
         * to their filter values
         */
        match(query) {
          Object.entries(query).forEach(([column, value]) => {
            this.url.searchParams.append(column, `eq.${value}`);
          });
          return this;
        }
        /**
         * Match only rows which doesn't satisfy the filter.
         *
         * Unlike most filters, `opearator` and `value` are used as-is and need to
         * follow [PostgREST
         * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
         * to make sure they are properly sanitized.
         *
         * @param column - The column to filter on
         * @param operator - The operator to be negated to filter with, following
         * PostgREST syntax
         * @param value - The value to filter with, following PostgREST syntax
         */
        not(column, operator, value) {
          this.url.searchParams.append(column, `not.${operator}.${value}`);
          return this;
        }
        /**
         * Match only rows which satisfy at least one of the filters.
         *
         * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
         * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
         * to make sure it's properly sanitized.
         *
         * It's currently not possible to do an `.or()` filter across multiple tables.
         *
         * @param filters - The filters to use, following PostgREST syntax
         * @param options - Named parameters
         * @param options.referencedTable - Set this to filter on referenced tables
         * instead of the parent table
         * @param options.foreignTable - Deprecated, use `referencedTable` instead
         */
        or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
          const key = referencedTable ? `${referencedTable}.or` : "or";
          this.url.searchParams.append(key, `(${filters})`);
          return this;
        }
        /**
         * Match only rows which satisfy the filter. This is an escape hatch - you
         * should use the specific filter methods wherever possible.
         *
         * Unlike most filters, `opearator` and `value` are used as-is and need to
         * follow [PostgREST
         * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
         * to make sure they are properly sanitized.
         *
         * @param column - The column to filter on
         * @param operator - The operator to filter with, following PostgREST syntax
         * @param value - The value to filter with, following PostgREST syntax
         */
        filter(column, operator, value) {
          this.url.searchParams.append(column, `${operator}.${value}`);
          return this;
        }
      };
      exports.default = PostgrestFilterBuilder2;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js
  var require_PostgrestQueryBuilder = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
      var PostgrestQueryBuilder2 = class {
        constructor(url, { headers = {}, schema, fetch: fetch3 }) {
          this.url = url;
          this.headers = headers;
          this.schema = schema;
          this.fetch = fetch3;
        }
        /**
         * Perform a SELECT query on the table or view.
         *
         * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
         *
         * @param options - Named parameters
         *
         * @param options.head - When set to `true`, `data` will not be returned.
         * Useful if you only need the count.
         *
         * @param options.count - Count algorithm to use to count rows in the table or view.
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         */
        select(columns, { head: head2 = false, count } = {}) {
          const method = head2 ? "HEAD" : "GET";
          let quoted = false;
          const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
            if (/\s/.test(c) && !quoted) {
              return "";
            }
            if (c === '"') {
              quoted = !quoted;
            }
            return c;
          }).join("");
          this.url.searchParams.set("select", cleanedColumns);
          if (count) {
            this.headers["Prefer"] = `count=${count}`;
          }
          return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
        /**
         * Perform an INSERT into the table or view.
         *
         * By default, inserted rows are not returned. To return it, chain the call
         * with `.select()`.
         *
         * @param values - The values to insert. Pass an object to insert a single row
         * or an array to insert multiple rows.
         *
         * @param options - Named parameters
         *
         * @param options.count - Count algorithm to use to count inserted rows.
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         *
         * @param options.defaultToNull - Make missing fields default to `null`.
         * Otherwise, use the default value for the column. Only applies for bulk
         * inserts.
         */
        insert(values, { count, defaultToNull = true } = {}) {
          const method = "POST";
          const prefersHeaders = [];
          if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
          }
          if (count) {
            prefersHeaders.push(`count=${count}`);
          }
          if (!defaultToNull) {
            prefersHeaders.push("missing=default");
          }
          this.headers["Prefer"] = prefersHeaders.join(",");
          if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
              const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
              this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
          }
          return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
        /**
         * Perform an UPSERT on the table or view. Depending on the column(s) passed
         * to `onConflict`, `.upsert()` allows you to perform the equivalent of
         * `.insert()` if a row with the corresponding `onConflict` columns doesn't
         * exist, or if it does exist, perform an alternative action depending on
         * `ignoreDuplicates`.
         *
         * By default, upserted rows are not returned. To return it, chain the call
         * with `.select()`.
         *
         * @param values - The values to upsert with. Pass an object to upsert a
         * single row or an array to upsert multiple rows.
         *
         * @param options - Named parameters
         *
         * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
         * duplicate rows are determined. Two rows are duplicates if all the
         * `onConflict` columns are equal.
         *
         * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
         * `false`, duplicate rows are merged with existing rows.
         *
         * @param options.count - Count algorithm to use to count upserted rows.
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         *
         * @param options.defaultToNull - Make missing fields default to `null`.
         * Otherwise, use the default value for the column. This only applies when
         * inserting new rows, not when merging with existing rows under
         * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
         */
        upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
          const method = "POST";
          const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
          if (onConflict !== void 0)
            this.url.searchParams.set("on_conflict", onConflict);
          if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
          }
          if (count) {
            prefersHeaders.push(`count=${count}`);
          }
          if (!defaultToNull) {
            prefersHeaders.push("missing=default");
          }
          this.headers["Prefer"] = prefersHeaders.join(",");
          if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
              const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
              this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
          }
          return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
        /**
         * Perform an UPDATE on the table or view.
         *
         * By default, updated rows are not returned. To return it, chain the call
         * with `.select()` after filters.
         *
         * @param values - The values to update with
         *
         * @param options - Named parameters
         *
         * @param options.count - Count algorithm to use to count updated rows.
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         */
        update(values, { count } = {}) {
          const method = "PATCH";
          const prefersHeaders = [];
          if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
          }
          if (count) {
            prefersHeaders.push(`count=${count}`);
          }
          this.headers["Prefer"] = prefersHeaders.join(",");
          return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
        /**
         * Perform a DELETE on the table or view.
         *
         * By default, deleted rows are not returned. To return it, chain the call
         * with `.select()` after filters.
         *
         * @param options - Named parameters
         *
         * @param options.count - Count algorithm to use to count deleted rows.
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         */
        delete({ count } = {}) {
          const method = "DELETE";
          const prefersHeaders = [];
          if (count) {
            prefersHeaders.push(`count=${count}`);
          }
          if (this.headers["Prefer"]) {
            prefersHeaders.unshift(this.headers["Prefer"]);
          }
          this.headers["Prefer"] = prefersHeaders.join(",");
          return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
      };
      exports.default = PostgrestQueryBuilder2;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/version.js
  var require_version = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.version = void 0;
      exports.version = "0.0.0-automated";
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/constants.js
  var require_constants = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DEFAULT_HEADERS = void 0;
      var version_1 = require_version();
      exports.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version_1.version}` };
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js
  var require_PostgrestClient = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
      var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
      var constants_1 = require_constants();
      var PostgrestClient2 = class _PostgrestClient {
        // TODO: Add back shouldThrowOnError once we figure out the typings
        /**
         * Creates a PostgREST client.
         *
         * @param url - URL of the PostgREST endpoint
         * @param options - Named parameters
         * @param options.headers - Custom headers
         * @param options.schema - Postgres schema to switch to
         * @param options.fetch - Custom fetch
         */
        constructor(url, { headers = {}, schema, fetch: fetch3 } = {}) {
          this.url = url;
          this.headers = Object.assign(Object.assign({}, constants_1.DEFAULT_HEADERS), headers);
          this.schemaName = schema;
          this.fetch = fetch3;
        }
        /**
         * Perform a query on a table or a view.
         *
         * @param relation - The table or view name to query
         */
        from(relation) {
          const url = new URL(`${this.url}/${relation}`);
          return new PostgrestQueryBuilder_1.default(url, {
            headers: Object.assign({}, this.headers),
            schema: this.schemaName,
            fetch: this.fetch
          });
        }
        /**
         * Select a schema to query or perform an function (rpc) call.
         *
         * The schema needs to be on the list of exposed schemas inside Supabase.
         *
         * @param schema - The schema to query
         */
        schema(schema) {
          return new _PostgrestClient(this.url, {
            headers: this.headers,
            schema,
            fetch: this.fetch
          });
        }
        /**
         * Perform a function call.
         *
         * @param fn - The function name to call
         * @param args - The arguments to pass to the function call
         * @param options - Named parameters
         * @param options.head - When set to `true`, `data` will not be returned.
         * Useful if you only need the count.
         * @param options.get - When set to `true`, the function will be called with
         * read-only access mode.
         * @param options.count - Count algorithm to use to count rows returned by the
         * function. Only applicable for [set-returning
         * functions](https://www.postgresql.org/docs/current/functions-srf.html).
         *
         * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
         * hood.
         *
         * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
         * statistics under the hood.
         *
         * `"estimated"`: Uses exact count for low numbers and planned count for high
         * numbers.
         */
        rpc(fn, args = {}, { head: head2 = false, get: get2 = false, count } = {}) {
          let method;
          const url = new URL(`${this.url}/rpc/${fn}`);
          let body;
          if (head2 || get2) {
            method = head2 ? "HEAD" : "GET";
            Object.entries(args).filter(([_, value]) => value !== void 0).map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(",")}}` : `${value}`]).forEach(([name, value]) => {
              url.searchParams.append(name, value);
            });
          } else {
            method = "POST";
            body = args;
          }
          const headers = Object.assign({}, this.headers);
          if (count) {
            headers["Prefer"] = `count=${count}`;
          }
          return new PostgrestFilterBuilder_1.default({
            method,
            url,
            headers,
            schema: this.schemaName,
            body,
            fetch: this.fetch,
            allowEmpty: false
          });
        }
      };
      exports.default = PostgrestClient2;
    }
  });

  // node_modules/@supabase/postgrest-js/dist/cjs/index.js
  var require_cjs = __commonJS({
    "node_modules/@supabase/postgrest-js/dist/cjs/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
      var PostgrestClient_1 = __importDefault(require_PostgrestClient());
      exports.PostgrestClient = PostgrestClient_1.default;
      var PostgrestQueryBuilder_1 = __importDefault(require_PostgrestQueryBuilder());
      exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
      var PostgrestFilterBuilder_1 = __importDefault(require_PostgrestFilterBuilder());
      exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
      var PostgrestTransformBuilder_1 = __importDefault(require_PostgrestTransformBuilder());
      exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
      var PostgrestBuilder_1 = __importDefault(require_PostgrestBuilder());
      exports.PostgrestBuilder = PostgrestBuilder_1.default;
      exports.default = {
        PostgrestClient: PostgrestClient_1.default,
        PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
        PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
        PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
        PostgrestBuilder: PostgrestBuilder_1.default
      };
    }
  });

  // node_modules/ws/browser.js
  var require_browser = __commonJS({
    "node_modules/ws/browser.js"(exports, module) {
      "use strict";
      module.exports = function() {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object"
        );
      };
    }
  });

  // app/router.js
  var history2 = [];
  var current = null;
  var onShowHandlers = {};
  function onShow(screenId, handler) {
    onShowHandlers[screenId] = handler;
  }
  function go(screenId, opts = {}) {
    const next = document.querySelector(`.ar-screen[data-screen="${screenId}"]`);
    if (!next) {
      console.warn("\u042D\u043A\u0440\u0430\u043D \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D:", screenId);
      return;
    }
    if (current === screenId) return;
    if (current && !opts.replace) history2.push(current);
    const prevEl = document.querySelector(".ar-screen.is-active");
    const back2 = !!opts.back;
    const fade = !!opts.fade;
    next.classList.remove("is-leaving", "to-left", "to-right", "is-fade-out");
    if (fade) next.classList.add("is-entering", "is-fade", "is-active");
    else next.classList.add("is-entering", back2 ? "from-left" : "from-right", "is-active");
    next.scrollTop = 0;
    requestAnimationFrame(() => {
      next.classList.remove("is-entering", "from-left", "from-right", "is-fade");
      if (prevEl && prevEl !== next) {
        prevEl.classList.add("is-leaving", fade ? "is-fade-out" : back2 ? "to-right" : "to-left");
        const cleanup = () => {
          prevEl.classList.remove("is-active", "is-leaving", "to-left", "to-right", "is-fade-out");
          prevEl.removeEventListener("transitionend", cleanup);
          clearTimeout(timer2);
        };
        const timer2 = setTimeout(cleanup, 480);
        prevEl.addEventListener("transitionend", cleanup);
      }
    });
    current = screenId;
    if (onShowHandlers[screenId]) {
      try {
        onShowHandlers[screenId](opts.params || {});
      } catch (e) {
        console.error(e);
      }
    }
  }
  function back() {
    const prev = history2.pop();
    if (prev) go(prev, { replace: true, back: true });
  }
  function currentScreen() {
    return current;
  }
  function initRouter() {
    document.addEventListener("click", (e) => {
      const navEl = e.target.closest("[data-nav]");
      if (navEl) {
        const isTab = !!navEl.closest(".ar-nav");
        go(navEl.getAttribute("data-nav"), { fade: isTab, replace: isTab });
        return;
      }
      const backEl = e.target.closest("[data-back]");
      if (backEl) {
        back();
        return;
      }
    });
  }

  // app/config.js
  var SUPABASE_URL = "https://ifrqullvnmjunvopwxyk.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcnF1bGx2bm1qdW52b3B3eHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTkxMDIsImV4cCI6MjA4MDMzNTEwMn0.J09LRJ4VDMp8bwQCbyhM68hBkFycqA3eiPdmSpAdgio";
  var YAROSLAVL_CENTER = [57.6261, 39.8845];
  var SERVICE_RADIUS_KM = 20;
  var LS_USER = "almanirent_user";

  // app/state.js
  var state = {
    user: null,
    // текущий пользователь (запись из таблицы users)
    role: "customer"
    // активная роль интерфейса: customer | partner
  };
  function loadSession() {
    try {
      const raw = localStorage.getItem(LS_USER);
      if (raw) state.user = JSON.parse(raw);
    } catch (e) {
      state.user = null;
    }
    return state.user;
  }
  function saveSession(user) {
    state.user = user;
    try {
      localStorage.setItem(LS_USER, JSON.stringify(user));
    } catch (e) {
    }
  }
  function clearSession() {
    state.user = null;
    state.role = "customer";
    try {
      localStorage.removeItem(LS_USER);
    } catch (e) {
    }
  }
  function isAdmin() {
    return !!(state.user && state.user.is_admin);
  }
  function isBanned() {
    return !!(state.user && state.user.is_banned);
  }
  function canUsePlatform() {
    const u = state.user;
    if (!u || u.is_banned) return false;
    return u.is_admin === true || u.verification_status === "approved";
  }
  function cleanPhone(input) {
    let digits = String(input || "").replace(/\D/g, "");
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (digits.length === 10) digits = "7" + digits;
    return digits;
  }
  function formatPhone(digits) {
    const d = cleanPhone(digits);
    if (d.length !== 11) return "+" + d;
    return `+7 ${d.slice(1, 4)} ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
  }
  function inPeriod(dateStr, period) {
    if (!period || period === "all") return true;
    const d = new Date(dateStr);
    if (isNaN(d)) return false;
    const now = /* @__PURE__ */ new Date();
    if (period === "today") {
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
    }
    const days = period === "week" ? 7 : 30;
    return d >= new Date(now.getTime() - days * 864e5);
  }
  function orderCode(displayId) {
    if (displayId == null || displayId === "") return "AR-\u2014";
    return "AR-" + String(displayId).padStart(5, "0");
  }
  function orderMatches(o, query) {
    var _a;
    const q = String(query || "").trim().toLowerCase();
    if (!q) return true;
    const digits = q.replace(/\D/g, "");
    if (digits && String((_a = o.display_id) != null ? _a : "").includes(digits)) return true;
    const hay = [
      orderCode(o.display_id),
      o.product,
      o.customer_name,
      o.executor_name,
      o.customer_phone,
      o.executor_phone,
      o.phone,
      o.address
    ].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  }
  function personMatches(p, query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return true;
    const digits = q.replace(/\D/g, "");
    if (digits && cleanPhone(p.phone).includes(digits)) return true;
    return String(p.name || p.full_name || "").toLowerCase().includes(q);
  }
  function money(value) {
    const n = Math.round(Number(value) || 0);
    return n.toLocaleString("ru-RU").replace(/ /g, "\u202F") + " \u20BD";
  }
  function esc(value) {
    if (value == null) return "";
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // app/push.js
  var LS_PUSH = "almanirent_push";
  var LS_PREFS = "almanirent_push_prefs";
  var swReg = null;
  var DEFAULT_PREFS = { new_orders: true, order_status: true, messages: true };
  function getPrefs() {
    try {
      return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(LS_PREFS) || "{}") };
    } catch (e) {
      return { ...DEFAULT_PREFS };
    }
  }
  function urlBase64ToUint8Array(base64) {
    const padding = "=".repeat((4 - base64.length % 4) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw = atob(b64);
    return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
  }
  function pushSupported() {
    return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  }
  function isIOS() {
    const ua = navigator.userAgent || "";
    return /iPad|iPhone|iPod/.test(ua) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  }
  function isStandalone() {
    return window.matchMedia && window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }
  function pushNeedsInstall() {
    return isIOS() && !isStandalone();
  }
  function pushEnabled() {
    try {
      return localStorage.getItem(LS_PUSH) === "on";
    } catch (e) {
      return false;
    }
  }
  async function ensureSW() {
    if (swReg) return swReg;
    swReg = await navigator.serviceWorker.register("/push-sw.js");
    return swReg;
  }
  function subRole() {
    return state.role === "partner" ? "executor" : "customer";
  }
  function requestNotifyPermission() {
    try {
      const r = Notification.requestPermission((p) => p);
      if (r && typeof r.then === "function") return r;
      return Promise.resolve(Notification.permission);
    } catch (e) {
      return Promise.resolve(Notification.permission);
    }
  }
  async function enablePush(permParam) {
    var _a;
    if (!pushSupported()) throw new Error("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435");
    if (pushNeedsInstall()) {
      throw new Error("\u041D\u0430 iPhone: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F\xBB \u2192 \xAB\u041D\u0430 \u044D\u043A\u0440\u0430\u043D \u0414\u043E\u043C\u043E\u0439\xBB, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441 \u044D\u043A\u0440\u0430\u043D\u0430 \u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0442\u0430\u043C");
    }
    const perm = permParam || (Notification.permission === "granted" ? "granted" : await requestNotifyPermission());
    if (perm === "denied") {
      throw new Error("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u044B \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0438\u0445 \u0434\u043B\u044F AlmaniRent \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430");
    }
    if (perm !== "granted") throw new Error("\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0435 \u0432\u044B\u0434\u0430\u043D\u043E");
    await ensureSW();
    const reg = await navigator.serviceWorker.ready;
    const res = await fetch("/api/push/pubkey");
    if (!res.ok) throw new Error("\u041F\u0443\u0448\u0438 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435");
    const { publicKey } = await res.json();
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
    }
    const json = sub.toJSON();
    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "subscribe",
        endpoint: sub.endpoint,
        keys: { p256dh: json.keys.p256dh, auth: json.keys.auth },
        role: subRole(),
        user_id: ((_a = state.user) == null ? void 0 : _a.id) || null,
        prefs: getPrefs()
      })
    });
    try {
      localStorage.setItem(LS_PUSH, "on");
    } catch (e) {
    }
  }
  async function disablePush() {
    try {
      const reg = await ensureSW();
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "unsubscribe", endpoint: sub.endpoint })
        });
        await sub.unsubscribe();
      }
    } catch (e) {
    }
    try {
      localStorage.setItem(LS_PUSH, "off");
    } catch (e) {
    }
  }
  async function initPush() {
    if (!pushSupported()) return;
    if (Notification.permission !== "granted") return;
    try {
      const reg = await ensureSW();
      const existing = await reg.pushManager.getSubscription();
      if (pushEnabled() || existing) {
        await enablePush();
      }
    } catch (e) {
    }
  }
  function sendPush(event, order3) {
    try {
      fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, order: order3 || {} })
      }).catch(() => {
      });
    } catch (e) {
    }
  }

  // node_modules/@supabase/functions-js/dist/module/helper.js
  var resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
      _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
    } else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };

  // node_modules/@supabase/functions-js/dist/module/types.js
  var FunctionsError = class extends Error {
    constructor(message, name = "FunctionsError", context) {
      super(message);
      this.name = name;
      this.context = context;
    }
  };
  var FunctionsFetchError = class extends FunctionsError {
    constructor(context) {
      super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
    }
  };
  var FunctionsRelayError = class extends FunctionsError {
    constructor(context) {
      super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
    }
  };
  var FunctionsHttpError = class extends FunctionsError {
    constructor(context) {
      super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
    }
  };
  var FunctionRegion;
  (function(FunctionRegion2) {
    FunctionRegion2["Any"] = "any";
    FunctionRegion2["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion2["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion2["ApSouth1"] = "ap-south-1";
    FunctionRegion2["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion2["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion2["CaCentral1"] = "ca-central-1";
    FunctionRegion2["EuCentral1"] = "eu-central-1";
    FunctionRegion2["EuWest1"] = "eu-west-1";
    FunctionRegion2["EuWest2"] = "eu-west-2";
    FunctionRegion2["EuWest3"] = "eu-west-3";
    FunctionRegion2["SaEast1"] = "sa-east-1";
    FunctionRegion2["UsEast1"] = "us-east-1";
    FunctionRegion2["UsWest1"] = "us-west-1";
    FunctionRegion2["UsWest2"] = "us-west-2";
  })(FunctionRegion || (FunctionRegion = {}));

  // node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var FunctionsClient = class {
    constructor(url, { headers = {}, customFetch, region = FunctionRegion.Any } = {}) {
      this.url = url;
      this.headers = headers;
      this.region = region;
      this.fetch = resolveFetch(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */
    setAuth(token) {
      this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */
    invoke(functionName, options = {}) {
      var _a;
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const { headers, method, body: functionArgs } = options;
          let _headers = {};
          let { region } = options;
          if (!region) {
            region = this.region;
          }
          if (region && region !== "any") {
            _headers["x-region"] = region;
          }
          let body;
          if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
            if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
              _headers["Content-Type"] = "application/octet-stream";
              body = functionArgs;
            } else if (typeof functionArgs === "string") {
              _headers["Content-Type"] = "text/plain";
              body = functionArgs;
            } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
              body = functionArgs;
            } else {
              _headers["Content-Type"] = "application/json";
              body = JSON.stringify(functionArgs);
            }
          }
          const response = yield this.fetch(`${this.url}/${functionName}`, {
            method: method || "POST",
            // headers priority is (high to low):
            // 1. invoke-level headers
            // 2. client-level headers
            // 3. default Content-Type header
            headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
            body
          }).catch((fetchError) => {
            throw new FunctionsFetchError(fetchError);
          });
          const isRelayError = response.headers.get("x-relay-error");
          if (isRelayError && isRelayError === "true") {
            throw new FunctionsRelayError(response);
          }
          if (!response.ok) {
            throw new FunctionsHttpError(response);
          }
          let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
          let data2;
          if (responseType === "application/json") {
            data2 = yield response.json();
          } else if (responseType === "application/octet-stream") {
            data2 = yield response.blob();
          } else if (responseType === "text/event-stream") {
            data2 = response;
          } else if (responseType === "multipart/form-data") {
            data2 = yield response.formData();
          } else {
            data2 = yield response.text();
          }
          return { data: data2, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
  };

  // node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs
  var import_cjs = __toESM(require_cjs(), 1);
  var {
    PostgrestClient,
    PostgrestQueryBuilder,
    PostgrestFilterBuilder,
    PostgrestTransformBuilder,
    PostgrestBuilder
  } = import_cjs.default;

  // node_modules/@supabase/realtime-js/dist/module/lib/version.js
  var version = "2.10.2";

  // node_modules/@supabase/realtime-js/dist/module/lib/constants.js
  var DEFAULT_HEADERS = { "X-Client-Info": `realtime-js/${version}` };
  var VSN = "1.0.0";
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var SOCKET_STATES;
  (function(SOCKET_STATES2) {
    SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
    SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
    SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
    SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
  })(SOCKET_STATES || (SOCKET_STATES = {}));
  var CHANNEL_STATES;
  (function(CHANNEL_STATES2) {
    CHANNEL_STATES2["closed"] = "closed";
    CHANNEL_STATES2["errored"] = "errored";
    CHANNEL_STATES2["joined"] = "joined";
    CHANNEL_STATES2["joining"] = "joining";
    CHANNEL_STATES2["leaving"] = "leaving";
  })(CHANNEL_STATES || (CHANNEL_STATES = {}));
  var CHANNEL_EVENTS;
  (function(CHANNEL_EVENTS2) {
    CHANNEL_EVENTS2["close"] = "phx_close";
    CHANNEL_EVENTS2["error"] = "phx_error";
    CHANNEL_EVENTS2["join"] = "phx_join";
    CHANNEL_EVENTS2["reply"] = "phx_reply";
    CHANNEL_EVENTS2["leave"] = "phx_leave";
    CHANNEL_EVENTS2["access_token"] = "access_token";
  })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
  var TRANSPORTS;
  (function(TRANSPORTS2) {
    TRANSPORTS2["websocket"] = "websocket";
  })(TRANSPORTS || (TRANSPORTS = {}));
  var CONNECTION_STATE;
  (function(CONNECTION_STATE2) {
    CONNECTION_STATE2["Connecting"] = "connecting";
    CONNECTION_STATE2["Open"] = "open";
    CONNECTION_STATE2["Closing"] = "closing";
    CONNECTION_STATE2["Closed"] = "closed";
  })(CONNECTION_STATE || (CONNECTION_STATE = {}));

  // node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
  var Serializer = class {
    constructor() {
      this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this._binaryDecode(rawPayload));
      }
      if (typeof rawPayload === "string") {
        return callback(JSON.parse(rawPayload));
      }
      return callback({});
    }
    _binaryDecode(buffer) {
      const view = new DataView(buffer);
      const decoder = new TextDecoder();
      return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
      const topicSize = view.getUint8(1);
      const eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      const event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      const data2 = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
      return { ref: null, topic, event, payload: data2 };
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/timer.js
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = void 0;
      this.tries = 0;
      this.callback = callback;
      this.timerCalc = timerCalc;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
  var PostgresTypes;
  (function(PostgresTypes2) {
    PostgresTypes2["abstime"] = "abstime";
    PostgresTypes2["bool"] = "bool";
    PostgresTypes2["date"] = "date";
    PostgresTypes2["daterange"] = "daterange";
    PostgresTypes2["float4"] = "float4";
    PostgresTypes2["float8"] = "float8";
    PostgresTypes2["int2"] = "int2";
    PostgresTypes2["int4"] = "int4";
    PostgresTypes2["int4range"] = "int4range";
    PostgresTypes2["int8"] = "int8";
    PostgresTypes2["int8range"] = "int8range";
    PostgresTypes2["json"] = "json";
    PostgresTypes2["jsonb"] = "jsonb";
    PostgresTypes2["money"] = "money";
    PostgresTypes2["numeric"] = "numeric";
    PostgresTypes2["oid"] = "oid";
    PostgresTypes2["reltime"] = "reltime";
    PostgresTypes2["text"] = "text";
    PostgresTypes2["time"] = "time";
    PostgresTypes2["timestamp"] = "timestamp";
    PostgresTypes2["timestamptz"] = "timestamptz";
    PostgresTypes2["timetz"] = "timetz";
    PostgresTypes2["tsrange"] = "tsrange";
    PostgresTypes2["tstzrange"] = "tstzrange";
  })(PostgresTypes || (PostgresTypes = {}));
  var convertChangeData = (columns, record, options = {}) => {
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key) => {
      acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
      return acc;
    }, {});
  };
  var convertColumn = (columnName, columns, record, skipTypes) => {
    const column = columns.find((x) => x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
      return convertCell(colType, value);
    }
    return noop(value);
  };
  var convertCell = (type, value) => {
    if (type.charAt(0) === "_") {
      const dataType = type.slice(1, type.length);
      return toArray(value, dataType);
    }
    switch (type) {
      case PostgresTypes.bool:
        return toBoolean(value);
      case PostgresTypes.float4:
      case PostgresTypes.float8:
      case PostgresTypes.int2:
      case PostgresTypes.int4:
      case PostgresTypes.int8:
      case PostgresTypes.numeric:
      case PostgresTypes.oid:
        return toNumber(value);
      case PostgresTypes.json:
      case PostgresTypes.jsonb:
        return toJson(value);
      case PostgresTypes.timestamp:
        return toTimestampString(value);
      // Format to be consistent with PostgREST
      case PostgresTypes.abstime:
      // To allow users to cast it based on Timezone
      case PostgresTypes.date:
      // To allow users to cast it based on Timezone
      case PostgresTypes.daterange:
      case PostgresTypes.int4range:
      case PostgresTypes.int8range:
      case PostgresTypes.money:
      case PostgresTypes.reltime:
      // To allow users to cast it based on Timezone
      case PostgresTypes.text:
      case PostgresTypes.time:
      // To allow users to cast it based on Timezone
      case PostgresTypes.timestamptz:
      // To allow users to cast it based on Timezone
      case PostgresTypes.timetz:
      // To allow users to cast it based on Timezone
      case PostgresTypes.tsrange:
      case PostgresTypes.tstzrange:
        return noop(value);
      default:
        return noop(value);
    }
  };
  var noop = (value) => {
    return value;
  };
  var toBoolean = (value) => {
    switch (value) {
      case "t":
        return true;
      case "f":
        return false;
      default:
        return value;
    }
  };
  var toNumber = (value) => {
    if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      if (!Number.isNaN(parsedValue)) {
        return parsedValue;
      }
    }
    return value;
  };
  var toJson = (value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.log(`JSON parse error: ${error}`);
        return value;
      }
    }
    return value;
  };
  var toArray = (value, type) => {
    if (typeof value !== "string") {
      return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    if (openBrace === "{" && closeBrace === "}") {
      let arr;
      const valTrim = value.slice(1, lastIdx);
      try {
        arr = JSON.parse("[" + valTrim + "]");
      } catch (_) {
        arr = valTrim ? valTrim.split(",") : [];
      }
      return arr.map((val) => convertCell(type, val));
    }
    return value;
  };
  var toTimestampString = (value) => {
    if (typeof value === "string") {
      return value.replace(" ", "T");
    }
    return value;
  };
  var httpEndpointURL = (socketUrl) => {
    let url = socketUrl;
    url = url.replace(/^ws/i, "http");
    url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "");
    return url.replace(/\/+$/, "");
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/push.js
  var Push = class {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */
    constructor(channel2, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
      this.channel = channel2;
      this.event = event;
      this.payload = payload;
      this.timeout = timeout;
      this.sent = false;
      this.timeoutTimer = void 0;
      this.ref = "";
      this.receivedResp = null;
      this.recHooks = [];
      this.refEvent = null;
    }
    resend(timeout) {
      this.timeout = timeout;
      this._cancelRefEvent();
      this.ref = "";
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
      this.send();
    }
    send() {
      if (this._hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref,
        join_ref: this.channel._joinRef()
      });
    }
    updatePayload(payload) {
      this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
      var _a;
      if (this._hasReceived(status)) {
        callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        return;
      }
      this.ref = this.channel.socket._makeRef();
      this.refEvent = this.channel._replyEventName(this.ref);
      const callback = (payload) => {
        this._cancelRefEvent();
        this._cancelTimeout();
        this.receivedResp = payload;
        this._matchReceive(payload);
      };
      this.channel._on(this.refEvent, {}, callback);
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    trigger(status, response) {
      if (this.refEvent)
        this.channel._trigger(this.refEvent, { status, response });
    }
    destroy() {
      this._cancelRefEvent();
      this._cancelTimeout();
    }
    _cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = void 0;
    }
    _matchReceive({ status, response }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
  var REALTIME_PRESENCE_LISTEN_EVENTS;
  (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
    REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
  })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
  var RealtimePresence = class _RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(channel2, opts) {
      this.channel = channel2;
      this.state = {};
      this.pendingDiffs = [];
      this.joinRef = null;
      this.caller = {
        onJoin: () => {
        },
        onLeave: () => {
        },
        onSync: () => {
        }
      };
      const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
        state: "presence_state",
        diff: "presence_diff"
      };
      this.channel._on(events.state, {}, (newState) => {
        const { onJoin, onLeave, onSync } = this.caller;
        this.joinRef = this.channel._joinRef();
        this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
        this.pendingDiffs.forEach((diff) => {
          this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
        });
        this.pendingDiffs = [];
        onSync();
      });
      this.channel._on(events.diff, {}, (diff) => {
        const { onJoin, onLeave, onSync } = this.caller;
        if (this.inPendingSyncState()) {
          this.pendingDiffs.push(diff);
        } else {
          this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          onSync();
        }
      });
      this.onJoin((key, currentPresences, newPresences) => {
        this.channel._trigger("presence", {
          event: "join",
          key,
          currentPresences,
          newPresences
        });
      });
      this.onLeave((key, currentPresences, leftPresences) => {
        this.channel._trigger("presence", {
          event: "leave",
          key,
          currentPresences,
          leftPresences
        });
      });
      this.onSync(() => {
        this.channel._trigger("presence", { event: "sync" });
      });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(currentState, newState, onJoin, onLeave) {
      const state2 = this.cloneDeep(currentState);
      const transformedState = this.transformState(newState);
      const joins = {};
      const leaves = {};
      this.map(state2, (key, presences) => {
        if (!transformedState[key]) {
          leaves[key] = presences;
        }
      });
      this.map(transformedState, (key, newPresences) => {
        const currentPresences = state2[key];
        if (currentPresences) {
          const newPresenceRefs = newPresences.map((m) => m.presence_ref);
          const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
          const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
          const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
          if (joinedPresences.length > 0) {
            joins[key] = joinedPresences;
          }
          if (leftPresences.length > 0) {
            leaves[key] = leftPresences;
          }
        } else {
          joins[key] = newPresences;
        }
      });
      return this.syncDiff(state2, { joins, leaves }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(state2, diff, onJoin, onLeave) {
      const { joins, leaves } = {
        joins: this.transformState(diff.joins),
        leaves: this.transformState(diff.leaves)
      };
      if (!onJoin) {
        onJoin = () => {
        };
      }
      if (!onLeave) {
        onLeave = () => {
        };
      }
      this.map(joins, (key, newPresences) => {
        var _a;
        const currentPresences = (_a = state2[key]) !== null && _a !== void 0 ? _a : [];
        state2[key] = this.cloneDeep(newPresences);
        if (currentPresences.length > 0) {
          const joinedPresenceRefs = state2[key].map((m) => m.presence_ref);
          const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
          state2[key].unshift(...curPresences);
        }
        onJoin(key, currentPresences, newPresences);
      });
      this.map(leaves, (key, leftPresences) => {
        let currentPresences = state2[key];
        if (!currentPresences)
          return;
        const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
        currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
        state2[key] = currentPresences;
        onLeave(key, currentPresences, leftPresences);
        if (currentPresences.length === 0)
          delete state2[key];
      });
      return state2;
    }
    /** @internal */
    static map(obj, func) {
      return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(state2) {
      state2 = this.cloneDeep(state2);
      return Object.getOwnPropertyNames(state2).reduce((newState, key) => {
        const presences = state2[key];
        if ("metas" in presences) {
          newState[key] = presences.metas.map((presence) => {
            presence["presence_ref"] = presence["phx_ref"];
            delete presence["phx_ref"];
            delete presence["phx_ref_prev"];
            return presence;
          });
        } else {
          newState[key] = presences;
        }
        return newState;
      }, {});
    }
    /** @internal */
    static cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */
    onJoin(callback) {
      this.caller.onJoin = callback;
    }
    /** @internal */
    onLeave(callback) {
      this.caller.onLeave = callback;
    }
    /** @internal */
    onSync(callback) {
      this.caller.onSync = callback;
    }
    /** @internal */
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
  var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
  (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
  })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
  var REALTIME_LISTEN_TYPES;
  (function(REALTIME_LISTEN_TYPES2) {
    REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
    REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
  })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
  var REALTIME_SUBSCRIBE_STATES;
  (function(REALTIME_SUBSCRIBE_STATES2) {
    REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
  })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
  var RealtimeChannel = class _RealtimeChannel {
    constructor(topic, params = { config: {} }, socket) {
      this.topic = topic;
      this.params = params;
      this.socket = socket;
      this.bindings = {};
      this.state = CHANNEL_STATES.closed;
      this.joinedOnce = false;
      this.pushBuffer = [];
      this.subTopic = topic.replace(/^realtime:/i, "");
      this.params.config = Object.assign({
        broadcast: { ack: false, self: false },
        presence: { key: "" },
        private: false
      }, params.config);
      this.timeout = this.socket.timeout;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this._onClose(() => {
        this.rejoinTimer.reset();
        this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket._remove(this);
      });
      this._onError((reason) => {
        if (this._isLeaving() || this._isClosed()) {
          return;
        }
        this.socket.log("channel", `error ${this.topic}`, reason);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.joinPush.receive("timeout", () => {
        if (!this._isJoining()) {
          return;
        }
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
        this._trigger(this._replyEventName(ref), payload);
      });
      this.presence = new RealtimePresence(this);
      this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint) + "/api/broadcast";
    }
    /** Subscribe registers your client with the server */
    subscribe(callback, timeout = this.timeout) {
      var _a, _b;
      if (!this.socket.isConnected()) {
        this.socket.connect();
      }
      if (this.joinedOnce) {
        throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
      } else {
        const { config: { broadcast, presence, private: isPrivate } } = this.params;
        this._onError((e) => callback && callback("CHANNEL_ERROR", e));
        this._onClose(() => callback && callback("CLOSED"));
        const accessTokenPayload = {};
        const config = {
          broadcast,
          presence,
          postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [],
          private: isPrivate
        };
        if (this.socket.accessToken) {
          accessTokenPayload.access_token = this.socket.accessToken;
        }
        this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
        this.joinedOnce = true;
        this._rejoin(timeout);
        this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
          var _a2;
          this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
          if (serverPostgresFilters === void 0) {
            callback && callback("SUBSCRIBED");
            return;
          } else {
            const clientPostgresBindings = this.bindings.postgres_changes;
            const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
            const newPostgresBindings = [];
            for (let i = 0; i < bindingsLen; i++) {
              const clientPostgresBinding = clientPostgresBindings[i];
              const { filter: { event, schema, table, filter } } = clientPostgresBinding;
              const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
              if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
              } else {
                this.unsubscribe();
                callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                return;
              }
            }
            this.bindings.postgres_changes = newPostgresBindings;
            callback && callback("SUBSCRIBED");
            return;
          }
        }).receive("error", (error) => {
          callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
          return;
        }).receive("timeout", () => {
          callback && callback("TIMED_OUT");
          return;
        });
      }
      return this;
    }
    presenceState() {
      return this.presence.state;
    }
    async track(payload, opts = {}) {
      return await this.send({
        type: "presence",
        event: "track",
        payload
      }, opts.timeout || this.timeout);
    }
    async untrack(opts = {}) {
      return await this.send({
        type: "presence",
        event: "untrack"
      }, opts);
    }
    on(type, filter, callback) {
      return this._on(type, filter, callback);
    }
    /**
     * Sends a message into the channel.
     *
     * @param args Arguments to send to channel
     * @param args.type The type of event to send
     * @param args.event The name of the event being sent
     * @param args.payload Payload to be sent
     * @param opts Options to be used during the send process
     */
    async send(args, opts = {}) {
      var _a, _b;
      if (!this._canPush() && args.type === "broadcast") {
        const { event, payload: endpoint_payload } = args;
        const options = {
          method: "POST",
          headers: {
            Authorization: this.socket.accessToken ? `Bearer ${this.socket.accessToken}` : "",
            apikey: this.socket.apiKey ? this.socket.apiKey : "",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: [
              { topic: this.subTopic, event, payload: endpoint_payload }
            ]
          })
        };
        try {
          const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
          await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
          return response.ok ? "ok" : "error";
        } catch (error) {
          if (error.name === "AbortError") {
            return "timed out";
          } else {
            return "error";
          }
        }
      } else {
        return new Promise((resolve) => {
          var _a2, _b2, _c;
          const push = this._push(args.type, args, opts.timeout || this.timeout);
          if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
            resolve("ok");
          }
          push.receive("ok", () => resolve("ok"));
          push.receive("error", () => resolve("error"));
          push.receive("timeout", () => resolve("timed out"));
        });
      }
    }
    updateJoinPayload(payload) {
      this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(timeout = this.timeout) {
      this.state = CHANNEL_STATES.leaving;
      const onClose = () => {
        this.socket.log("channel", `leave ${this.topic}`);
        this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
      };
      this.rejoinTimer.reset();
      this.joinPush.destroy();
      return new Promise((resolve) => {
        const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
        leavePush.receive("ok", () => {
          onClose();
          resolve("ok");
        }).receive("timeout", () => {
          onClose();
          resolve("timed out");
        }).receive("error", () => {
          resolve("error");
        });
        leavePush.send();
        if (!this._canPush()) {
          leavePush.trigger("ok", {});
        }
      });
    }
    /** @internal */
    async _fetchWithTimeout(url, options, timeout) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
      clearTimeout(id);
      return response;
    }
    /** @internal */
    _push(event, payload, timeout = this.timeout) {
      if (!this.joinedOnce) {
        throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      }
      let pushEvent = new Push(this, event, payload, timeout);
      if (this._canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(_event, payload, _ref) {
      return payload;
    }
    /** @internal */
    _isMember(topic) {
      return this.topic === topic;
    }
    /** @internal */
    _joinRef() {
      return this.joinPush.ref;
    }
    /** @internal */
    _trigger(type, payload, ref) {
      var _a, _b;
      const typeLower = type.toLocaleLowerCase();
      const { close, error, leave, join } = CHANNEL_EVENTS;
      const events = [close, error, leave, join];
      if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
        return;
      }
      let handledPayload = this._onMessage(typeLower, payload, ref);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }
      if (["insert", "update", "delete"].includes(typeLower)) {
        (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
          var _a2, _b2, _c;
          return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
        }).map((bind) => bind.callback(handledPayload, ref));
      } else {
        (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
          var _a2, _b2, _c, _d, _e, _f;
          if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
            if ("id" in bind) {
              const bindId = bind.id;
              const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
              return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
            } else {
              const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
              return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
            }
          } else {
            return bind.type.toLocaleLowerCase() === typeLower;
          }
        }).map((bind) => {
          if (typeof handledPayload === "object" && "ids" in handledPayload) {
            const postgresChanges = handledPayload.data;
            const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
            const enrichedPayload = {
              schema,
              table,
              commit_timestamp,
              eventType: type2,
              new: {},
              old: {},
              errors
            };
            handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
          }
          bind.callback(handledPayload, ref);
        });
      }
    }
    /** @internal */
    _isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /** @internal */
    _isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /** @internal */
    _isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /** @internal */
    _isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
    /** @internal */
    _replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /** @internal */
    _on(type, filter, callback) {
      const typeLower = type.toLocaleLowerCase();
      const binding = {
        type: typeLower,
        filter,
        callback
      };
      if (this.bindings[typeLower]) {
        this.bindings[typeLower].push(binding);
      } else {
        this.bindings[typeLower] = [binding];
      }
      return this;
    }
    /** @internal */
    _off(type, filter) {
      const typeLower = type.toLocaleLowerCase();
      this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
        var _a;
        return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
      });
      return this;
    }
    /** @internal */
    static isEqual(obj1, obj2) {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
      for (const k in obj1) {
        if (obj1[k] !== obj2[k]) {
          return false;
        }
      }
      return true;
    }
    /** @internal */
    _rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this._rejoin();
      }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(callback) {
      this._on(CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(callback) {
      this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
      return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(timeout = this.timeout) {
      if (this._isLeaving()) {
        return;
      }
      this.socket._leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /** @internal */
    _getPayloadRecords(payload) {
      const records = {
        new: {},
        old: {}
      };
      if (payload.type === "INSERT" || payload.type === "UPDATE") {
        records.new = convertChangeData(payload.columns, payload.record);
      }
      if (payload.type === "UPDATE" || payload.type === "DELETE") {
        records.old = convertChangeData(payload.columns, payload.old_record);
      }
      return records;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
  var noop2 = () => {
  };
  var NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
  var RealtimeClient = class {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */
    constructor(endPoint, options) {
      var _a;
      this.accessToken = null;
      this.apiKey = null;
      this.channels = [];
      this.endPoint = "";
      this.httpEndpoint = "";
      this.headers = DEFAULT_HEADERS;
      this.params = {};
      this.timeout = DEFAULT_TIMEOUT;
      this.heartbeatIntervalMs = 3e4;
      this.heartbeatTimer = void 0;
      this.pendingHeartbeatRef = null;
      this.ref = 0;
      this.logger = noop2;
      this.conn = null;
      this.sendBuffer = [];
      this.serializer = new Serializer();
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this._resolveFetch = (customFetch) => {
        let _fetch;
        if (customFetch) {
          _fetch = customFetch;
        } else if (typeof fetch === "undefined") {
          _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
        } else {
          _fetch = fetch;
        }
        return (...args) => _fetch(...args);
      };
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.httpEndpoint = httpEndpointURL(endPoint);
      if (options === null || options === void 0 ? void 0 : options.transport) {
        this.transport = options.transport;
      } else {
        this.transport = null;
      }
      if (options === null || options === void 0 ? void 0 : options.params)
        this.params = options.params;
      if (options === null || options === void 0 ? void 0 : options.headers)
        this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
      if (options === null || options === void 0 ? void 0 : options.timeout)
        this.timeout = options.timeout;
      if (options === null || options === void 0 ? void 0 : options.logger)
        this.logger = options.logger;
      if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
        this.heartbeatIntervalMs = options.heartbeatIntervalMs;
      const accessToken = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey;
      if (accessToken) {
        this.accessToken = accessToken;
        this.apiKey = accessToken;
      }
      this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries) => {
        return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
      };
      this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
        return callback(JSON.stringify(payload));
      };
      this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
      this.reconnectTimer = new Timer(async () => {
        this.disconnect();
        this.connect();
      }, this.reconnectAfterMs);
      this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
    }
    /**
     * Connects the socket, unless already connected.
     */
    connect() {
      if (this.conn) {
        return;
      }
      if (this.transport) {
        this.conn = new this.transport(this._endPointURL(), void 0, {
          headers: this.headers
        });
        return;
      }
      if (NATIVE_WEBSOCKET_AVAILABLE) {
        this.conn = new WebSocket(this._endPointURL());
        this.setupConnection();
        return;
      }
      this.conn = new WSWebSocketDummy(this._endPointURL(), void 0, {
        close: () => {
          this.conn = null;
        }
      });
      Promise.resolve().then(() => __toESM(require_browser())).then(({ default: WS }) => {
        this.conn = new WS(this._endPointURL(), void 0, {
          headers: this.headers
        });
        this.setupConnection();
      });
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(code, reason) {
      if (this.conn) {
        this.conn.onclose = function() {
        };
        if (code) {
          this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
        } else {
          this.conn.close();
        }
        this.conn = null;
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.reset();
      }
    }
    /**
     * Returns all created channels
     */
    getChannels() {
      return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */
    async removeChannel(channel2) {
      const status = await channel2.unsubscribe();
      if (this.channels.length === 0) {
        this.disconnect();
      }
      return status;
    }
    /**
     * Unsubscribes and removes all channels
     */
    async removeAllChannels() {
      const values_1 = await Promise.all(this.channels.map((channel2) => channel2.unsubscribe()));
      this.disconnect();
      return values_1;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(kind, msg, data2) {
      this.logger(kind, msg, data2);
    }
    /**
     * Returns the current state of the socket.
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return CONNECTION_STATE.Connecting;
        case SOCKET_STATES.open:
          return CONNECTION_STATE.Open;
        case SOCKET_STATES.closing:
          return CONNECTION_STATE.Closing;
        default:
          return CONNECTION_STATE.Closed;
      }
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
      return this.connectionState() === CONNECTION_STATE.Open;
    }
    channel(topic, params = { config: {} }) {
      const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */
    push(data2) {
      const { topic, event, payload, ref } = data2;
      const callback = () => {
        this.encode(data2, (result) => {
          var _a;
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
        });
      };
      this.log("push", `${topic} ${event} (${ref})`, payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */
    setAuth(token) {
      this.accessToken = token;
      this.channels.forEach((channel2) => {
        token && channel2.updateJoinPayload({ access_token: token });
        if (channel2.joinedOnce && channel2._isJoined()) {
          channel2._push(CHANNEL_EVENTS.access_token, { access_token: token });
        }
      });
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */
    _makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */
    _leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
      if (dupChannel) {
        this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.unsubscribe();
      }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */
    _remove(channel2) {
      this.channels = this.channels.filter((c) => c._joinRef() !== channel2._joinRef());
    }
    /**
     * Sets up connection handlers.
     *
     * @internal
     */
    setupConnection() {
      if (this.conn) {
        this.conn.binaryType = "arraybuffer";
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error) => this._onConnError(error);
        this.conn.onmessage = (event) => this._onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
      }
    }
    /**
     * Returns the URL of the websocket.
     *
     * @internal
     */
    _endPointURL() {
      return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
    }
    /** @internal */
    _onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
          this.pendingHeartbeatRef = null;
        }
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        this.channels.filter((channel2) => channel2._isMember(topic)).forEach((channel2) => channel2._trigger(event, payload, ref));
        this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
      });
    }
    /** @internal */
    _onConnOpen() {
      this.log("transport", `connected to ${this._endPointURL()}`);
      this._flushSendBuffer();
      this.reconnectTimer.reset();
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
      this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    /** @internal */
    _onConnClose(event) {
      this.log("transport", "close", event);
      this._triggerChanError();
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    /** @internal */
    _onConnError(error) {
      this.log("transport", error.message);
      this._triggerChanError();
      this.stateChangeCallbacks.error.forEach((callback) => callback(error));
    }
    /** @internal */
    _triggerChanError() {
      this.channels.forEach((channel2) => channel2._trigger(CHANNEL_EVENTS.error));
    }
    /** @internal */
    _appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      const prefix = url.match(/\?/) ? "&" : "?";
      const query = new URLSearchParams(params);
      return `${url}${prefix}${query}`;
    }
    /** @internal */
    _flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    /** @internal */
    _sendHeartbeat() {
      var _a;
      if (!this.isConnected()) {
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this._makeRef();
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      });
      this.setAuth(this.accessToken);
    }
  };
  var WSWebSocketDummy = class {
    constructor(address, _protocols, options) {
      this.binaryType = "arraybuffer";
      this.onclose = () => {
      };
      this.onerror = () => {
      };
      this.onmessage = () => {
      };
      this.onopen = () => {
      };
      this.readyState = SOCKET_STATES.connecting;
      this.send = () => {
      };
      this.url = null;
      this.url = address;
      this.close = options.close;
    }
  };

  // node_modules/@supabase/storage-js/dist/module/lib/errors.js
  var StorageError = class extends Error {
    constructor(message) {
      super(message);
      this.__isStorageError = true;
      this.name = "StorageError";
    }
  };
  function isStorageError(error) {
    return typeof error === "object" && error !== null && "__isStorageError" in error;
  }
  var StorageApiError = class extends StorageError {
    constructor(message, status) {
      super(message);
      this.name = "StorageApiError";
      this.status = status;
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status
      };
    }
  };
  var StorageUnknownError = class extends StorageError {
    constructor(message, originalError) {
      super(message);
      this.name = "StorageUnknownError";
      this.originalError = originalError;
    }
  };

  // node_modules/@supabase/storage-js/dist/module/lib/helpers.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var resolveFetch2 = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
      _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
    } else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };
  var resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
    if (typeof Response === "undefined") {
      return (yield Promise.resolve().then(() => (init_browser(), browser_exports))).Response;
    }
    return Response;
  });
  var recursiveToCamel = (item) => {
    if (Array.isArray(item)) {
      return item.map((el) => recursiveToCamel(el));
    } else if (typeof item === "function" || item !== Object(item)) {
      return item;
    }
    const result = {};
    Object.entries(item).forEach(([key, value]) => {
      const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ""));
      result[newKey] = recursiveToCamel(value);
    });
    return result;
  };

  // node_modules/@supabase/storage-js/dist/module/lib/fetch.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError = (error, reject, options) => __awaiter3(void 0, void 0, void 0, function* () {
    const Res = yield resolveResponse();
    if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
      error.json().then((err) => {
        reject(new StorageApiError(_getErrorMessage(err), error.status || 500));
      }).catch((err) => {
        reject(new StorageUnknownError(_getErrorMessage(err), err));
      });
    } else {
      reject(new StorageUnknownError(_getErrorMessage(error), error));
    }
  });
  var _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
    if (body) {
      params.body = JSON.stringify(body);
    }
    return Object.assign(Object.assign({}, params), parameters);
  };
  function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter3(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options === null || options === void 0 ? void 0 : options.noResolveJson)
            return result;
          return result.json();
        }).then((data2) => resolve(data2)).catch((error) => handleError(error, reject, options));
      });
    });
  }
  function get(fetcher, url, options, parameters) {
    return __awaiter3(this, void 0, void 0, function* () {
      return _handleRequest(fetcher, "GET", url, options, parameters);
    });
  }
  function post(fetcher, url, body, options, parameters) {
    return __awaiter3(this, void 0, void 0, function* () {
      return _handleRequest(fetcher, "POST", url, options, parameters, body);
    });
  }
  function put(fetcher, url, body, options, parameters) {
    return __awaiter3(this, void 0, void 0, function* () {
      return _handleRequest(fetcher, "PUT", url, options, parameters, body);
    });
  }
  function head(fetcher, url, options, parameters) {
    return __awaiter3(this, void 0, void 0, function* () {
      return _handleRequest(fetcher, "HEAD", url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
    });
  }
  function remove(fetcher, url, body, options, parameters) {
    return __awaiter3(this, void 0, void 0, function* () {
      return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
    });
  }

  // node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
      column: "name",
      order: "asc"
    }
  };
  var DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: false
  };
  var StorageFileApi = class {
    constructor(url, headers = {}, bucketId, fetch3) {
      this.url = url;
      this.headers = headers;
      this.bucketId = bucketId;
      this.fetch = resolveFetch2(fetch3);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadOrUpdate(method, path, fileBody, fileOptions) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          let body;
          const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
          let headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
          const metadata = options.metadata;
          if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
            body = new FormData();
            body.append("cacheControl", options.cacheControl);
            body.append("", fileBody);
            if (metadata) {
              body.append("metadata", this.encodeMetadata(metadata));
            }
          } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
            body = fileBody;
            body.append("cacheControl", options.cacheControl);
            if (metadata) {
              body.append("metadata", this.encodeMetadata(metadata));
            }
          } else {
            body = fileBody;
            headers["cache-control"] = `max-age=${options.cacheControl}`;
            headers["content-type"] = options.contentType;
            if (metadata) {
              headers["x-metadata"] = this.toBase64(this.encodeMetadata(metadata));
            }
          }
          if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
            headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
          }
          const cleanPath = this._removeEmptyFolders(path);
          const _path = this._getFinalPath(cleanPath);
          const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body, headers }, (options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {}));
          const data2 = yield res.json();
          if (res.ok) {
            return {
              data: { path: cleanPath, id: data2.Id, fullPath: data2.Key },
              error: null
            };
          } else {
            const error = data2;
            return { data: null, error };
          }
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    upload(path, fileBody, fileOptions) {
      return __awaiter4(this, void 0, void 0, function* () {
        return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
      });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadToSignedUrl(path, token, fileBody, fileOptions) {
      return __awaiter4(this, void 0, void 0, function* () {
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const url = new URL(this.url + `/object/upload/sign/${_path}`);
        url.searchParams.set("token", token);
        try {
          let body;
          const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
          const headers = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options.upsert) });
          if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
            body = new FormData();
            body.append("cacheControl", options.cacheControl);
            body.append("", fileBody);
          } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
            body = fileBody;
            body.append("cacheControl", options.cacheControl);
          } else {
            body = fileBody;
            headers["cache-control"] = `max-age=${options.cacheControl}`;
            headers["content-type"] = options.contentType;
          }
          const res = yield this.fetch(url.toString(), {
            method: "PUT",
            body,
            headers
          });
          const data2 = yield res.json();
          if (res.ok) {
            return {
              data: { path: cleanPath, fullPath: data2.Key },
              error: null
            };
          } else {
            const error = data2;
            return { data: null, error };
          }
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for 2 hours.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
     */
    createSignedUploadUrl(path, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          let _path = this._getFinalPath(path);
          const headers = Object.assign({}, this.headers);
          if (options === null || options === void 0 ? void 0 : options.upsert) {
            headers["x-upsert"] = "true";
          }
          const data2 = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
          const url = new URL(this.url + data2.url);
          const token = url.searchParams.get("token");
          if (!token) {
            throw new StorageError("No token returned by API");
          }
          return { data: { signedUrl: url.toString(), path, token }, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    update(path, fileBody, fileOptions) {
      return __awaiter4(this, void 0, void 0, function* () {
        return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
      });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     * @param options The destination options.
     */
    move(fromPath, toPath, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const data2 = yield post(this.fetch, `${this.url}/object/move`, {
            bucketId: this.bucketId,
            sourceKey: fromPath,
            destinationKey: toPath,
            destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
          }, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     * @param options The destination options.
     */
    copy(fromPath, toPath, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const data2 = yield post(this.fetch, `${this.url}/object/copy`, {
            bucketId: this.bucketId,
            sourceKey: fromPath,
            destinationKey: toPath,
            destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket
          }, { headers: this.headers });
          return { data: { path: data2.Key }, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    createSignedUrl(path, expiresIn, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          let _path = this._getFinalPath(path);
          let data2 = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {}), { headers: this.headers });
          const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
          const signedUrl = encodeURI(`${this.url}${data2.signedURL}${downloadQueryParam}`);
          data2 = { signedUrl };
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */
    createSignedUrls(paths, expiresIn, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const data2 = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
          const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
          return {
            data: data2.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
            error: null
          };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */
    download(path, options) {
      return __awaiter4(this, void 0, void 0, function* () {
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        const queryString = transformationQuery ? `?${transformationQuery}` : "";
        try {
          const _path = this._getFinalPath(path);
          const res = yield get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
            headers: this.headers,
            noResolveJson: true
          });
          const data2 = yield res.blob();
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the details of an existing file.
     * @param path
     */
    info(path) {
      return __awaiter4(this, void 0, void 0, function* () {
        const _path = this._getFinalPath(path);
        try {
          const data2 = yield get(this.fetch, `${this.url}/object/info/${_path}`, {
            headers: this.headers
          });
          return { data: recursiveToCamel(data2), error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Checks the existence of a file.
     * @param path
     */
    exists(path) {
      return __awaiter4(this, void 0, void 0, function* () {
        const _path = this._getFinalPath(path);
        try {
          yield head(this.fetch, `${this.url}/object/${_path}`, {
            headers: this.headers
          });
          return { data: true, error: null };
        } catch (error) {
          if (isStorageError(error) && error instanceof StorageUnknownError) {
            const originalError = error.originalError;
            if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
              return { data: false, error };
            }
          }
          throw error;
        }
      });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    getPublicUrl(path, options) {
      const _path = this._getFinalPath(path);
      const _queryString = [];
      const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
      if (downloadQueryParam !== "") {
        _queryString.push(downloadQueryParam);
      }
      const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
      const renderPath = wantsTransformation ? "render/image" : "object";
      const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
      if (transformationQuery !== "") {
        _queryString.push(transformationQuery);
      }
      let queryString = _queryString.join("&");
      if (queryString !== "") {
        queryString = `?${queryString}`;
      }
      return {
        data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
      };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */
    remove(paths) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const data2 = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */
    // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */
    // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */
    list(path, options, parameters) {
      return __awaiter4(this, void 0, void 0, function* () {
        try {
          const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
          const data2 = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    encodeMetadata(metadata) {
      return JSON.stringify(metadata);
    }
    toBase64(data2) {
      if (typeof Buffer !== "undefined") {
        return Buffer.from(data2).toString("base64");
      }
      return btoa(data2);
    }
    _getFinalPath(path) {
      return `${this.bucketId}/${path}`;
    }
    _removeEmptyFolders(path) {
      return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    transformOptsToQueryString(transform) {
      const params = [];
      if (transform.width) {
        params.push(`width=${transform.width}`);
      }
      if (transform.height) {
        params.push(`height=${transform.height}`);
      }
      if (transform.resize) {
        params.push(`resize=${transform.resize}`);
      }
      if (transform.format) {
        params.push(`format=${transform.format}`);
      }
      if (transform.quality) {
        params.push(`quality=${transform.quality}`);
      }
      return params.join("&");
    }
  };

  // node_modules/@supabase/storage-js/dist/module/lib/version.js
  var version2 = "2.7.0";

  // node_modules/@supabase/storage-js/dist/module/lib/constants.js
  var DEFAULT_HEADERS2 = { "X-Client-Info": `storage-js/${version2}` };

  // node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var StorageBucketApi = class {
    constructor(url, headers = {}, fetch3) {
      this.url = url;
      this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS2), headers);
      this.fetch = resolveFetch2(fetch3);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */
    listBuckets() {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(id) {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */
    createBucket(id, options = {
      public: false
    }) {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield post(this.fetch, `${this.url}/bucket`, {
            id,
            name: id,
            public: options.public,
            file_size_limit: options.fileSizeLimit,
            allowed_mime_types: options.allowedMimeTypes
          }, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */
    updateBucket(id, options) {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield put(this.fetch, `${this.url}/bucket/${id}`, {
            id,
            name: id,
            public: options.public,
            file_size_limit: options.fileSizeLimit,
            allowed_mime_types: options.allowedMimeTypes
          }, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(id) {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(id) {
      return __awaiter5(this, void 0, void 0, function* () {
        try {
          const data2 = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
          return { data: data2, error: null };
        } catch (error) {
          if (isStorageError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
  };

  // node_modules/@supabase/storage-js/dist/module/StorageClient.js
  var StorageClient = class extends StorageBucketApi {
    constructor(url, headers = {}, fetch3) {
      super(url, headers, fetch3);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
      return new StorageFileApi(this.url, this.headers, id, this.fetch);
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/version.js
  var version3 = "2.45.4";

  // node_modules/@supabase/supabase-js/dist/module/lib/constants.js
  var JS_ENV = "";
  if (typeof Deno !== "undefined") {
    JS_ENV = "deno";
  } else if (typeof document !== "undefined") {
    JS_ENV = "web";
  } else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    JS_ENV = "react-native";
  } else {
    JS_ENV = "node";
  }
  var DEFAULT_HEADERS3 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version3}` };
  var DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS3
  };
  var DEFAULT_DB_OPTIONS = {
    schema: "public"
  };
  var DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
  };
  var DEFAULT_REALTIME_OPTIONS = {};

  // node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
  init_browser();
  var __awaiter6 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var resolveFetch3 = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
      _fetch = browser_default;
    } else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };
  var resolveHeadersConstructor = () => {
    if (typeof Headers === "undefined") {
      return Headers2;
    }
    return Headers;
  };
  var fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
    const fetch3 = resolveFetch3(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init) => __awaiter6(void 0, void 0, void 0, function* () {
      var _a;
      const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
      let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
      if (!headers.has("apikey")) {
        headers.set("apikey", supabaseKey);
      }
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return fetch3(input, Object.assign(Object.assign({}, init), { headers }));
    });
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
  var __awaiter7 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  function stripTrailingSlash(url) {
    return url.replace(/\/$/, "");
  }
  function applySettingDefaults(options, defaults) {
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
    const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
    const result = {
      db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
      realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
      global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions),
      accessToken: () => __awaiter7(this, void 0, void 0, function* () {
        return "";
      })
    };
    if (options.accessToken) {
      result.accessToken = options.accessToken;
    } else {
      delete result.accessToken;
    }
    return result;
  }

  // node_modules/@supabase/auth-js/dist/module/lib/version.js
  var version4 = "2.65.0";

  // node_modules/@supabase/auth-js/dist/module/lib/constants.js
  var GOTRUE_URL = "http://localhost:9999";
  var STORAGE_KEY = "supabase.auth.token";
  var DEFAULT_HEADERS4 = { "X-Client-Info": `gotrue-js/${version4}` };
  var EXPIRY_MARGIN = 10;
  var API_VERSION_HEADER_NAME = "X-Supabase-Api-Version";
  var API_VERSIONS = {
    "2024-01-01": {
      timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
      name: "2024-01-01"
    }
  };

  // node_modules/@supabase/auth-js/dist/module/lib/helpers.js
  function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1e3);
    return timeNow + expiresIn;
  }
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  var isBrowser = () => typeof document !== "undefined";
  var localStorageWriteTests = {
    tested: false,
    writable: false
  };
  var supportsLocalStorage = () => {
    if (!isBrowser()) {
      return false;
    }
    try {
      if (typeof globalThis.localStorage !== "object") {
        return false;
      }
    } catch (e) {
      return false;
    }
    if (localStorageWriteTests.tested) {
      return localStorageWriteTests.writable;
    }
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
      globalThis.localStorage.setItem(randomKey, randomKey);
      globalThis.localStorage.removeItem(randomKey);
      localStorageWriteTests.tested = true;
      localStorageWriteTests.writable = true;
    } catch (e) {
      localStorageWriteTests.tested = true;
      localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
  };
  function parseParametersFromURL(href) {
    const result = {};
    const url = new URL(href);
    if (url.hash && url.hash[0] === "#") {
      try {
        const hashSearchParams = new URLSearchParams(url.hash.substring(1));
        hashSearchParams.forEach((value, key) => {
          result[key] = value;
        });
      } catch (e) {
      }
    }
    url.searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  var resolveFetch4 = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
      _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
    } else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };
  var looksLikeFetchResponse = (maybeResponse) => {
    return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
  };
  var setItemAsync = async (storage, key, data2) => {
    await storage.setItem(key, JSON.stringify(data2));
  };
  var getItemAsync = async (storage, key) => {
    const value = await storage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (_a) {
      return value;
    }
  };
  var removeItemAsync = async (storage, key) => {
    await storage.removeItem(key);
  };
  function decodeBase64URL(value) {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let base64 = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    value = value.replace("-", "+").replace("_", "/");
    while (i < value.length) {
      enc1 = key.indexOf(value.charAt(i++));
      enc2 = key.indexOf(value.charAt(i++));
      enc3 = key.indexOf(value.charAt(i++));
      enc4 = key.indexOf(value.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      base64 = base64 + String.fromCharCode(chr1);
      if (enc3 != 64 && chr2 != 0) {
        base64 = base64 + String.fromCharCode(chr2);
      }
      if (enc4 != 64 && chr3 != 0) {
        base64 = base64 + String.fromCharCode(chr3);
      }
    }
    return base64;
  }
  var Deferred = class _Deferred {
    constructor() {
      ;
      this.promise = new _Deferred.promiseConstructor((res, rej) => {
        ;
        this.resolve = res;
        this.reject = rej;
      });
    }
  };
  Deferred.promiseConstructor = Promise;
  function decodeJWTPayload(token) {
    const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("JWT is not valid: not a JWT structure");
    }
    if (!base64UrlRegex.test(parts[1])) {
      throw new Error("JWT is not valid: payload is not in base64url format");
    }
    const base64Url = parts[1];
    return JSON.parse(decodeBase64URL(base64Url));
  }
  async function sleep(time) {
    return await new Promise((accept) => {
      setTimeout(() => accept(null), time);
    });
  }
  function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject) => {
      ;
      (async () => {
        for (let attempt = 0; attempt < Infinity; attempt++) {
          try {
            const result = await fn(attempt);
            if (!isRetryable(attempt, null, result)) {
              accept(result);
              return;
            }
          } catch (e) {
            if (!isRetryable(attempt, e)) {
              reject(e);
              return;
            }
          }
        }
      })();
    });
    return promise;
  }
  function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }
  function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === "undefined") {
      const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      const charSetLen = charSet.length;
      let verifier = "";
      for (let i = 0; i < verifierLength; i++) {
        verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
      }
      return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }
  async function sha256(randomString) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(randomString);
    const hash = await crypto.subtle.digest("SHA-256", encodedData);
    const bytes = new Uint8Array(hash);
    return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
  }
  function base64urlencode(str) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  async function generatePKCEChallenge(verifier) {
    const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
    if (!hasCryptoSupport) {
      console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
      return verifier;
    }
    const hashed = await sha256(verifier);
    return base64urlencode(hashed);
  }
  async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
    const codeVerifier = generatePKCEVerifier();
    let storedCodeVerifier = codeVerifier;
    if (isPasswordRecovery) {
      storedCodeVerifier += "/PASSWORD_RECOVERY";
    }
    await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
    const codeChallenge = await generatePKCEChallenge(codeVerifier);
    const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
    return [codeChallenge, codeChallengeMethod];
  }
  var API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
  function parseResponseAPIVersion(response) {
    const apiVersion = response.headers.get(API_VERSION_HEADER_NAME);
    if (!apiVersion) {
      return null;
    }
    if (!apiVersion.match(API_VERSION_REGEX)) {
      return null;
    }
    try {
      const date = /* @__PURE__ */ new Date(`${apiVersion}T00:00:00.0Z`);
      return date;
    } catch (e) {
      return null;
    }
  }

  // node_modules/@supabase/auth-js/dist/module/lib/errors.js
  var AuthError = class extends Error {
    constructor(message, status, code) {
      super(message);
      this.__isAuthError = true;
      this.name = "AuthError";
      this.status = status;
      this.code = code;
    }
  };
  function isAuthError(error) {
    return typeof error === "object" && error !== null && "__isAuthError" in error;
  }
  var AuthApiError = class extends AuthError {
    constructor(message, status, code) {
      super(message, status, code);
      this.name = "AuthApiError";
      this.status = status;
      this.code = code;
    }
  };
  function isAuthApiError(error) {
    return isAuthError(error) && error.name === "AuthApiError";
  }
  var AuthUnknownError = class extends AuthError {
    constructor(message, originalError) {
      super(message);
      this.name = "AuthUnknownError";
      this.originalError = originalError;
    }
  };
  var CustomAuthError = class extends AuthError {
    constructor(message, name, status, code) {
      super(message, status, code);
      this.name = name;
      this.status = status;
    }
  };
  var AuthSessionMissingError = class extends CustomAuthError {
    constructor() {
      super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
    }
  };
  function isAuthSessionMissingError(error) {
    return isAuthError(error) && error.name === "AuthSessionMissingError";
  }
  var AuthInvalidTokenResponseError = class extends CustomAuthError {
    constructor() {
      super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
    }
  };
  var AuthInvalidCredentialsError = class extends CustomAuthError {
    constructor(message) {
      super(message, "AuthInvalidCredentialsError", 400, void 0);
    }
  };
  var AuthImplicitGrantRedirectError = class extends CustomAuthError {
    constructor(message, details = null) {
      super(message, "AuthImplicitGrantRedirectError", 500, void 0);
      this.details = null;
      this.details = details;
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        details: this.details
      };
    }
  };
  var AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
    constructor(message, details = null) {
      super(message, "AuthPKCEGrantCodeExchangeError", 500, void 0);
      this.details = null;
      this.details = details;
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        details: this.details
      };
    }
  };
  var AuthRetryableFetchError = class extends CustomAuthError {
    constructor(message, status) {
      super(message, "AuthRetryableFetchError", status, void 0);
    }
  };
  function isAuthRetryableFetchError(error) {
    return isAuthError(error) && error.name === "AuthRetryableFetchError";
  }
  var AuthWeakPasswordError = class extends CustomAuthError {
    constructor(message, status, reasons) {
      super(message, "AuthWeakPasswordError", status, "weak_password");
      this.reasons = reasons;
    }
  };

  // node_modules/@supabase/auth-js/dist/module/lib/fetch.js
  var __rest = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  var _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var NETWORK_ERROR_CODES = [502, 503, 504];
  async function handleError2(error) {
    var _a;
    if (!looksLikeFetchResponse(error)) {
      throw new AuthRetryableFetchError(_getErrorMessage2(error), 0);
    }
    if (NETWORK_ERROR_CODES.includes(error.status)) {
      throw new AuthRetryableFetchError(_getErrorMessage2(error), error.status);
    }
    let data2;
    try {
      data2 = await error.json();
    } catch (e) {
      throw new AuthUnknownError(_getErrorMessage2(e), e);
    }
    let errorCode = void 0;
    const responseAPIVersion = parseResponseAPIVersion(error);
    if (responseAPIVersion && responseAPIVersion.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof data2 === "object" && data2 && typeof data2.code === "string") {
      errorCode = data2.code;
    } else if (typeof data2 === "object" && data2 && typeof data2.error_code === "string") {
      errorCode = data2.error_code;
    }
    if (!errorCode) {
      if (typeof data2 === "object" && data2 && typeof data2.weak_password === "object" && data2.weak_password && Array.isArray(data2.weak_password.reasons) && data2.weak_password.reasons.length && data2.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
        throw new AuthWeakPasswordError(_getErrorMessage2(data2), error.status, data2.weak_password.reasons);
      }
    } else if (errorCode === "weak_password") {
      throw new AuthWeakPasswordError(_getErrorMessage2(data2), error.status, ((_a = data2.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
    } else if (errorCode === "session_not_found") {
      throw new AuthSessionMissingError();
    }
    throw new AuthApiError(_getErrorMessage2(data2), error.status || 500, errorCode);
  }
  var _getRequestParams2 = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
  };
  async function _request(fetcher, method, url, options) {
    var _a;
    const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
    if (!headers[API_VERSION_HEADER_NAME]) {
      headers[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name;
    }
    if (options === null || options === void 0 ? void 0 : options.jwt) {
      headers["Authorization"] = `Bearer ${options.jwt}`;
    }
    const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      qs["redirect_to"] = options.redirectTo;
    }
    const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
    const data2 = await _handleRequest2(fetcher, method, url + queryString, {
      headers,
      noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
    }, {}, options === null || options === void 0 ? void 0 : options.body);
    return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data2) : { data: Object.assign({}, data2), error: null };
  }
  async function _handleRequest2(fetcher, method, url, options, parameters, body) {
    const requestParams = _getRequestParams2(method, options, parameters, body);
    let result;
    try {
      result = await fetcher(url, Object.assign({}, requestParams));
    } catch (e) {
      console.error(e);
      throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
    }
    if (!result.ok) {
      await handleError2(result);
    }
    if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
      return result;
    }
    try {
      return await result.json();
    } catch (e) {
      await handleError2(e);
    }
  }
  function _sessionResponse(data2) {
    var _a;
    let session = null;
    if (hasSession(data2)) {
      session = Object.assign({}, data2);
      if (!data2.expires_at) {
        session.expires_at = expiresAt(data2.expires_in);
      }
    }
    const user = (_a = data2.user) !== null && _a !== void 0 ? _a : data2;
    return { data: { session, user }, error: null };
  }
  function _sessionResponsePassword(data2) {
    const response = _sessionResponse(data2);
    if (!response.error && data2.weak_password && typeof data2.weak_password === "object" && Array.isArray(data2.weak_password.reasons) && data2.weak_password.reasons.length && data2.weak_password.message && typeof data2.weak_password.message === "string" && data2.weak_password.reasons.reduce((a, i) => a && typeof i === "string", true)) {
      response.data.weak_password = data2.weak_password;
    }
    return response;
  }
  function _userResponse(data2) {
    var _a;
    const user = (_a = data2.user) !== null && _a !== void 0 ? _a : data2;
    return { data: { user }, error: null };
  }
  function _ssoResponse(data2) {
    return { data: data2, error: null };
  }
  function _generateLinkResponse(data2) {
    const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data2, rest = __rest(data2, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
    const properties = {
      action_link,
      email_otp,
      hashed_token,
      redirect_to,
      verification_type
    };
    const user = Object.assign({}, rest);
    return {
      data: {
        properties,
        user
      },
      error: null
    };
  }
  function _noResolveJsonResponse(data2) {
    return data2;
  }
  function hasSession(data2) {
    return data2.access_token && data2.refresh_token && data2.expires_in;
  }

  // node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js
  var __rest2 = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  var GoTrueAdminApi = class {
    constructor({ url = "", headers = {}, fetch: fetch3 }) {
      this.url = url;
      this.headers = headers;
      this.fetch = resolveFetch4(fetch3);
      this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this)
      };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     * @param scope The logout sope.
     */
    async signOut(jwt, scope = "global") {
      try {
        await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
          headers: this.headers,
          jwt,
          noResolveJson: true
        });
        return { data: null, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */
    async inviteUserByEmail(email, options = {}) {
      try {
        return await _request(this.fetch, "POST", `${this.url}/invite`, {
          body: { email, data: options.data },
          headers: this.headers,
          redirectTo: options.redirectTo,
          xform: _userResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */
    async generateLink(params) {
      try {
        const { options } = params, rest = __rest2(params, ["options"]);
        const body = Object.assign(Object.assign({}, rest), options);
        if ("newEmail" in rest) {
          body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
          delete body["newEmail"];
        }
        return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body,
          headers: this.headers,
          xform: _generateLinkResponse,
          redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
        });
      } catch (error) {
        if (isAuthError(error)) {
          return {
            data: {
              properties: null,
              user: null
            },
            error
          };
        }
        throw error;
      }
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async createUser(attributes) {
      try {
        return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
          body: attributes,
          headers: this.headers,
          xform: _userResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */
    async listUsers(params) {
      var _a, _b, _c, _d, _e, _f, _g;
      try {
        const pagination = { nextPage: null, lastPage: 0, total: 0 };
        const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: true,
          query: {
            page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
            per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
          },
          xform: _noResolveJsonResponse
        });
        if (response.error)
          throw response.error;
        const users = await response.json();
        const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
        const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
        if (links.length > 0) {
          links.forEach((link) => {
            const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
            const rel = JSON.parse(link.split(";")[1].split("=")[1]);
            pagination[`${rel}Page`] = page;
          });
          pagination.total = parseInt(total);
        }
        return { data: Object.assign(Object.assign({}, users), pagination), error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { users: [] }, error };
        }
        throw error;
      }
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async getUserById(uid) {
      try {
        return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
          headers: this.headers,
          xform: _userResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async updateUserById(uid, attributes) {
      try {
        return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
          body: attributes,
          headers: this.headers,
          xform: _userResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted (setting `deleted_at` to the current timestamp and disabling their account while preserving their data) from the auth schema.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async deleteUser(id, shouldSoftDelete = false) {
      try {
        return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
          headers: this.headers,
          body: {
            should_soft_delete: shouldSoftDelete
          },
          xform: _userResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    async _listFactors(params) {
      try {
        const { data: data2, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
          headers: this.headers,
          xform: (factors) => {
            return { data: { factors }, error: null };
          }
        });
        return { data: data2, error };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    async _deleteFactor(params) {
      try {
        const data2 = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
          headers: this.headers
        });
        return { data: data2, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
  };

  // node_modules/@supabase/auth-js/dist/module/lib/local-storage.js
  var localStorageAdapter = {
    getItem: (key) => {
      if (!supportsLocalStorage()) {
        return null;
      }
      return globalThis.localStorage.getItem(key);
    },
    setItem: (key, value) => {
      if (!supportsLocalStorage()) {
        return;
      }
      globalThis.localStorage.setItem(key, value);
    },
    removeItem: (key) => {
      if (!supportsLocalStorage()) {
        return;
      }
      globalThis.localStorage.removeItem(key);
    }
  };
  function memoryLocalStorageAdapter(store = {}) {
    return {
      getItem: (key) => {
        return store[key] || null;
      },
      setItem: (key, value) => {
        store[key] = value;
      },
      removeItem: (key) => {
        delete store[key];
      }
    };
  }

  // node_modules/@supabase/auth-js/dist/module/lib/polyfills.js
  function polyfillGlobalThis() {
    if (typeof globalThis === "object")
      return;
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: true
      });
      __magic__.globalThis = __magic__;
      delete Object.prototype.__magic__;
    } catch (e) {
      if (typeof self !== "undefined") {
        self.globalThis = self;
      }
    }
  }

  // node_modules/@supabase/auth-js/dist/module/lib/locks.js
  var internals = {
    /**
     * @experimental
     */
    debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
  };
  var LockAcquireTimeoutError = class extends Error {
    constructor(message) {
      super(message);
      this.isAcquireTimeout = true;
    }
  };
  var NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
  };
  async function navigatorLock(name, acquireTimeout, fn) {
    if (internals.debug) {
      console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
    }
    const abortController = new globalThis.AbortController();
    if (acquireTimeout > 0) {
      setTimeout(() => {
        abortController.abort();
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
        }
      }, acquireTimeout);
    }
    return await globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
      mode: "exclusive",
      ifAvailable: true
    } : {
      mode: "exclusive",
      signal: abortController.signal
    }, async (lock) => {
      if (lock) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
        }
        try {
          return await fn();
        } finally {
          if (internals.debug) {
            console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
          }
        }
      } else {
        if (acquireTimeout === 0) {
          if (internals.debug) {
            console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
          }
          throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
        } else {
          if (internals.debug) {
            try {
              const result = await globalThis.navigator.locks.query();
              console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
            } catch (e) {
              console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
            }
          }
          console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
          return await fn();
        }
      }
    });
  }

  // node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
  polyfillGlobalThis();
  var DEFAULT_OPTIONS = {
    url: GOTRUE_URL,
    storageKey: STORAGE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: DEFAULT_HEADERS4,
    flowType: "implicit",
    debug: false,
    hasCustomAuthorizationHeader: false
  };
  var AUTO_REFRESH_TICK_DURATION = 30 * 1e3;
  var AUTO_REFRESH_TICK_THRESHOLD = 3;
  async function lockNoOp(name, acquireTimeout, fn) {
    return await fn();
  }
  var GoTrueClient = class _GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */
    constructor(options) {
      var _a, _b;
      this.memoryStorage = null;
      this.stateChangeEmitters = /* @__PURE__ */ new Map();
      this.autoRefreshTicker = null;
      this.visibilityChangedCallback = null;
      this.refreshingDeferred = null;
      this.initializePromise = null;
      this.detectSessionInUrl = true;
      this.hasCustomAuthorizationHeader = false;
      this.suppressGetSessionWarning = false;
      this.lockAcquired = false;
      this.pendingInLock = [];
      this.broadcastChannel = null;
      this.logger = console.log;
      this.instanceID = _GoTrueClient.nextInstanceID;
      _GoTrueClient.nextInstanceID += 1;
      if (this.instanceID > 0 && isBrowser()) {
        console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
      }
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
      this.logDebugMessages = !!settings.debug;
      if (typeof settings.debug === "function") {
        this.logger = settings.debug;
      }
      this.persistSession = settings.persistSession;
      this.storageKey = settings.storageKey;
      this.autoRefreshToken = settings.autoRefreshToken;
      this.admin = new GoTrueAdminApi({
        url: settings.url,
        headers: settings.headers,
        fetch: settings.fetch
      });
      this.url = settings.url;
      this.headers = settings.headers;
      this.fetch = resolveFetch4(settings.fetch);
      this.lock = settings.lock || lockNoOp;
      this.detectSessionInUrl = settings.detectSessionInUrl;
      this.flowType = settings.flowType;
      this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
      if (settings.lock) {
        this.lock = settings.lock;
      } else if (isBrowser() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
        this.lock = navigatorLock;
      } else {
        this.lock = lockNoOp;
      }
      this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
      };
      if (this.persistSession) {
        if (settings.storage) {
          this.storage = settings.storage;
        } else {
          if (supportsLocalStorage()) {
            this.storage = localStorageAdapter;
          } else {
            this.memoryStorage = {};
            this.storage = memoryLocalStorageAdapter(this.memoryStorage);
          }
        }
      } else {
        this.memoryStorage = {};
        this.storage = memoryLocalStorageAdapter(this.memoryStorage);
      }
      if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
        try {
          this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
        } catch (e) {
          console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
        }
        (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener("message", async (event) => {
          this._debug("received broadcast notification from other tab or client", event);
          await this._notifyAllSubscribers(event.data.event, event.data.session, false);
        });
      }
      this.initialize();
    }
    _debug(...args) {
      if (this.logDebugMessages) {
        this.logger(`GoTrueClient@${this.instanceID} (${version4}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
      }
      return this;
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */
    async initialize() {
      if (this.initializePromise) {
        return await this.initializePromise;
      }
      this.initializePromise = (async () => {
        return await this._acquireLock(-1, async () => {
          return await this._initialize();
        });
      })();
      return await this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */
    async _initialize() {
      try {
        const isPKCEFlow = isBrowser() ? await this._isPKCEFlow() : false;
        this._debug("#_initialize()", "begin", "is PKCE flow", isPKCEFlow);
        if (isPKCEFlow || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
          const { data: data2, error } = await this._getSessionFromURL(isPKCEFlow);
          if (error) {
            this._debug("#_initialize()", "error detecting session from URL", error);
            if ((error === null || error === void 0 ? void 0 : error.message) === "Identity is already linked" || (error === null || error === void 0 ? void 0 : error.message) === "Identity is already linked to another user") {
              return { error };
            }
            await this._removeSession();
            return { error };
          }
          const { session, redirectType } = data2;
          this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
          await this._saveSession(session);
          setTimeout(async () => {
            if (redirectType === "recovery") {
              await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
            } else {
              await this._notifyAllSubscribers("SIGNED_IN", session);
            }
          }, 0);
          return { error: null };
        }
        await this._recoverAndRefresh();
        return { error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { error };
        }
        return {
          error: new AuthUnknownError("Unexpected error during initialization", error)
        };
      } finally {
        await this._handleVisibilityChange();
        this._debug("#_initialize()", "end");
      }
    }
    /**
     * Creates a new anonymous user.
     *
     * @returns A session where the is_anonymous claim in the access token JWT set to true
     */
    async signInAnonymously(credentials) {
      var _a, _b, _c;
      try {
        const res = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
            gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken }
          },
          xform: _sessionResponse
        });
        const { data: data2, error } = res;
        if (error || !data2) {
          return { data: { user: null, session: null }, error };
        }
        const session = data2.session;
        const user = data2.user;
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user, session }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    async signUp(credentials) {
      var _a, _b, _c;
      try {
        let res;
        if ("email" in credentials) {
          const { email, password, options } = credentials;
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            ;
            [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
          }
          res = await _request(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
            body: {
              email,
              password,
              data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
              code_challenge: codeChallenge,
              code_challenge_method: codeChallengeMethod
            },
            xform: _sessionResponse
          });
        } else if ("phone" in credentials) {
          const { phone, password, options } = credentials;
          res = await _request(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            body: {
              phone,
              password,
              data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
              channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: _sessionResponse
          });
        } else {
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
        }
        const { data: data2, error } = res;
        if (error || !data2) {
          return { data: { user: null, session: null }, error };
        }
        const session = data2.session;
        const user = data2.user;
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user, session }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */
    async signInWithPassword(credentials) {
      try {
        let res;
        if ("email" in credentials) {
          const { email, password, options } = credentials;
          res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              email,
              password,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: _sessionResponsePassword
          });
        } else if ("phone" in credentials) {
          const { phone, password, options } = credentials;
          res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              phone,
              password,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: _sessionResponsePassword
          });
        } else {
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
        }
        const { data: data2, error } = res;
        if (error) {
          return { data: { user: null, session: null }, error };
        } else if (!data2 || !data2.session || !data2.user) {
          return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
        }
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", data2.session);
        }
        return {
          data: Object.assign({ user: data2.user, session: data2.session }, data2.weak_password ? { weakPassword: data2.weak_password } : null),
          error
        };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */
    async signInWithOAuth(credentials) {
      var _a, _b, _c, _d;
      return await this._handleProviderSignIn(credentials.provider, {
        redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
        scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
        queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
        skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
      });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */
    async exchangeCodeForSession(authCode) {
      await this.initializePromise;
      return this._acquireLock(-1, async () => {
        return this._exchangeCodeForSession(authCode);
      });
    }
    async _exchangeCodeForSession(authCode) {
      const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
      try {
        const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
          headers: this.headers,
          body: {
            auth_code: authCode,
            code_verifier: codeVerifier
          },
          xform: _sessionResponse
        });
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        if (error) {
          throw error;
        }
        if (!data2 || !data2.session || !data2.user) {
          return {
            data: { user: null, session: null, redirectType: null },
            error: new AuthInvalidTokenResponseError()
          };
        }
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", data2.session);
        }
        return { data: Object.assign(Object.assign({}, data2), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null, redirectType: null }, error };
        }
        throw error;
      }
    }
    /**
     * Allows signing in with an OIDC ID token. The authentication provider used
     * should be enabled and configured.
     */
    async signInWithIdToken(credentials) {
      try {
        const { options, provider, token, access_token, nonce } = credentials;
        const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
          headers: this.headers,
          body: {
            provider,
            id_token: token,
            access_token,
            nonce,
            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
          },
          xform: _sessionResponse
        });
        const { data: data2, error } = res;
        if (error) {
          return { data: { user: null, session: null }, error };
        } else if (!data2 || !data2.session || !data2.user) {
          return {
            data: { user: null, session: null },
            error: new AuthInvalidTokenResponseError()
          };
        }
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", data2.session);
        }
        return { data: data2, error };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */
    async signInWithOtp(credentials) {
      var _a, _b, _c, _d, _e;
      try {
        if ("email" in credentials) {
          const { email, options } = credentials;
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            ;
            [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
          }
          const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
            headers: this.headers,
            body: {
              email,
              data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
              create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
              code_challenge: codeChallenge,
              code_challenge_method: codeChallengeMethod
            },
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
          });
          return { data: { user: null, session: null }, error };
        }
        if ("phone" in credentials) {
          const { phone, options } = credentials;
          const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
            headers: this.headers,
            body: {
              phone,
              data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
              create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
              channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
            }
          });
          return { data: { user: null, session: null, messageId: data2 === null || data2 === void 0 ? void 0 : data2.message_id }, error };
        }
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
     */
    async verifyOtp(params) {
      var _a, _b;
      try {
        let redirectTo = void 0;
        let captchaToken = void 0;
        if ("options" in params) {
          redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
          captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
        }
        const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
          headers: this.headers,
          body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
          redirectTo,
          xform: _sessionResponse
        });
        if (error) {
          throw error;
        }
        if (!data2) {
          throw new Error("An error occurred on token verification.");
        }
        const session = data2.session;
        const user = data2.user;
        if (session === null || session === void 0 ? void 0 : session.access_token) {
          await this._saveSession(session);
          await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
        }
        return { data: { user, session }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */
    async signInWithSSO(params) {
      var _a, _b, _c;
      try {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          ;
          [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        }
        return await _request(this.fetch, "POST", `${this.url}/sso`, {
          body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
          headers: this.headers,
          xform: _ssoResponse
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */
    async reauthenticate() {
      await this.initializePromise;
      return await this._acquireLock(-1, async () => {
        return await this._reauthenticate();
      });
    }
    async _reauthenticate() {
      try {
        return await this._useSession(async (result) => {
          const { data: { session }, error: sessionError } = result;
          if (sessionError)
            throw sessionError;
          if (!session)
            throw new AuthSessionMissingError();
          const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
            headers: this.headers,
            jwt: session.access_token
          });
          return { data: { user: null, session: null }, error };
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */
    async resend(credentials) {
      try {
        const endpoint = `${this.url}/resend`;
        if ("email" in credentials) {
          const { email, type, options } = credentials;
          const { error } = await _request(this.fetch, "POST", endpoint, {
            headers: this.headers,
            body: {
              email,
              type,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
          });
          return { data: { user: null, session: null }, error };
        } else if ("phone" in credentials) {
          const { phone, type, options } = credentials;
          const { data: data2, error } = await _request(this.fetch, "POST", endpoint, {
            headers: this.headers,
            body: {
              phone,
              type,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            }
          });
          return { data: { user: null, session: null, messageId: data2 === null || data2 === void 0 ? void 0 : data2.message_id }, error };
        }
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Returns the session, refreshing it if necessary.
     *
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     *
     * **IMPORTANT:** This method loads values directly from the storage attached
     * to the client. If that storage is based on request cookies for example,
     * the values in it may not be authentic and therefore it's strongly advised
     * against using this method and its results in such circumstances. A warning
     * will be emitted if this is detected. Use {@link #getUser()} instead.
     */
    async getSession() {
      await this.initializePromise;
      const result = await this._acquireLock(-1, async () => {
        return this._useSession(async (result2) => {
          return result2;
        });
      });
      return result;
    }
    /**
     * Acquires a global lock based on the storage key.
     */
    async _acquireLock(acquireTimeout, fn) {
      this._debug("#_acquireLock", "begin", acquireTimeout);
      try {
        if (this.lockAcquired) {
          const last = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
          const result = (async () => {
            await last;
            return await fn();
          })();
          this.pendingInLock.push((async () => {
            try {
              await result;
            } catch (e) {
            }
          })());
          return result;
        }
        return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
          this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
          try {
            this.lockAcquired = true;
            const result = fn();
            this.pendingInLock.push((async () => {
              try {
                await result;
              } catch (e) {
              }
            })());
            await result;
            while (this.pendingInLock.length) {
              const waitOn = [...this.pendingInLock];
              await Promise.all(waitOn);
              this.pendingInLock.splice(0, waitOn.length);
            }
            return await result;
          } finally {
            this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
            this.lockAcquired = false;
          }
        });
      } finally {
        this._debug("#_acquireLock", "end");
      }
    }
    /**
     * Use instead of {@link #getSession} inside the library. It is
     * semantically usually what you want, as getting a session involves some
     * processing afterwards that requires only one client operating on the
     * session at once across multiple tabs or processes.
     */
    async _useSession(fn) {
      this._debug("#_useSession", "begin");
      try {
        const result = await this.__loadSession();
        return await fn(result);
      } finally {
        this._debug("#_useSession", "end");
      }
    }
    /**
     * NEVER USE DIRECTLY!
     *
     * Always use {@link #_useSession}.
     */
    async __loadSession() {
      this._debug("#__loadSession()", "begin");
      if (!this.lockAcquired) {
        this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
      }
      try {
        let currentSession = null;
        const maybeSession = await getItemAsync(this.storage, this.storageKey);
        this._debug("#getSession()", "session from storage", maybeSession);
        if (maybeSession !== null) {
          if (this._isValidSession(maybeSession)) {
            currentSession = maybeSession;
          } else {
            this._debug("#getSession()", "session from storage is not valid");
            await this._removeSession();
          }
        }
        if (!currentSession) {
          return { data: { session: null }, error: null };
        }
        const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
        this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
        if (!hasExpired) {
          if (this.storage.isServer) {
            let suppressWarning = this.suppressGetSessionWarning;
            const proxySession = new Proxy(currentSession, {
              get: (target, prop, receiver) => {
                if (!suppressWarning && prop === "user") {
                  console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.");
                  suppressWarning = true;
                  this.suppressGetSessionWarning = true;
                }
                return Reflect.get(target, prop, receiver);
              }
            });
            currentSession = proxySession;
          }
          return { data: { session: currentSession }, error: null };
        }
        const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return { data: { session: null }, error };
        }
        return { data: { session }, error: null };
      } finally {
        this._debug("#__loadSession()", "end");
      }
    }
    /**
     * Gets the current user details if there is an existing session. This method
     * performs a network request to the Supabase Auth server, so the returned
     * value is authentic and can be used to base authorization rules on.
     *
     * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
     */
    async getUser(jwt) {
      if (jwt) {
        return await this._getUser(jwt);
      }
      await this.initializePromise;
      const result = await this._acquireLock(-1, async () => {
        return await this._getUser();
      });
      return result;
    }
    async _getUser(jwt) {
      try {
        if (jwt) {
          return await _request(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt,
            xform: _userResponse
          });
        }
        return await this._useSession(async (result) => {
          var _a, _b, _c;
          const { data: data2, error } = result;
          if (error) {
            throw error;
          }
          if (!((_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) {
            return { data: { user: null }, error: new AuthSessionMissingError() };
          }
          return await _request(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: (_c = (_b = data2.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : void 0,
            xform: _userResponse
          });
        });
      } catch (error) {
        if (isAuthError(error)) {
          if (isAuthSessionMissingError(error)) {
            await this._removeSession();
            await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            await this._notifyAllSubscribers("SIGNED_OUT", null);
          }
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Updates user data for a logged in user.
     */
    async updateUser(attributes, options = {}) {
      await this.initializePromise;
      return await this._acquireLock(-1, async () => {
        return await this._updateUser(attributes, options);
      });
    }
    async _updateUser(attributes, options = {}) {
      try {
        return await this._useSession(async (result) => {
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            throw sessionError;
          }
          if (!sessionData.session) {
            throw new AuthSessionMissingError();
          }
          const session = sessionData.session;
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce" && attributes.email != null) {
            ;
            [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
          }
          const { data: data2, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
            headers: this.headers,
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
            body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
            jwt: session.access_token,
            xform: _userResponse
          });
          if (userError)
            throw userError;
          session.user = data2.user;
          await this._saveSession(session);
          await this._notifyAllSubscribers("USER_UPDATED", session);
          return { data: { user: session.user }, error: null };
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Decodes a JWT (without performing any validation).
     */
    _decodeJWT(jwt) {
      return decodeJWTPayload(jwt);
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */
    async setSession(currentSession) {
      await this.initializePromise;
      return await this._acquireLock(-1, async () => {
        return await this._setSession(currentSession);
      });
    }
    async _setSession(currentSession) {
      try {
        if (!currentSession.access_token || !currentSession.refresh_token) {
          throw new AuthSessionMissingError();
        }
        const timeNow = Date.now() / 1e3;
        let expiresAt2 = timeNow;
        let hasExpired = true;
        let session = null;
        const payload = decodeJWTPayload(currentSession.access_token);
        if (payload.exp) {
          expiresAt2 = payload.exp;
          hasExpired = expiresAt2 <= timeNow;
        }
        if (hasExpired) {
          const { session: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            return { data: { user: null, session: null }, error };
          }
          if (!refreshedSession) {
            return { data: { user: null, session: null }, error: null };
          }
          session = refreshedSession;
        } else {
          const { data: data2, error } = await this._getUser(currentSession.access_token);
          if (error) {
            throw error;
          }
          session = {
            access_token: currentSession.access_token,
            refresh_token: currentSession.refresh_token,
            user: data2.user,
            token_type: "bearer",
            expires_in: expiresAt2 - timeNow,
            expires_at: expiresAt2
          };
          await this._saveSession(session);
          await this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user: session.user, session }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { session: null, user: null }, error };
        }
        throw error;
      }
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */
    async refreshSession(currentSession) {
      await this.initializePromise;
      return await this._acquireLock(-1, async () => {
        return await this._refreshSession(currentSession);
      });
    }
    async _refreshSession(currentSession) {
      try {
        return await this._useSession(async (result) => {
          var _a;
          if (!currentSession) {
            const { data: data2, error: error2 } = result;
            if (error2) {
              throw error2;
            }
            currentSession = (_a = data2.session) !== null && _a !== void 0 ? _a : void 0;
          }
          if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
            throw new AuthSessionMissingError();
          }
          const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            return { data: { user: null, session: null }, error };
          }
          if (!session) {
            return { data: { user: null, session: null }, error: null };
          }
          return { data: { user: session.user, session }, error: null };
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    }
    /**
     * Gets the session data from a URL string
     */
    async _getSessionFromURL(isPKCEFlow) {
      try {
        if (!isBrowser())
          throw new AuthImplicitGrantRedirectError("No browser detected.");
        if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) {
          throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
        } else if (this.flowType == "pkce" && !isPKCEFlow) {
          throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
        }
        const params = parseParametersFromURL(window.location.href);
        if (isPKCEFlow) {
          if (!params.code)
            throw new AuthPKCEGrantCodeExchangeError("No code detected.");
          const { data: data3, error: error2 } = await this._exchangeCodeForSession(params.code);
          if (error2)
            throw error2;
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          window.history.replaceState(window.history.state, "", url.toString());
          return { data: { session: data3.session, redirectType: null }, error: null };
        }
        if (params.error || params.error_description || params.error_code) {
          throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
            error: params.error || "unspecified_error",
            code: params.error_code || "unspecified_code"
          });
        }
        const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
        if (!access_token || !expires_in || !refresh_token || !token_type) {
          throw new AuthImplicitGrantRedirectError("No session defined in URL");
        }
        const timeNow = Math.round(Date.now() / 1e3);
        const expiresIn = parseInt(expires_in);
        let expiresAt2 = timeNow + expiresIn;
        if (expires_at) {
          expiresAt2 = parseInt(expires_at);
        }
        const actuallyExpiresIn = expiresAt2 - timeNow;
        if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION) {
          console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
        }
        const issuedAt = expiresAt2 - expiresIn;
        if (timeNow - issuedAt >= 120) {
          console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
        } else if (timeNow - issuedAt < 0) {
          console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", issuedAt, expiresAt2, timeNow);
        }
        const { data: data2, error } = await this._getUser(access_token);
        if (error)
          throw error;
        const session = {
          provider_token,
          provider_refresh_token,
          access_token,
          expires_in: expiresIn,
          expires_at: expiresAt2,
          refresh_token,
          token_type,
          user: data2.user
        };
        window.location.hash = "";
        this._debug("#_getSessionFromURL()", "clearing window.location.hash");
        return { data: { session, redirectType: params.type }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { session: null, redirectType: null }, error };
        }
        throw error;
      }
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */
    _isImplicitGrantFlow() {
      const params = parseParametersFromURL(window.location.href);
      return !!(isBrowser() && (params.access_token || params.error_description));
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */
    async _isPKCEFlow() {
      const params = parseParametersFromURL(window.location.href);
      const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
      return !!(params.code && currentStorageContent);
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     *
     * If using `others` scope, no `SIGNED_OUT` event is fired!
     */
    async signOut(options = { scope: "global" }) {
      await this.initializePromise;
      return await this._acquireLock(-1, async () => {
        return await this._signOut(options);
      });
    }
    async _signOut({ scope } = { scope: "global" }) {
      return await this._useSession(async (result) => {
        var _a;
        const { data: data2, error: sessionError } = result;
        if (sessionError) {
          return { error: sessionError };
        }
        const accessToken = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token;
        if (accessToken) {
          const { error } = await this.admin.signOut(accessToken, scope);
          if (error) {
            if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401 || error.status === 403))) {
              return { error };
            }
          }
        }
        if (scope !== "others") {
          await this._removeSession();
          await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
          await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        return { error: null };
      });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */
    onAuthStateChange(callback) {
      const id = uuid();
      const subscription = {
        id,
        callback,
        unsubscribe: () => {
          this._debug("#unsubscribe()", "state change callback with id removed", id);
          this.stateChangeEmitters.delete(id);
        }
      };
      this._debug("#onAuthStateChange()", "registered callback with id", id);
      this.stateChangeEmitters.set(id, subscription);
      (async () => {
        await this.initializePromise;
        await this._acquireLock(-1, async () => {
          this._emitInitialSession(id);
        });
      })();
      return { data: { subscription } };
    }
    async _emitInitialSession(id) {
      return await this._useSession(async (result) => {
        var _a, _b;
        try {
          const { data: { session }, error } = result;
          if (error)
            throw error;
          await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
          this._debug("INITIAL_SESSION", "callback id", id, "session", session);
        } catch (err) {
          await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
          this._debug("INITIAL_SESSION", "callback id", id, "error", err);
          console.error(err);
        }
      });
    }
    /**
     * Sends a password reset request to an email address. This method supports the PKCE flow.
     *
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */
    async resetPasswordForEmail(email, options = {}) {
      let codeChallenge = null;
      let codeChallengeMethod = null;
      if (this.flowType === "pkce") {
        ;
        [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
          this.storage,
          this.storageKey,
          true
          // isPasswordRecovery
        );
      }
      try {
        return await _request(this.fetch, "POST", `${this.url}/recover`, {
          body: {
            email,
            code_challenge: codeChallenge,
            code_challenge_method: codeChallengeMethod,
            gotrue_meta_security: { captcha_token: options.captchaToken }
          },
          headers: this.headers,
          redirectTo: options.redirectTo
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * Gets all the identities linked to a user.
     */
    async getUserIdentities() {
      var _a;
      try {
        const { data: data2, error } = await this.getUser();
        if (error)
          throw error;
        return { data: { identities: (_a = data2.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * Links an oauth identity to an existing user.
     * This method supports the PKCE flow.
     */
    async linkIdentity(credentials) {
      var _a;
      try {
        const { data: data2, error } = await this._useSession(async (result) => {
          var _a2, _b, _c, _d, _e;
          const { data: data3, error: error2 } = result;
          if (error2)
            throw error2;
          const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
            redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
            scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
            queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
            skipBrowserRedirect: true
          });
          return await _request(this.fetch, "GET", url, {
            headers: this.headers,
            jwt: (_e = (_d = data3.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
          });
        });
        if (error)
          throw error;
        if (isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
          window.location.assign(data2 === null || data2 === void 0 ? void 0 : data2.url);
        }
        return { data: { provider: credentials.provider, url: data2 === null || data2 === void 0 ? void 0 : data2.url }, error: null };
      } catch (error) {
        if (isAuthError(error)) {
          return { data: { provider: credentials.provider, url: null }, error };
        }
        throw error;
      }
    }
    /**
     * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
     */
    async unlinkIdentity(identity) {
      try {
        return await this._useSession(async (result) => {
          var _a, _b;
          const { data: data2, error } = result;
          if (error) {
            throw error;
          }
          return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
            headers: this.headers,
            jwt: (_b = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
          });
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    async _refreshAccessToken(refreshToken) {
      const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
      this._debug(debugName, "begin");
      try {
        const startedAt = Date.now();
        return await retryable(async (attempt) => {
          if (attempt > 0) {
            await sleep(200 * Math.pow(2, attempt - 1));
          }
          this._debug(debugName, "refreshing attempt", attempt);
          return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
            body: { refresh_token: refreshToken },
            headers: this.headers,
            xform: _sessionResponse
          });
        }, (attempt, error) => {
          const nextBackOffInterval = 200 * Math.pow(2, attempt);
          return error && isAuthRetryableFetchError(error) && // retryable only if the request can be sent before the backoff overflows the tick duration
          Date.now() + nextBackOffInterval - startedAt < AUTO_REFRESH_TICK_DURATION;
        });
      } catch (error) {
        this._debug(debugName, "error", error);
        if (isAuthError(error)) {
          return { data: { session: null, user: null }, error };
        }
        throw error;
      } finally {
        this._debug(debugName, "end");
      }
    }
    _isValidSession(maybeSession) {
      const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
      return isValidSession;
    }
    async _handleProviderSignIn(provider, options) {
      const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
        redirectTo: options.redirectTo,
        scopes: options.scopes,
        queryParams: options.queryParams
      });
      this._debug("#_handleProviderSignIn()", "provider", provider, "options", options, "url", url);
      if (isBrowser() && !options.skipBrowserRedirect) {
        window.location.assign(url);
      }
      return { data: { provider, url }, error: null };
    }
    /**
     * Recovers the session from LocalStorage and refreshes
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */
    async _recoverAndRefresh() {
      var _a;
      const debugName = "#_recoverAndRefresh()";
      this._debug(debugName, "begin");
      try {
        const currentSession = await getItemAsync(this.storage, this.storageKey);
        this._debug(debugName, "session from storage", currentSession);
        if (!this._isValidSession(currentSession)) {
          this._debug(debugName, "session is not valid");
          if (currentSession !== null) {
            await this._removeSession();
          }
          return;
        }
        const timeNow = Math.round(Date.now() / 1e3);
        const expiresWithMargin = ((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN;
        this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN}s`);
        if (expiresWithMargin) {
          if (this.autoRefreshToken && currentSession.refresh_token) {
            const { error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              console.error(error);
              if (!isAuthRetryableFetchError(error)) {
                this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
                await this._removeSession();
              }
            }
          }
        } else {
          await this._notifyAllSubscribers("SIGNED_IN", currentSession);
        }
      } catch (err) {
        this._debug(debugName, "error", err);
        console.error(err);
        return;
      } finally {
        this._debug(debugName, "end");
      }
    }
    async _callRefreshToken(refreshToken) {
      var _a, _b;
      if (!refreshToken) {
        throw new AuthSessionMissingError();
      }
      if (this.refreshingDeferred) {
        return this.refreshingDeferred.promise;
      }
      const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
      this._debug(debugName, "begin");
      try {
        this.refreshingDeferred = new Deferred();
        const { data: data2, error } = await this._refreshAccessToken(refreshToken);
        if (error)
          throw error;
        if (!data2.session)
          throw new AuthSessionMissingError();
        await this._saveSession(data2.session);
        await this._notifyAllSubscribers("TOKEN_REFRESHED", data2.session);
        const result = { session: data2.session, error: null };
        this.refreshingDeferred.resolve(result);
        return result;
      } catch (error) {
        this._debug(debugName, "error", error);
        if (isAuthError(error)) {
          const result = { session: null, error };
          if (!isAuthRetryableFetchError(error)) {
            await this._removeSession();
            await this._notifyAllSubscribers("SIGNED_OUT", null);
          }
          (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
          return result;
        }
        (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
        throw error;
      } finally {
        this.refreshingDeferred = null;
        this._debug(debugName, "end");
      }
    }
    async _notifyAllSubscribers(event, session, broadcast = true) {
      const debugName = `#_notifyAllSubscribers(${event})`;
      this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
      try {
        if (this.broadcastChannel && broadcast) {
          this.broadcastChannel.postMessage({ event, session });
        }
        const errors = [];
        const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
          try {
            await x.callback(event, session);
          } catch (e) {
            errors.push(e);
          }
        });
        await Promise.all(promises);
        if (errors.length > 0) {
          for (let i = 0; i < errors.length; i += 1) {
            console.error(errors[i]);
          }
          throw errors[0];
        }
      } finally {
        this._debug(debugName, "end");
      }
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */
    async _saveSession(session) {
      this._debug("#_saveSession()", session);
      this.suppressGetSessionWarning = true;
      await setItemAsync(this.storage, this.storageKey, session);
    }
    async _removeSession() {
      this._debug("#_removeSession()");
      await removeItemAsync(this.storage, this.storageKey);
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */
    _removeVisibilityChangedCallback() {
      this._debug("#_removeVisibilityChangedCallback()");
      const callback = this.visibilityChangedCallback;
      this.visibilityChangedCallback = null;
      try {
        if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
          window.removeEventListener("visibilitychange", callback);
        }
      } catch (e) {
        console.error("removing visibilitychange callback failed", e);
      }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */
    async _startAutoRefresh() {
      await this._stopAutoRefresh();
      this._debug("#_startAutoRefresh()");
      const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
      this.autoRefreshTicker = ticker;
      if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
        ticker.unref();
      } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
        Deno.unrefTimer(ticker);
      }
      setTimeout(async () => {
        await this.initializePromise;
        await this._autoRefreshTokenTick();
      }, 0);
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */
    async _stopAutoRefresh() {
      this._debug("#_stopAutoRefresh()");
      const ticker = this.autoRefreshTicker;
      this.autoRefreshTicker = null;
      if (ticker) {
        clearInterval(ticker);
      }
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */
    async startAutoRefresh() {
      this._removeVisibilityChangedCallback();
      await this._startAutoRefresh();
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */
    async stopAutoRefresh() {
      this._removeVisibilityChangedCallback();
      await this._stopAutoRefresh();
    }
    /**
     * Runs the auto refresh token tick.
     */
    async _autoRefreshTokenTick() {
      this._debug("#_autoRefreshTokenTick()", "begin");
      try {
        await this._acquireLock(0, async () => {
          try {
            const now = Date.now();
            try {
              return await this._useSession(async (result) => {
                const { data: { session } } = result;
                if (!session || !session.refresh_token || !session.expires_at) {
                  this._debug("#_autoRefreshTokenTick()", "no session");
                  return;
                }
                const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                  await this._callRefreshToken(session.refresh_token);
                }
              });
            } catch (e) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        });
      } catch (e) {
        if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
          this._debug("auto refresh token tick lock not available");
        } else {
          throw e;
        }
      }
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */
    async _handleVisibilityChange() {
      this._debug("#_handleVisibilityChange()");
      if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
        if (this.autoRefreshToken) {
          this.startAutoRefresh();
        }
        return false;
      }
      try {
        this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
        window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
        await this._onVisibilityChanged(true);
      } catch (error) {
        console.error("_handleVisibilityChange", error);
      }
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */
    async _onVisibilityChanged(calledFromInitialize) {
      const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
      this._debug(methodName, "visibilityState", document.visibilityState);
      if (document.visibilityState === "visible") {
        if (this.autoRefreshToken) {
          this._startAutoRefresh();
        }
        if (!calledFromInitialize) {
          await this.initializePromise;
          await this._acquireLock(-1, async () => {
            if (document.visibilityState !== "visible") {
              this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
              return;
            }
            await this._recoverAndRefresh();
          });
        }
      } else if (document.visibilityState === "hidden") {
        if (this.autoRefreshToken) {
          this._stopAutoRefresh();
        }
      }
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */
    async _getUrlForProvider(url, provider, options) {
      const urlParams = [`provider=${encodeURIComponent(provider)}`];
      if (options === null || options === void 0 ? void 0 : options.redirectTo) {
        urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
      }
      if (options === null || options === void 0 ? void 0 : options.scopes) {
        urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
      }
      if (this.flowType === "pkce") {
        const [codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(this.storage, this.storageKey);
        const flowParams = new URLSearchParams({
          code_challenge: `${encodeURIComponent(codeChallenge)}`,
          code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
        });
        urlParams.push(flowParams.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.queryParams) {
        const query = new URLSearchParams(options.queryParams);
        urlParams.push(query.toString());
      }
      if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
        urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
      }
      return `${url}?${urlParams.join("&")}`;
    }
    async _unenroll(params) {
      try {
        return await this._useSession(async (result) => {
          var _a;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * {@see GoTrueMFAApi#enroll}
     */
    async _enroll(params) {
      try {
        return await this._useSession(async (result) => {
          var _a, _b;
          const { data: sessionData, error: sessionError } = result;
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, params.factorType === "phone" ? { phone: params.phone } : { issuer: params.issuer });
          const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
            body,
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
          if (error) {
            return { data: null, error };
          }
          if (params.factorType === "phone") {
            delete data2.totp;
          }
          if (params.factorType === "totp" && ((_b = data2 === null || data2 === void 0 ? void 0 : data2.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
            data2.totp.qr_code = `data:image/svg+xml;utf-8,${data2.totp.qr_code}`;
          }
          return { data: data2, error: null };
        });
      } catch (error) {
        if (isAuthError(error)) {
          return { data: null, error };
        }
        throw error;
      }
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */
    async _verify(params) {
      return this._acquireLock(-1, async () => {
        try {
          return await this._useSession(async (result) => {
            var _a;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
              body: { code: params.code, challenge_id: params.challengeId },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
            if (error) {
              return { data: null, error };
            }
            await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data2.expires_in }, data2));
            await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data2);
            return { data: data2, error };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */
    async _challenge(params) {
      return this._acquireLock(-1, async () => {
        try {
          return await this._useSession(async (result) => {
            var _a;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
              body: { channel: params.channel },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */
    async _challengeAndVerify(params) {
      const { data: challengeData, error: challengeError } = await this._challenge({
        factorId: params.factorId
      });
      if (challengeError) {
        return { data: null, error: challengeError };
      }
      return await this._verify({
        factorId: params.factorId,
        challengeId: challengeData.id,
        code: params.code
      });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */
    async _listFactors() {
      const { data: { user }, error: userError } = await this.getUser();
      if (userError) {
        return { data: null, error: userError };
      }
      const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
      const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
      const phone = factors.filter((factor) => factor.factor_type === "phone" && factor.status === "verified");
      return {
        data: {
          all: factors,
          totp,
          phone
        },
        error: null
      };
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */
    async _getAuthenticatorAssuranceLevel() {
      return this._acquireLock(-1, async () => {
        return await this._useSession(async (result) => {
          var _a, _b;
          const { data: { session }, error: sessionError } = result;
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          if (!session) {
            return {
              data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
              error: null
            };
          }
          const payload = this._decodeJWT(session.access_token);
          let currentLevel = null;
          if (payload.aal) {
            currentLevel = payload.aal;
          }
          let nextLevel = currentLevel;
          const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
          if (verifiedFactors.length > 0) {
            nextLevel = "aal2";
          }
          const currentAuthenticationMethods = payload.amr || [];
          return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
        });
      });
    }
  };
  GoTrueClient.nextInstanceID = 0;

  // node_modules/@supabase/auth-js/dist/module/AuthClient.js
  var AuthClient = GoTrueClient;
  var AuthClient_default = AuthClient;

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
  var SupabaseAuthClient = class extends AuthClient_default {
    constructor(options) {
      super(options);
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
  var __awaiter8 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SupabaseClient = class {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */
    constructor(supabaseUrl, supabaseKey, options) {
      var _a, _b, _c;
      this.supabaseUrl = supabaseUrl;
      this.supabaseKey = supabaseKey;
      if (!supabaseUrl)
        throw new Error("supabaseUrl is required.");
      if (!supabaseKey)
        throw new Error("supabaseKey is required.");
      const _supabaseUrl = stripTrailingSlash(supabaseUrl);
      this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
      this.authUrl = `${_supabaseUrl}/auth/v1`;
      this.storageUrl = `${_supabaseUrl}/storage/v1`;
      this.functionsUrl = `${_supabaseUrl}/functions/v1`;
      const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
      const DEFAULTS = {
        db: DEFAULT_DB_OPTIONS,
        realtime: DEFAULT_REALTIME_OPTIONS,
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
        global: DEFAULT_GLOBAL_OPTIONS
      };
      const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
      this.storageKey = (_a = settings.auth.storageKey) !== null && _a !== void 0 ? _a : "";
      this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
      if (!settings.accessToken) {
        this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
      } else {
        this.accessToken = settings.accessToken;
        this.auth = new Proxy({}, {
          get: (_, prop) => {
            throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
          }
        });
      }
      this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
      this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
      this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
        headers: this.headers,
        schema: settings.db.schema,
        fetch: this.fetch
      });
      if (!settings.accessToken) {
        this._listenForAuthEvents();
      }
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions() {
      return new FunctionsClient(this.functionsUrl, {
        headers: this.headers,
        customFetch: this.fetch
      });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage() {
      return new StorageClient(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
      return this.rest.from(relation);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.schema
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(schema) {
      return this.rest.schema(schema);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.rpc
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, options = {}) {
      return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */
    channel(name, opts = { config: {} }) {
      return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */
    getChannels() {
      return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */
    removeChannel(channel2) {
      return this.realtime.removeChannel(channel2);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */
    removeAllChannels() {
      return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
      var _a, _b;
      return __awaiter8(this, void 0, void 0, function* () {
        if (this.accessToken) {
          return yield this.accessToken();
        }
        const { data: data2 } = yield this.auth.getSession();
        return (_b = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
      });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType, lock, debug }, headers, fetch3) {
      var _a;
      const authHeaders = {
        Authorization: `Bearer ${this.supabaseKey}`,
        apikey: `${this.supabaseKey}`
      };
      return new SupabaseAuthClient({
        url: this.authUrl,
        headers: Object.assign(Object.assign({}, authHeaders), headers),
        storageKey,
        autoRefreshToken,
        persistSession,
        detectSessionInUrl,
        storage,
        flowType,
        lock,
        debug,
        fetch: fetch3,
        // auth checks if there is a custom authorizaiton header using this flag
        // so it knows whether to return an error when getUser is called with no session
        hasCustomAuthorizationHeader: (_a = "Authorization" in this.headers) !== null && _a !== void 0 ? _a : false
      });
    }
    _initRealtimeClient(options) {
      return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
    }
    _listenForAuthEvents() {
      let data2 = this.auth.onAuthStateChange((event, session) => {
        this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
      });
      return data2;
    }
    _handleTokenChanged(event, source, token) {
      if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
        this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
        this.changedAccessToken = token;
      } else if (event === "SIGNED_OUT") {
        this.realtime.setAuth(this.supabaseKey);
        if (source == "STORAGE")
          this.auth.signOut();
        this.changedAccessToken = void 0;
      }
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/index.js
  var createClient = (supabaseUrl, supabaseKey, options) => {
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
  };

  // app/supabase.js
  var supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });

  // app/presence.js
  var PING_MS = 60 * 1e3;
  var timer = null;
  async function ping() {
    var _a;
    const id = (_a = state.user) == null ? void 0 : _a.id;
    if (!id) return;
    if (typeof document !== "undefined" && document.hidden) return;
    try {
      await supabase.from("user_profiles").update({ last_seen: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", id);
    } catch (e) {
    }
  }
  function startPresence() {
    if (timer) return;
    ping();
    timer = setInterval(ping, PING_MS);
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) ping();
      });
    }
  }

  // app/api/auth.js
  async function refreshUser() {
    if (!state.user) return null;
    const { data: data2 } = await supabase.rpc("get_own_user", { p_user_id: state.user.id });
    const row = Array.isArray(data2) ? data2[0] : data2;
    if (row) {
      Object.assign(state.user, row);
      saveSession(state.user);
    }
    return state.user;
  }
  async function login(phoneInput, password) {
    const phone = cleanPhone(phoneInput);
    const { data: data2, error } = await supabase.rpc("verify_user_password", {
      p_phone: phone,
      p_password: password
    });
    if (error) throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.");
    if (!data2 || data2.length === 0) throw new Error("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
    const user = data2[0];
    saveSession(user);
    try {
      await refreshUser();
    } catch (e) {
    }
    return state.user;
  }
  async function register({ name, phone, email, password }) {
    const cleaned = cleanPhone(phone);
    const { data: exists } = await supabase.rpc("phone_exists", { p_phone: cleaned });
    if (exists === true) throw new Error("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
    const { data: data2, error } = await supabase.rpc("register_user", {
      p_phone: cleaned,
      p_email: String(email).toLowerCase(),
      p_password: password
    });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442");
    const user = Array.isArray(data2) ? data2[0] : data2;
    if (!user) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442");
    user.name = name;
    await supabase.from("user_profiles").upsert({ user_id: user.id, name }, { onConflict: "user_id" }).then(() => {
    }, () => {
    });
    saveSession(user);
    return user;
  }
  async function changePassword(oldPassword, newPassword) {
    const user = state.user;
    if (!user) throw new Error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0432\u0445\u043E\u0434");
    const { data: data2, error } = await supabase.rpc("change_user_password", {
      p_user_id: user.id,
      p_old: oldPassword,
      p_new: newPassword
    });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C");
    const r = Array.isArray(data2) ? data2[0] : data2;
    if (!r || r.success === false) throw new Error((r == null ? void 0 : r.message) || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C");
    return r;
  }
  async function changeEmail(email) {
    const user = state.user;
    if (!user) throw new Error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0432\u0445\u043E\u0434");
    const { data: data2, error } = await supabase.rpc("change_user_email", {
      p_user_id: user.id,
      p_email: email
    });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C e-mail");
    const r = Array.isArray(data2) ? data2[0] : data2;
    if (!r || r.success === false) throw new Error((r == null ? void 0 : r.message) || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C e-mail");
    user.email = String(email).trim().toLowerCase();
    saveSession(user);
    return r;
  }

  // app/ui.js
  var toastsEl = null;
  function ensureContainer() {
    if (!toastsEl) {
      toastsEl = document.createElement("div");
      toastsEl.className = "ar-toasts";
      document.getElementById("app").appendChild(toastsEl);
    }
    return toastsEl;
  }
  function staggerIn(container, { step = 0.04, max = 12, start: start2 = 0 } = {}) {
    if (!container) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kids = Array.from(container.children);
    kids.forEach((el, i) => {
      if (i < start2) return;
      const idx = Math.min(i - start2, max);
      el.style.setProperty("--d", idx * step + "s");
      el.classList.add("ar-rise");
      el.addEventListener("animationend", () => el.classList.remove("ar-rise"), { once: true });
    });
  }
  function fadeImg(img) {
    if (!img) return;
    img.classList.add("ar-fade-img");
    if (img.complete && img.naturalWidth) {
      img.classList.add("is-loaded");
      return;
    }
    img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });
  }
  function countTo(el, to, { dur = 380, format = (v) => String(Math.round(v)) } = {}) {
    var _a;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = (_a = el._cuVal) != null ? _a : 0;
    if (reduce || from === to) {
      el._cuVal = to;
      el.textContent = format(to);
      return;
    }
    if (el._cuRAF) cancelAnimationFrame(el._cuRAF);
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = format(from + (to - from) * ease(p));
      if (p < 1) {
        el._cuRAF = requestAnimationFrame(tick);
      } else {
        el._cuVal = to;
        el.textContent = format(to);
        el._cuRAF = null;
      }
    };
    el._cuVal = to;
    el._cuRAF = requestAnimationFrame(tick);
  }
  function bump(el) {
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.remove("ar-bump");
    void el.offsetWidth;
    el.classList.add("ar-bump");
    el.addEventListener("animationend", () => el.classList.remove("ar-bump"), { once: true });
  }
  function countdown(el, deadlineMs, { onZero, prefix = "" } = {}) {
    if (!el) return () => {
    };
    let stopped = false, iv = null;
    const fmt = (ms) => {
      if (ms <= 0) return "00:00";
      const s = Math.floor(ms / 1e3);
      const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
      const mm = String(m).padStart(2, "0"), s2 = String(ss).padStart(2, "0");
      return (h > 0 ? h + ":" + mm : mm) + ":" + s2;
    };
    const tick = () => {
      if (stopped) return;
      const left = deadlineMs - Date.now();
      el.textContent = prefix + fmt(left);
      if (left <= 0) {
        stopped = true;
        clearInterval(iv);
        if (onZero) onZero();
      }
    };
    tick();
    iv = setInterval(tick, 1e3);
    return () => {
      stopped = true;
      clearInterval(iv);
    };
  }
  function toast(message, kind = "ok") {
    const el = document.createElement("div");
    el.className = "ar-toast " + kind;
    const icon = kind === "err" ? "fa-circle-exclamation" : "fa-circle-check";
    el.innerHTML = `<i class="fa-solid ${icon}"></i><span></span>`;
    el.querySelector("span").textContent = message;
    ensureContainer().appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = "all .25s";
      setTimeout(() => el.remove(), 260);
    }, 2600);
  }
  function openImageViewer(src, gallery = null, startIndex = 0) {
    var _a, _b;
    if (!src) return;
    const imgs = Array.isArray(gallery) && gallery.length ? gallery : [src];
    let idx = Math.max(0, startIndex);
    const ov = document.createElement("div");
    ov.className = "ar-imgviewer";
    ov.innerHTML = `
    <button class="ar-iv-close" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"><i class="fa-solid fa-xmark"></i></button>
    ${imgs.length > 1 ? `<button class="ar-iv-nav prev" aria-label="\u041D\u0430\u0437\u0430\u0434"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="ar-iv-nav next" aria-label="\u0412\u043F\u0435\u0440\u0451\u0434"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="ar-iv-counter"></div>` : ""}
    <img class="ar-iv-img" alt="" draggable="false">`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("show"));
    const img = ov.querySelector(".ar-iv-img");
    const counter = ov.querySelector(".ar-iv-counter");
    let scale = 1, tx = 0, ty = 0;
    const apply = (animate) => {
      img.style.transition = animate ? "transform .22s cubic-bezier(.22,1,.36,1)" : "none";
      img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    };
    const clamp = () => {
      scale = Math.min(Math.max(scale, 1), 6);
      if (scale === 1) {
        tx = 0;
        ty = 0;
      }
    };
    const show = (animateImg) => {
      img.src = imgs[idx];
      scale = 1;
      tx = 0;
      ty = 0;
      apply(false);
      if (counter) counter.textContent = `${idx + 1} / ${imgs.length}`;
      if (animateImg) {
        img.classList.remove("pop");
        void img.offsetWidth;
        img.classList.add("pop");
      }
    };
    show(true);
    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      ov.classList.remove("show");
      setTimeout(() => ov.remove(), 220);
    };
    const go2 = (d) => {
      const n = idx + d;
      if (n < 0 || n >= imgs.length) return;
      idx = n;
      show(true);
    };
    ov.querySelector(".ar-iv-close").addEventListener("click", close);
    (_a = ov.querySelector(".ar-iv-nav.prev")) == null ? void 0 : _a.addEventListener("click", (e) => {
      e.stopPropagation();
      go2(-1);
    });
    (_b = ov.querySelector(".ar-iv-nav.next")) == null ? void 0 : _b.addEventListener("click", (e) => {
      e.stopPropagation();
      go2(1);
    });
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    ov.addEventListener("wheel", (e) => {
      e.preventDefault();
      const prev = scale;
      scale *= e.deltaY < 0 ? 1.25 : 1 / 1.25;
      clamp();
      if (scale !== prev) apply(true);
    }, { passive: false });
    let lastTap = 0;
    img.addEventListener("click", (e) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        scale = scale > 1 ? 1 : 2.5;
        clamp();
        apply(true);
      }
      lastTap = now;
      e.stopPropagation();
    });
    let dragging = false, sx = 0, sy = 0, stx = 0, sty = 0, swipeMode = null;
    const start2 = (x, y) => {
      dragging = true;
      sx = x;
      sy = y;
      stx = tx;
      sty = ty;
      swipeMode = null;
      img.style.transition = "none";
      ov.style.transition = "none";
    };
    const move = (x, y) => {
      if (!dragging) return;
      const dx = x - sx, dy = y - sy;
      if (scale > 1) {
        tx = stx + dx;
        ty = sty + dy;
        apply(false);
        return;
      }
      if (!swipeMode && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) swipeMode = Math.abs(dy) > Math.abs(dx) ? "v" : "h";
      if (swipeMode === "v" && dy > 0) {
        img.style.transform = `translateY(${dy}px) scale(${Math.max(1 - dy / 1e3, 0.85)})`;
        ov.style.background = `rgba(0,0,0,${Math.max(0.92 - dy / 500, 0.3)})`;
      }
    };
    const end = (x, y) => {
      if (!dragging) return;
      dragging = false;
      const dx = x - sx, dy = y - sy;
      if (scale <= 1 && swipeMode === "v" && dy > 110) {
        close();
        return;
      }
      if (scale <= 1 && swipeMode === "h" && Math.abs(dx) > 60) {
        go2(dx < 0 ? 1 : -1);
      }
      img.style.transition = "transform .22s cubic-bezier(.22,1,.36,1)";
      ov.style.transition = "background .22s ease";
      ov.style.background = "";
      apply(false);
    };
    const onMove = (e) => move(e.clientX, e.clientY);
    const onUp = (e) => end(e.clientX, e.clientY);
    img.addEventListener("pointerdown", (e) => {
      start2(e.clientX, e.clientY);
    });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    let pinchDist = 0, pinchScale = 1;
    ov.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        pinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        pinchScale = scale;
      }
    }, { passive: true });
    ov.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && pinchDist) {
        e.preventDefault();
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        scale = pinchScale * (d / pinchDist);
        clamp();
        apply(false);
      }
    }, { passive: false });
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go2(-1);
      else if (e.key === "ArrowRight") go2(1);
      if (!document.body.contains(ov)) document.removeEventListener("keydown", onKey);
    });
  }
  var _imgViewerReady = false;
  function initImageViewer() {
    if (_imgViewerReady) return;
    _imgViewerReady = true;
    document.addEventListener("click", (e) => {
      const img = e.target.closest("img[data-imgview]");
      if (!img || !img.src) return;
      const album = img.closest(".ar-album");
      if (album) {
        const cells = [...album.querySelectorAll("img[data-imgview]")];
        const srcs = cells.map((c) => c.src);
        openImageViewer(img.src, srcs, cells.indexOf(img));
      } else {
        openImageViewer(img.src);
      }
    });
  }
  function openSendPhotos(images, onSend) {
    let list = [...images];
    let caption = "";
    const ov = document.createElement("div");
    ov.className = "ar-photocomposer";
    document.body.appendChild(ov);
    const close = () => ov.remove();
    const render4 = () => {
      ov.innerHTML = `
      <div class="ar-pc-sheet">
        <div class="ar-pc-head">
          <button class="ar-pc-cancel" type="button">\u041E\u0442\u043C\u0435\u043D\u0430</button>
          <div class="ar-pc-title">${list.length} \u0444\u043E\u0442\u043E</div>
          <span style="width:64px;"></span>
        </div>
        <div class="ar-pc-grid">
          ${list.map((src, i) => `
            <div class="ar-pc-item">
              <img src="${src}" alt="">
              <button class="ar-pc-del" type="button" data-i="${i}" aria-label="\u0423\u0434\u0430\u043B\u0438\u0442\u044C"><i class="fa-solid fa-xmark"></i></button>
            </div>`).join("")}
        </div>
        <div class="ar-pc-bottom">
          <div class="ar-field" style="flex:1;height:46px;"><input id="pcCaption" type="text" placeholder="\u041F\u043E\u0434\u043F\u0438\u0441\u044C\u2026"></div>
          <button class="ar-pc-send" type="button" aria-label="\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"><i class="fa-solid fa-arrow-up"></i></button>
        </div>
      </div>`;
      const cap = ov.querySelector("#pcCaption");
      cap.value = caption;
      cap.addEventListener("input", () => {
        caption = cap.value;
      });
      ov.querySelector(".ar-pc-cancel").addEventListener("click", close);
      ov.querySelectorAll(".ar-pc-del").forEach((b) => b.addEventListener("click", () => {
        list.splice(Number(b.dataset.i), 1);
        if (!list.length) {
          close();
          return;
        }
        render4();
      }));
      ov.querySelector(".ar-pc-send").addEventListener("click", () => {
        const imgs = list, c = caption.trim();
        close();
        onSend(imgs, c);
      });
    };
    render4();
  }
  function pickFiles({ accept = "image/*", multiple = false } = {}) {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      if (multiple) input.multiple = true;
      input.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
      let done = false;
      const finish = (files) => {
        if (done) return;
        done = true;
        setTimeout(() => input.remove(), 0);
        resolve(files);
      };
      input.addEventListener("change", () => finish([...input.files || []]));
      input.addEventListener("cancel", () => finish([]));
      document.body.appendChild(input);
      input.click();
    });
  }

  // app/modal.js
  var host = null;
  function ensure() {
    if (!host) {
      host = document.createElement("div");
      host.className = "ar-modal-host";
      host.style.display = "none";
      document.getElementById("app").appendChild(host);
    }
    return host;
  }
  function openModal({ title, bodyHTML, onMount, actions = [] }) {
    const h = ensure();
    const btns = actions.map((a, i) => `<button class="ar-btn ${a.primary ? "" : "ar-ghost"}" data-act="${i}">${a.label}</button>`).join("");
    h.innerHTML = `
    <div class="ar-modal-backdrop"></div>
    <div class="ar-modal-sheet">
      <div class="ar-modal-grab"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div class="ar-h2">${title}</div>
        <div class="ar-iconbtn" data-close><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div id="arModalBody">${bodyHTML}</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px;">${btns}</div>
    </div>`;
    h.style.display = "block";
    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;
      h.classList.add("is-closing");
      setTimeout(() => {
        h.classList.remove("is-closing");
        h.style.display = "none";
        h.innerHTML = "";
      }, 260);
    };
    h.querySelector(".ar-modal-backdrop").addEventListener("click", close);
    h.querySelector("[data-close]").addEventListener("click", close);
    actions.forEach((a, i) => {
      h.querySelector(`[data-act="${i}"]`).addEventListener("click", async () => {
        const keep = a.onClick ? await a.onClick() : false;
        if (!keep) close();
      });
    });
    if (onMount) onMount(h.querySelector("#arModalBody"), close);
    return close;
  }

  // app/screens/auth.js
  function openForgotPassword() {
    openModal({
      title: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:14px;text-align:center;">
        <div style="width:56px;height:56px;border-radius:16px;background:var(--pink-tint);color:var(--pink);display:flex;align-items:center;justify-content:center;font-size:24px;align-self:center;">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div style="font-size:13.5px;font-weight:600;color:var(--ink-2);line-height:1.5;">
          \u0427\u0442\u043E\u0431\u044B \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C, \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043D\u0430\u043C \u2014 \u043F\u043E\u043C\u043E\u0436\u0435\u043C \u0432\u043E\u0439\u0442\u0438 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442.
        </div>
        <a href="tel:+79201120808" class="ar-btn" style="text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="fa-solid fa-phone"></i> +7 920 112-08-08
        </a>
        <div style="font-size:12px;font-weight:600;color:var(--ink-3);line-height:1.6;">
          \u0427\u0430\u0441\u044B \u0440\u0430\u0431\u043E\u0442\u044B:<br>\u041F\u043D\u2013\u041F\u0442 10:00\u201319:00<br>\u0421\u0431\u2013\u0412\u0441 10:00\u201317:00
        </div>
      </div>`,
      actions: []
    });
  }
  function setErr(fieldEl, errEl, msg) {
    if (msg) {
      fieldEl == null ? void 0 : fieldEl.classList.add("ar-field-err");
      if (errEl) {
        errEl.textContent = msg;
        errEl.style.display = "block";
      }
    } else {
      fieldEl == null ? void 0 : fieldEl.classList.remove("ar-field-err");
      if (errEl) {
        errEl.textContent = "";
        errEl.style.display = "none";
      }
    }
  }
  function bindPasswordEyes(root) {
    root.querySelectorAll(".ar-eye").forEach((eye) => {
      eye.addEventListener("click", () => {
        const input = eye.parentElement.querySelector("input");
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        eye.classList.toggle("fa-eye", !show);
        eye.classList.toggle("fa-eye-slash", show);
      });
    });
  }
  function initAuth() {
    var _a;
    const loginScreen = document.querySelector('[data-screen="login"]');
    const registerScreen = document.querySelector('[data-screen="register"]');
    bindPasswordEyes(loginScreen);
    bindPasswordEyes(registerScreen);
    (_a = document.getElementById("forgotPassword")) == null ? void 0 : _a.addEventListener("click", openForgotPassword);
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", async () => {
      const phone = document.getElementById("loginPhone");
      const pass = document.getElementById("loginPassword");
      setErr(phone.closest(".ar-field"), document.getElementById("loginPhoneErr"), "");
      setErr(pass.closest(".ar-field"), document.getElementById("loginPassErr"), "");
      if (!phone.value.trim()) return setErr(phone.closest(".ar-field"), document.getElementById("loginPhoneErr"), "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430");
      if (!pass.value) return setErr(pass.closest(".ar-field"), document.getElementById("loginPassErr"), "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C");
      loginBtn.disabled = true;
      loginBtn.textContent = "\u0412\u0445\u043E\u0434\u0438\u043C\u2026";
      try {
        await login(phone.value, pass.value);
        if (isBanned()) {
          go("banned");
        } else if (canUsePlatform()) {
          toast("\u0421 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435\u043C!");
          go("home");
        } else go("pending");
      } catch (e) {
        setErr(pass.closest(".ar-field"), document.getElementById("loginPassErr"), e.message);
      } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "\u0412\u043E\u0439\u0442\u0438";
      }
    });
    const regBtn = document.getElementById("registerBtn");
    regBtn.addEventListener("click", async () => {
      const name = document.getElementById("regName");
      const phone = document.getElementById("regPhone");
      const email = document.getElementById("regEmail");
      const pass = document.getElementById("regPassword");
      const err = document.getElementById("regErr");
      err.style.display = "none";
      if (!name.value.trim()) return showRegErr(err, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F");
      if (!phone.value.trim()) return showRegErr(err, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) return showRegErr(err, "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 e-mail");
      if (!pass.value || pass.value.length < 6) return showRegErr(err, "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u043A\u043E\u0440\u043E\u0447\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
      regBtn.disabled = true;
      regBtn.textContent = "\u0421\u043E\u0437\u0434\u0430\u0451\u043C\u2026";
      try {
        await register({ name: name.value.trim(), phone: phone.value, email: email.value, password: pass.value });
        toast("\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0441\u043E\u0437\u0434\u0430\u043D");
        go("pending");
      } catch (e) {
        showRegErr(err, e.message);
      } finally {
        regBtn.disabled = false;
        regBtn.textContent = "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442";
      }
    });
  }
  function showRegErr(el, msg) {
    el.textContent = msg;
    el.style.display = "block";
  }

  // app/screens/home.js
  var SERVICE_RADIUS_M = SERVICE_RADIUS_KM * 1e3;
  var OUT_OF_ZONE_MSG = `\u041C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0437\u043E\u043D\u0435 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u2014 \u042F\u0440\u043E\u0441\u043B\u0430\u0432\u043B\u044C \u0438 ${SERVICE_RADIUS_KM} \u043A\u043C \u0432\u043E\u043A\u0440\u0443\u0433`;
  var map = null;
  var placemark = null;
  var geoMark = null;
  var selected = null;
  var markerDragging = false;
  var sheetCover = 280;
  var located = false;
  var LS_GEO = "almanirent_last_geo";
  var collapseSheet = () => {
  };
  var expandSheet = () => {
  };
  function getSelectedAddress() {
    return selected;
  }
  var toRad = (d) => d * Math.PI / 180;
  var toDeg = (r) => r * 180 / Math.PI;
  function distanceM(a, b) {
    const R = 6371e3;
    const dLat = toRad(b[0] - a[0]);
    const dLng = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function inServiceZone(coords) {
    return distanceM(YAROSLAVL_CENTER, coords) <= SERVICE_RADIUS_M;
  }
  function destPoint(center, bearingRad, distM) {
    const R = 6371e3;
    const lat1 = toRad(center[0]);
    const lng1 = toRad(center[1]);
    const dr = distM / R;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dr) + Math.cos(lat1) * Math.sin(dr) * Math.cos(bearingRad));
    const lng2 = lng1 + Math.atan2(Math.sin(bearingRad) * Math.sin(dr) * Math.cos(lat1), Math.cos(dr) - Math.sin(lat1) * Math.sin(lat2));
    return [toDeg(lat2), toDeg(lng2)];
  }
  function bearing(a, b) {
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const dLng = toRad(b[1] - a[1]);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return Math.atan2(y, x);
  }
  function clampToZone(coords) {
    if (inServiceZone(coords)) return coords;
    return destPoint(YAROSLAVL_CENTER, bearing(YAROSLAVL_CENTER, coords), SERVICE_RADIUS_M - 300);
  }
  function initMap() {
    if (map || typeof ymaps === "undefined") return;
    ymaps.ready(() => {
      if (map) return;
      map = new ymaps.Map(
        "yamap",
        { center: YAROSLAVL_CENTER, zoom: 12, controls: [] },
        { suppressMapOpenBlock: true, yandexMapDisablePoiInteractivity: true }
      );
      map.behaviors.disable("dblClickZoom");
      map.events.add("click", (e) => {
        const coords = e.get("coords");
        if (!inServiceZone(coords)) {
          toast(OUT_OF_ZONE_MSG, "err");
          return;
        }
        setMarker(coords);
        reverseGeocode(coords);
        expandSheet();
      });
      locateInitial();
    });
  }
  function locateInitial() {
    if (located) return;
    located = true;
    try {
      const saved = JSON.parse(localStorage.getItem(LS_GEO) || "null");
      if (Array.isArray(saved) && saved.length === 2 && inServiceZone(saved)) {
        setMarker(saved);
        reverseGeocode(saved);
      }
    } catch (e) {
    }
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        try {
          localStorage.setItem(LS_GEO, JSON.stringify(coords));
        } catch (e) {
        }
        setUserGeoMark(coords);
        if (!inServiceZone(coords)) return;
        setMarker(coords);
        reverseGeocode(coords);
      },
      () => {
      },
      // отказ/ошибка — остаёмся на сохранённой позиции или центре города
      { enableHighAccuracy: true, timeout: 8e3, maximumAge: 6e4 }
    );
  }
  function setUserGeoMark(coords) {
    if (typeof ymaps === "undefined" || !map) return;
    if (!geoMark) {
      geoMark = new ymaps.Placemark(
        coords,
        { hintContent: "\u0412\u044B \u0437\u0434\u0435\u0441\u044C", iconCaption: "" },
        { preset: "islands#geolocationIcon", iconColor: "#1f6fff", zIndex: 50 }
      );
      map.geoObjects.add(geoMark);
    } else {
      geoMark.geometry.setCoordinates(coords);
    }
  }
  function setMarker(coords, text) {
    if (typeof ymaps === "undefined" || !map) return;
    if (!placemark) {
      placemark = new ymaps.Placemark(coords, {}, { preset: "islands#redIcon", iconColor: "#ed2e68", draggable: true });
      map.geoObjects.add(placemark);
      placemark.events.add("dragstart", () => {
        markerDragging = true;
        collapseSheet();
      });
      placemark.events.add("dragend", () => {
        markerDragging = false;
        let c = placemark.geometry.getCoordinates();
        if (!inServiceZone(c)) {
          toast(OUT_OF_ZONE_MSG, "err");
          c = clampToZone(c);
          placemark.geometry.setCoordinates(c);
        }
        reverseGeocode(c);
        expandSheet();
        setTimeout(() => centerAboveSheet(c), 60);
      });
    } else {
      placemark.geometry.setCoordinates(coords);
    }
    centerAboveSheet(coords);
    selected = { coords, text: text || (selected ? selected.text : "") };
    if (text) showHint(text);
  }
  function centerAboveSheet(coords) {
    if (!map) return;
    const zoom = Math.max(map.getZoom(), 15);
    try {
      const proj = map.options.get("projection");
      const px = proj.toGlobalPixels(coords, zoom);
      const shifted = proj.fromGlobalPixels([px[0], px[1] + sheetCover / 2], zoom);
      map.setZoom(zoom, { duration: 300 });
      map.panTo([shifted], { duration: 500, timingFunction: "ease-in-out" });
    } catch (e) {
      map.panTo([coords], { duration: 500, timingFunction: "ease-in-out" });
    }
  }
  function showHint(text) {
    const hint = document.getElementById("addrHint");
    if (!hint) return;
    if (text) {
      hint.querySelector("span").textContent = text;
      hint.classList.add("show");
    } else {
      hint.classList.remove("show");
    }
  }
  async function geocode(query) {
    if (typeof ymaps === "undefined" || !map) return null;
    try {
      const res = await ymaps.geocode(query, { results: 1, boundedBy: map.getBounds(), strictBounds: false });
      const obj = res.geoObjects.get(0);
      if (!obj) return null;
      return { coords: obj.geometry.getCoordinates(), text: obj.getAddressLine() };
    } catch (e) {
      return null;
    }
  }
  async function reverseGeocode(coords) {
    const r = await geocode(coords);
    const text = r ? r.text : "";
    selected = { coords, text };
    showHint(text);
    const input = document.getElementById("addrInput");
    if (input && text) input.value = text;
  }
  function bindSearch() {
    const input = document.getElementById("addrInput");
    const clear = document.getElementById("addrClear");
    if (!input) return;
    let timer2 = null;
    input.addEventListener("input", () => {
      clear.style.display = input.value ? "block" : "none";
      clearTimeout(timer2);
      const q = input.value.trim();
      if (q.length < 4) return;
      timer2 = setTimeout(async () => {
        const r = await geocode(q);
        if (r) {
          if (!inServiceZone(r.coords)) {
            toast(OUT_OF_ZONE_MSG, "err");
            return;
          }
          setMarker(r.coords, r.text);
          expandSheet();
        }
      }, 600);
    });
    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        clearTimeout(timer2);
        const r = await geocode(input.value.trim());
        if (r) {
          if (!inServiceZone(r.coords)) {
            toast(OUT_OF_ZONE_MSG, "err");
            input.blur();
            return;
          }
          setMarker(r.coords, r.text);
          expandSheet();
        }
        input.blur();
      }
    });
    clear.addEventListener("click", () => {
      input.value = "";
      clear.style.display = "none";
      showHint("");
    });
  }
  function bindMapButtons() {
    const geo = document.getElementById("geoFab");
    const zin = document.getElementById("zoomIn");
    const zout = document.getElementById("zoomOut");
    zin == null ? void 0 : zin.addEventListener("click", () => map && map.setZoom(map.getZoom() + 1, { duration: 300, smooth: true }));
    zout == null ? void 0 : zout.addEventListener("click", () => map && map.setZoom(map.getZoom() - 1, { duration: 300, smooth: true }));
    if (geo && navigator.geolocation) {
      geo.addEventListener("click", () => {
        geo.classList.add("busy");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            geo.classList.remove("busy");
            const coords = [pos.coords.latitude, pos.coords.longitude];
            try {
              localStorage.setItem(LS_GEO, JSON.stringify(coords));
            } catch (e) {
            }
            setUserGeoMark(coords);
            if (!inServiceZone(coords)) {
              map.panTo([coords], { duration: 500, timingFunction: "ease-in-out" });
              toast(OUT_OF_ZONE_MSG, "err");
              return;
            }
            setMarker(coords);
            reverseGeocode(coords);
            expandSheet();
          },
          () => geo.classList.remove("busy"),
          { enableHighAccuracy: true, timeout: 8e3 }
        );
      });
    }
  }
  function bindSheet() {
    const sheet = document.getElementById("homeSheet");
    const handle = document.getElementById("sheetHandle");
    const nav = document.querySelector('[data-screen="home"] .ar-nav');
    const fabs = document.getElementById("mapFabs");
    if (!sheet || !handle) return;
    const PEEK = 132;
    let navH = 64, sheetH = 360, collapsedY = 220;
    let translate = 0, startY = 0, startT = 0, dragging = false, moved = false;
    let lastMoveY = 0, lastMoveTime = 0, velocity = 0;
    let settleReset = null;
    function measure() {
      navH = nav ? nav.offsetHeight : 64;
      sheet.style.bottom = navH + "px";
      sheetH = sheet.offsetHeight;
      collapsedY = Math.max(0, sheetH - PEEK);
      sheetCover = navH + sheetH;
      if (fabs) fabs.style.bottom = navH + PEEK + 12 + "px";
      apply(Math.min(translate, collapsedY));
    }
    function apply(raw, opts = {}) {
      translate = Math.min(Math.max(raw, 0), collapsedY);
      let visual = translate;
      if (opts.rubber) {
        if (raw < 0) visual = raw * 0.32;
        else if (raw > collapsedY) visual = collapsedY + (raw - collapsedY) * 0.32;
      }
      sheet.style.transform = `translateY(${visual}px)`;
      if (fabs) fabs.style.transform = `translateY(${-(collapsedY - visual)}px)`;
    }
    function settle(target, vel) {
      const dist = Math.abs(target - translate);
      let dur = 0.32;
      if (Math.abs(vel) > 0.5) {
        dur = Math.min(0.38, Math.max(0.16, dist / (Math.abs(vel) * 1e3)));
      }
      const d = dur + "s";
      sheet.style.transitionDuration = d;
      if (fabs) fabs.style.transitionDuration = d;
      apply(target);
      clearTimeout(settleReset);
      settleReset = setTimeout(() => {
        sheet.style.transitionDuration = "";
        if (fabs) fabs.style.transitionDuration = "";
      }, dur * 1e3 + 40);
    }
    const resetDur = () => {
      clearTimeout(settleReset);
      sheet.style.transitionDuration = "";
      if (fabs) fabs.style.transitionDuration = "";
    };
    collapseSheet = () => {
      resetDur();
      measure();
      apply(collapsedY);
    };
    expandSheet = () => {
      resetDur();
      measure();
      apply(0);
    };
    handle.addEventListener("pointerdown", (e) => {
      measure();
      dragging = true;
      moved = false;
      startY = e.clientY;
      startT = translate;
      lastMoveY = e.clientY;
      lastMoveTime = e.timeStamp;
      velocity = 0;
      sheet.classList.add("dragging");
      if (fabs) fabs.classList.add("dragging");
      try {
        handle.setPointerCapture(e.pointerId);
      } catch (e2) {
      }
    });
    handle.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      if (Math.abs(e.clientY - startY) > 3) moved = true;
      const dt = e.timeStamp - lastMoveTime;
      if (dt > 0) velocity = (e.clientY - lastMoveY) / dt;
      lastMoveY = e.clientY;
      lastMoveTime = e.timeStamp;
      apply(startT + (e.clientY - startY), { rubber: true });
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      sheet.classList.remove("dragging");
      if (fabs) fabs.classList.remove("dragging");
      if (!moved) {
        settle(translate > 4 ? 0 : collapsedY, 0);
      } else if (Math.abs(velocity) > 0.5) {
        settle(velocity > 0 ? collapsedY : 0, velocity);
      } else {
        settle(translate > collapsedY / 2 ? collapsedY : 0, 0);
      }
    }
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
    window.addEventListener("resize", measure);
    const raiseAfterMarker = () => {
      if (markerDragging) {
        markerDragging = false;
        expandSheet();
      }
    };
    window.addEventListener("pointerup", raiseAfterMarker);
    window.addEventListener("mouseup", raiseAfterMarker);
    window.addEventListener("touchend", raiseAfterMarker);
    requestAnimationFrame(measure);
    setTimeout(measure, 250);
  }
  function openMapPicker(initial, onConfirm) {
    if (typeof ymaps === "undefined") {
      toast("\u041A\u0430\u0440\u0442\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430", "err");
      return;
    }
    const ov = document.createElement("div");
    ov.className = "ar-mappick";
    ov.innerHTML = `
    <div class="ar-mappick-map"><div id="mpMap"></div></div>
    <button class="ar-mappick-back" id="mpBack" aria-label="\u041D\u0430\u0437\u0430\u0434"><i class="fa-solid fa-arrow-left"></i></button>
    <div class="ar-mappick-sheet">
      <div class="ar-search">
        <i class="fa-solid fa-location-dot" style="color: var(--pink);"></i>
        <input id="mpSearch" type="text" autocomplete="off" placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441\u2026" />
        <i class="fa-solid fa-xmark ar-eye" id="mpClear" style="display:none;"></i>
      </div>
      <div class="ar-addr-hint show" id="mpAddr"><i class="fa-solid fa-location-dot"></i><span>\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u2026</span></div>
      <button class="ar-btn" id="mpConfirm" style="width:100%;margin-top:12px;">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>
    </div>`;
    document.body.appendChild(ov);
    const search = ov.querySelector("#mpSearch");
    const clearBtn = ov.querySelector("#mpClear");
    const addrSpan = ov.querySelector("#mpAddr span");
    const confirmBtn = ov.querySelector("#mpConfirm");
    let curText = (initial == null ? void 0 : initial.text) || "";
    let curCoords = (initial == null ? void 0 : initial.coords) || YAROSLAVL_CENTER;
    let pickMap = null;
    let pin = null;
    const close = () => {
      try {
        if (pickMap) pickMap.destroy();
      } catch (e) {
      }
      ov.remove();
    };
    let revTimer = 0;
    const onPick = (coords, knownText) => {
      if (!inServiceZone(coords)) {
        toast(OUT_OF_ZONE_MSG, "err");
        onPick(clampToZone(coords));
        return;
      }
      curCoords = coords;
      if (!pin) {
        pin = new ymaps.Placemark(coords, {}, { preset: "islands#redIcon", iconColor: "#ed2e68", draggable: true });
        pickMap.geoObjects.add(pin);
        pin.events.add("dragend", () => {
          const c = pin.geometry.getCoordinates();
          pickMap.panTo([clampToZone(c)], { duration: 250 });
          onPick(c);
        });
      } else {
        pin.geometry.setCoordinates(coords);
      }
      confirmBtn.disabled = false;
      ov.classList.remove("out");
      if (typeof knownText === "string") {
        curText = knownText;
        addrSpan.textContent = knownText || "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D";
        if (search) search.value = knownText;
        return;
      }
      addrSpan.textContent = "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u2026";
      clearTimeout(revTimer);
      revTimer = setTimeout(async () => {
        try {
          const res = await ymaps.geocode(coords, { results: 1 });
          const obj = res.geoObjects.get(0);
          curText = obj ? obj.getAddressLine() : "";
        } catch (e) {
          curText = "";
        }
        addrSpan.textContent = curText || "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D";
        if (search) search.value = curText;
      }, 250);
    };
    ymaps.ready(() => {
      pickMap = new ymaps.Map(
        "mpMap",
        { center: curCoords, zoom: 16, controls: [] },
        { suppressMapOpenBlock: true, yandexMapDisablePoiInteractivity: true }
      );
      pickMap.behaviors.disable("dblClickZoom");
      setTimeout(() => {
        try {
          pickMap.container.fitToViewport();
        } catch (e) {
        }
      }, 60);
      let here = null;
      const showHere = (coords) => {
        if (!here) {
          here = new ymaps.Placemark(coords, { hintContent: "\u0412\u044B \u0437\u0434\u0435\u0441\u044C" }, { preset: "islands#geolocationIcon", iconColor: "#1f6fff", zIndex: 50 });
          pickMap.geoObjects.add(here);
        } else here.geometry.setCoordinates(coords);
      };
      try {
        const saved = JSON.parse(localStorage.getItem(LS_GEO) || "null");
        if (Array.isArray(saved) && saved.length === 2) showHere(saved);
      } catch (e) {
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const c = [pos.coords.latitude, pos.coords.longitude];
            try {
              localStorage.setItem(LS_GEO, JSON.stringify(c));
            } catch (e) {
            }
            showHere(c);
          },
          () => {
          },
          { enableHighAccuracy: true, timeout: 8e3, maximumAge: 6e4 }
        );
      }
      pickMap.events.add("click", (e) => {
        const c = e.get("coords");
        pickMap.panTo([c], { duration: 250 });
        onPick(c);
      });
      if (initial == null ? void 0 : initial.coords) onPick(initial.coords, initial.text || void 0);
      else onPick(curCoords);
      let sTimer = 0;
      const doSearch = async () => {
        const q = search.value.trim();
        if (q.length < 4) return;
        try {
          const res = await ymaps.geocode(q, { results: 1, boundedBy: pickMap.getBounds(), strictBounds: false });
          const obj = res.geoObjects.get(0);
          if (obj) {
            const c = obj.geometry.getCoordinates();
            pickMap.setCenter(c, 16, { duration: 400 });
            onPick(c, obj.getAddressLine());
          }
        } catch (e) {
        }
      };
      search.addEventListener("input", () => {
        clearBtn.style.display = search.value ? "block" : "none";
        clearTimeout(sTimer);
        sTimer = setTimeout(doSearch, 600);
      });
      search.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          clearTimeout(sTimer);
          doSearch();
          search.blur();
        }
      });
      clearBtn.addEventListener("click", () => {
        search.value = "";
        clearBtn.style.display = "none";
      });
    });
    ov.querySelector("#mpBack").addEventListener("click", close);
    confirmBtn.addEventListener("click", () => {
      if (!inServiceZone(curCoords)) {
        toast(OUT_OF_ZONE_MSG, "err");
        return;
      }
      onConfirm && onConfirm({ coords: curCoords, text: curText });
      close();
    });
  }
  var bound = false;
  function initHome() {
    onShow("home", () => {
      setTimeout(initMap, 60);
      if (map) setTimeout(() => requestAnimationFrame(() => map.container.fitToViewport()), 360);
      if (!bound) {
        bindSearch();
        bindMapButtons();
        bindSheet();
        bound = true;
      }
    });
  }

  // app/api/catalog.js
  var LS_CATALOG = "almanirent_catalog";
  var cache = null;
  function buildCatalog(rows) {
    var _a;
    const materialsMap = {};
    const equipment = [];
    const services = [];
    for (const r of (rows || []).filter((r2) => r2.is_available !== false)) {
      if (r.category === "material") {
        (materialsMap[_a = r.product_name] || (materialsMap[_a] = { product_name: r.product_name, category: "material", fractions: [] })).fractions.push(r);
      } else if (r.category === "equipment") {
        equipment.push(r);
      } else if (r.category === "service") {
        services.push(r);
      }
    }
    return { material: Object.values(materialsMap), equipment, service: services };
  }
  function cachedCatalog() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(LS_CATALOG);
      if (raw) {
        cache = JSON.parse(raw);
        return cache;
      }
    } catch (e) {
    }
    return null;
  }
  async function loadCatalog(force = false) {
    if (cache && !force) return cache;
    const pricesRes = await supabase.from("product_prices").select("*");
    if (pricesRes.error) {
      const fallback = cachedCatalog();
      if (fallback) return fallback;
      throw pricesRes.error;
    }
    cache = buildCatalog(pricesRes.data);
    try {
      localStorage.setItem(LS_CATALOG, JSON.stringify(cache));
    } catch (e) {
    }
    return cache;
  }
  function fromPrice(item) {
    if (item.category === "material") {
      const prices = (item.fractions || []).map((f) => Number(f.base_price)).filter((n) => n > 0);
      return { value: prices.length ? Math.min(...prices) : 0, unit: "\u20BD/\u043C\xB3" };
    }
    if (item.price_per_hour != null) return { value: Number(item.price_per_hour), unit: "\u20BD/\u0447\u0430\u0441" };
    if (item.base_price != null) return { value: Number(item.base_price), unit: "\u20BD" };
    return { value: 0, unit: "\u20BD" };
  }
  var IMAGES = {
    "\u0429\u0435\u0431\u0435\u043D\u044C": "/assets/products/shcheben.jpg",
    "\u041F\u0435\u0441\u043E\u043A": "/assets/products/pesok.jpg",
    "\u041C\u0438\u043D\u0438\u043F\u043E\u0433\u0440\u0443\u0437\u0447\u0438\u043A": "/assets/products/minipogruzchik.jpg",
    "\u041C\u0438\u043D\u0438\u044D\u043A\u0441\u043A\u0430\u0432\u0430\u0442\u043E\u0440": "/assets/products/miniekskavator.jpg",
    "\u041C\u0430\u043D\u0438\u043F\u0443\u043B\u044F\u0442\u043E\u0440": "/assets/products/manipulyator.jpg",
    "\u0421\u0430\u043C\u043E\u0441\u0432\u0430\u043B": "/assets/products/samosval.jpg",
    "\u0413\u0435\u043E\u0434\u0435\u0437\u0438\u0441\u0442": "/assets/products/geodezist.jpg"
  };
  function productImage(item) {
    return IMAGES[item.product_name] || null;
  }
  function productIcon(item) {
    const map2 = {
      \u041C\u0438\u043D\u0438\u043F\u043E\u0433\u0440\u0443\u0437\u0447\u0438\u043A: "fa-tractor",
      \u041C\u0438\u043D\u0438\u044D\u043A\u0441\u043A\u0430\u0432\u0430\u0442\u043E\u0440: "fa-truck-monster",
      \u041C\u0430\u043D\u0438\u043F\u0443\u043B\u044F\u0442\u043E\u0440: "fa-truck-arrow-right",
      \u0421\u0430\u043C\u043E\u0441\u0432\u0430\u043B: "fa-truck",
      \u0413\u0435\u043E\u0434\u0435\u0437\u0438\u0441\u0442: "fa-helmet-safety"
    };
    if (item.category === "material") return "fa-cubes-stacked";
    return map2[item.product_name] || "fa-box";
  }

  // app/pricing.js
  function materialTier(row, quantity) {
    const rules = Array.isArray(row.discount_rules) ? row.discount_rules : [];
    for (const r of rules) {
      const okMin = r.min == null || quantity >= r.min;
      const okMax = r.max == null || quantity <= r.max;
      if (okMin && okMax) return { price: Number(r.price), delivery: Number(r.delivery || 0) };
    }
    return { price: Number(row.base_price || 0), delivery: 0 };
  }
  function priceMaterial(row, quantity) {
    const q = Math.max(0, Number(quantity) || 0);
    const tier = materialTier(row, q);
    const goods = q * tier.price;
    const total = goods + tier.delivery;
    return { goods, delivery: tier.delivery, pricePerUnit: tier.price, total };
  }
  function priceEquipment(row, hours, outOfCity = false) {
    const min = Number(row.min_hours) || 1;
    const billable = Math.max(Number(hours) || 0, min);
    const rental = billable * Number(row.price_per_hour || 0);
    const delivery = Number(outOfCity ? row.out_of_city_delivery : row.city_delivery) || 0;
    return { rental, delivery, billableHours: billable, minHours: min, total: rental + delivery };
  }
  function priceService(row, points = 1) {
    const p = Math.max(1, Number(points) || 1);
    const total = p * Number(row.base_price || 0);
    return { points: p, total };
  }
  function partnerPrice(total) {
    return Math.max(0, Math.round(Number(total) || 0));
  }

  // app/api/orders.js
  async function createOrder({
    product,
    category,
    fraction = null,
    quantity = null,
    rentalHours = null,
    servicePoints = null,
    address = "",
    coordinates = null,
    deliveryDate = null,
    deliveryTime = null,
    comments = "",
    totalPrice,
    paymentMethod = "card"
  }) {
    const user = state.user;
    if (!user) throw new Error("\u041D\u0443\u0436\u043D\u043E \u0432\u043E\u0439\u0442\u0438 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442");
    let customerName = user.name || null;
    if (!customerName) {
      const { data: data3 } = await supabase.from("user_profiles").select("name").eq("user_id", user.id).maybeSingle();
      customerName = (data3 == null ? void 0 : data3.name) || null;
      if (customerName) user.name = customerName;
    }
    const row = {
      customer_id: user.id,
      customer_name: customerName,
      phone: user.phone || null,
      product,
      category,
      fraction,
      quantity: quantity != null ? String(quantity) : null,
      rental_hours: rentalHours,
      service_points: servicePoints,
      coordinates,
      address,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      comments,
      total_price: Math.round(totalPrice),
      partner_price: partnerPrice(totalPrice),
      payment_method: paymentMethod,
      // 'card' | 'cash' (нужен столбец в orders)
      status: "new"
    };
    const { data: data2, error } = await supabase.from("orders").insert(row).select().single();
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437");
    return data2;
  }
  async function expireStaleOrders() {
    try {
      await supabase.rpc("expire_stale_orders");
    } catch (e) {
    }
  }
  async function listMyOrders() {
    const user = state.user;
    if (!user) return [];
    await expireStaleOrders();
    const { data: data2, error } = await supabase.from("orders").select("*").eq("customer_id", user.id).order("created_at", { ascending: false });
    if (error) throw error;
    return data2 || [];
  }
  function statusLabel(status) {
    const map2 = {
      new: ["\u0418\u0449\u0435\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430", "is-new"],
      taken: ["\u0412 \u0440\u0430\u0431\u043E\u0442\u0435", "is-work"],
      in_progress: ["\u0412 \u0440\u0430\u0431\u043E\u0442\u0435", "is-work"],
      awaiting_confirmation: ["\u0416\u0434\u0451\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", "is-new"],
      completed: ["\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D", "is-done"],
      done: ["\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D", "is-done"],
      cancelled: ["\u041E\u0442\u043C\u0435\u043D\u0451\u043D", "is-work"],
      expired: ["\u0418\u0441\u0442\u0451\u043A", "is-work"]
    };
    return map2[status] || ["\u0417\u0430\u043A\u0430\u0437", "is-work"];
  }
  var STATUS_GROUP = {
    active: ["new", "taken", "in_progress", "awaiting_confirmation"],
    completed: ["completed", "done"],
    cancelled: ["cancelled", "expired"]
  };
  async function confirmOrder(orderId) {
    const { data: data2, error } = await supabase.from("orders").update({ status: "completed", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", orderId).eq("status", "awaiting_confirmation").select("id");
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C");
    if (!data2 || !data2.length) throw new Error("\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F");
  }

  // app/screens/order.js
  var sel = null;
  var currentTotal = 0;
  var pickedCoords = null;
  var cityRadiusKm = 10;
  function distFromCenterKm(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) return null;
    const R = 6371, toRad2 = (d) => d * Math.PI / 180;
    const [la1, lo1] = YAROSLAVL_CENTER, [la2, lo2] = coords;
    const dLa = toRad2(la2 - la1), dLo = toRad2(lo2 - lo1);
    const a = Math.sin(dLa / 2) ** 2 + Math.cos(toRad2(la1)) * Math.cos(toRad2(la2)) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }
  function currentCoords() {
    var _a;
    return pickedCoords || ((_a = getSelectedAddress()) == null ? void 0 : _a.coords) || null;
  }
  function updateDelivery() {
    if (!sel || sel.category !== "equipment") return;
    const coords = currentCoords();
    const dist = distFromCenterKm(coords);
    sel.outOfCity = dist != null && dist > cityRadiusKm;
    const info = document.getElementById("ordDeliveryInfo");
    if (info) {
      if (dist == null) {
        info.innerHTML = `<i class="fa-solid fa-circle-info"></i> \u041F\u043E\u0434\u0430\u0447\u0430 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438`;
        info.className = "ar-deliv-info";
      } else if (sel.outOfCity) {
        info.innerHTML = `<i class="fa-solid fa-location-arrow"></i> \u0417\u0430 \u0433\u043E\u0440\u043E\u0434\u043E\u043C (\u0441\u0432\u044B\u0448\u0435 ${cityRadiusKm} \u043A\u043C) \u2014 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u043D\u0430\u044F \u043F\u043E\u0434\u0430\u0447\u0430 ${money(sel.row.out_of_city_delivery)}`;
        info.className = "ar-deliv-info out";
      } else {
        info.innerHTML = `<i class="fa-solid fa-check"></i> \u041F\u043E \u0433\u043E\u0440\u043E\u0434\u0443 (\u0434\u043E ${cityRadiusKm} \u043A\u043C) \u2014 \u043F\u043E\u0434\u0430\u0447\u0430 ${money(sel.row.city_delivery)}`;
        info.className = "ar-deliv-info";
      }
    }
    recalc();
  }
  function openOrder(item) {
    if (item.category === "material") {
      sel = { item, category: "material", row: item.fractions[0], quantity: 5 };
    } else if (item.category === "equipment") {
      sel = { item, category: "equipment", row: item, hours: item.min_hours || 1, outOfCity: false };
    } else {
      sel = { item, category: "service", row: item, points: 1 };
    }
    sel.payment = "cash";
    pickedCoords = null;
    go("order");
  }
  function stepper(id, value, unit = "") {
    return `
    <div class="ar-stepper">
      <button class="ar-stepbtn" data-step="${id}:-1" aria-label="\u043C\u0438\u043D\u0443\u0441"><i class="fa-solid fa-minus"></i></button>
      <div class="ar-stepval"><span id="${id}" class="ar-mono">${value}</span>${unit ? `<span class="ar-stepunit">${unit}</span>` : ""}</div>
      <button class="ar-stepbtn" data-step="${id}:1" aria-label="\u043F\u043B\u044E\u0441"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  }
  function buildForm() {
    const body = document.getElementById("orderBody");
    const it = sel.item;
    const img = productImage(it);
    const thumb = img ? `<div style="width:56px;height:56px;border-radius:12px;overflow:hidden;flex-shrink:0;"><img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"></div>` : `<div class="ar-ph" style="width:56px;height:56px;flex-shrink:0;"><i class="fa-solid fa-box" style="color:#b9c0cf"></i></div>`;
    let html = `
    <div class="ar-card" style="padding:14px;display:flex;gap:13px;align-items:center;">
      ${thumb}
      <div><div style="font-weight:800;font-size:16px;">${it.product_name}</div>
      <div class="ar-sub" style="font-size:12px;">${{ material: "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B", equipment: "\u0410\u0440\u0435\u043D\u0434\u0430 \u0442\u0435\u0445\u043D\u0438\u043A\u0438", service: "\u0423\u0441\u043B\u0443\u0433\u0430" }[sel.category]}</div></div>
    </div>`;
    if (sel.category === "material") {
      html += `<div><div class="ar-flabel">\u0424\u0440\u0430\u043A\u0446\u0438\u044F</div><div class="ar-chips" id="fracChips" style="flex-wrap:wrap;">`;
      it.fractions.forEach((f, i) => {
        html += `<div class="ar-chip ${i === 0 ? "is-on" : ""}" data-frac="${i}">${f.fraction || it.product_name}</div>`;
      });
      html += `</div></div>
      <div><div class="ar-flabel">\u041E\u0431\u044A\u0451\u043C, \u043C\xB3</div>${stepper("qty", sel.quantity, "\u043C\xB3")}</div>`;
    } else if (sel.category === "equipment") {
      html += `<div><div class="ar-flabel">\u0427\u0430\u0441\u044B \u0430\u0440\u0435\u043D\u0434\u044B</div>${stepper("hrs", sel.hours, "\u0447")}
      <div class="ar-sub" style="font-size:11.5px;margin-top:6px;">\u041C\u0438\u043D\u0438\u043C\u0443\u043C ${sel.row.min_hours || 1} \u0447</div></div>
      <div class="ar-deliv-info" id="ordDeliveryInfo"><i class="fa-solid fa-circle-info"></i> \u041F\u043E\u0434\u0430\u0447\u0430 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</div>`;
    } else {
      html += `<div><div class="ar-flabel">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0447\u0435\u043A</div>${stepper("pts", sel.points, "\u0442\u043E\u0447\u0435\u043A")}</div>`;
    }
    html += `
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div class="ar-flabel" style="margin:0;">\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</div>
        <button type="button" id="ordAddrMap" class="ar-addrmap-btn" title="\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435"><i class="fa-solid fa-map-location-dot"></i></button>
      </div>
      <div class="ar-field" style="margin-top:7px;"><i class="fa-solid fa-location-dot"></i><input id="ordAddress" type="text" placeholder="\u0423\u043B\u0438\u0446\u0430, \u0434\u043E\u043C" /></div></div>
    <div class="ar-grid2">
      <div><div class="ar-flabel">\u0414\u0430\u0442\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 *</div><div class="ar-field"><input id="ordDate" type="date" /></div></div>
      <div><div class="ar-flabel">\u0412\u0440\u0435\u043C\u044F *</div><div class="ar-field"><input id="ordTime" type="time" /></div></div>
    </div>
    <div><div class="ar-flabel">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</div>
      <div class="ar-field"><input id="ordComment" type="text" placeholder="\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C \u0437\u0430 \u0447\u0430\u0441" /></div></div>
    <div><div class="ar-flabel">\u041E\u043F\u043B\u0430\u0442\u0430</div>
      <div class="ar-seg" id="paySeg">
        <div class="${sel.payment === "card" ? "is-on" : ""}" data-pay="card"><i class="fa-regular fa-credit-card"></i> \u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442</div>
        <div class="${sel.payment === "cash" ? "is-on" : ""}" data-pay="cash"><i class="fa-solid fa-money-bill-wave"></i> \u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435</div>
      </div></div>
    <div style="height:8px;"></div>`;
    body.innerHTML = html;
  }
  function recalc() {
    let r;
    if (sel.category === "material") r = priceMaterial(sel.row, sel.quantity);
    else if (sel.category === "equipment") r = priceEquipment(sel.row, sel.hours, sel.outOfCity);
    else r = priceService(sel.row, sel.points);
    currentTotal = r.total;
    const totalEl = document.getElementById("orderTotal");
    if (totalEl) countTo(totalEl, currentTotal, { format: (v) => money(Math.round(v)) });
    const breakdown = document.getElementById("orderBreakdown");
    if (breakdown) {
      if (sel.category === "material") {
        breakdown.textContent = `${sel.quantity} \u043C\xB3 \xD7 ${money(r.pricePerUnit)} + \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 ${money(r.delivery)}`;
      } else if (sel.category === "equipment") {
        breakdown.textContent = `${r.billableHours} \u0447 \xD7 ${money(sel.row.price_per_hour)} + \u043F\u043E\u0434\u0430\u0447\u0430 ${money(r.delivery)}`;
      } else {
        breakdown.textContent = `${r.points} \xD7 ${money(sel.row.base_price)}`;
      }
    }
  }
  function initOrder() {
    const body = document.getElementById("orderBody");
    body.addEventListener("click", (e) => {
      if (e.target.closest("#ordAddrMap")) {
        const inp = document.getElementById("ordAddress");
        const cur = pickedCoords ? { coords: pickedCoords, text: inp ? inp.value : "" } : getSelectedAddress();
        openMapPicker(cur, (res) => {
          pickedCoords = res.coords;
          if (inp) inp.value = res.text || inp.value;
          updateDelivery();
        });
        return;
      }
      const stepBtn = e.target.closest("[data-step]");
      if (stepBtn) {
        const [id, deltaStr] = stepBtn.getAttribute("data-step").split(":");
        const delta = Number(deltaStr);
        let value;
        if (id === "qty") value = sel.quantity = Math.max(1, sel.quantity + delta);
        else if (id === "hrs") value = sel.hours = Math.max(sel.row.min_hours || 1, sel.hours + delta);
        else if (id === "pts") value = sel.points = Math.max(1, sel.points + delta);
        const span = document.getElementById(id);
        if (span) {
          span.textContent = value;
          bump(span);
        }
        recalc();
        return;
      }
      const frac = e.target.closest("[data-frac]");
      if (frac) {
        const i = Number(frac.getAttribute("data-frac"));
        sel.row = sel.item.fractions[i];
        document.querySelectorAll("#fracChips .ar-chip").forEach((c, j) => c.classList.toggle("is-on", j === i));
        recalc();
        return;
      }
      const payBtn = e.target.closest("[data-pay]");
      if (payBtn) {
        sel.payment = payBtn.getAttribute("data-pay");
        document.querySelectorAll("#paySeg [data-pay]").forEach((d) => d.classList.toggle("is-on", d === payBtn));
      }
    });
    document.getElementById("orderSubmit").addEventListener("click", async () => {
      var _a;
      const btn = document.getElementById("orderSubmit");
      const address = document.getElementById("ordAddress").value.trim();
      const dDate = document.getElementById("ordDate").value;
      const dTime = document.getElementById("ordTime").value;
      if (!address) {
        toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438", "err");
        return;
      }
      if (!dDate || !dTime) {
        toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0438 \u0432\u0440\u0435\u043C\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438", "err");
        return;
      }
      btn.disabled = true;
      const orig = btn.textContent;
      btn.textContent = "\u041E\u0444\u043E\u0440\u043C\u043B\u044F\u0435\u043C\u2026";
      try {
        const created = await createOrder({
          product: sel.item.product_name,
          category: sel.category,
          fraction: sel.category === "material" ? sel.row.fraction : null,
          quantity: sel.category === "material" ? sel.quantity : null,
          rentalHours: sel.category === "equipment" ? sel.hours : null,
          servicePoints: sel.category === "service" ? sel.points : null,
          address,
          coordinates: pickedCoords || ((_a = getSelectedAddress()) == null ? void 0 : _a.coords) || null,
          paymentMethod: sel.payment,
          deliveryDate: dDate,
          deliveryTime: dTime,
          comments: document.getElementById("ordComment").value.trim(),
          totalPrice: currentTotal
        });
        if (created) sendPush("order_created", created);
        toast("\u0417\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D \u2014 \u0438\u0449\u0435\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430");
        go("orders");
      } catch (e) {
        toast(e.message, "err");
      } finally {
        btn.disabled = false;
        btn.textContent = orig;
      }
    });
    onShow("order", async () => {
      if (!sel) {
        go("catalog");
        return;
      }
      buildForm();
      const te = document.getElementById("orderTotal");
      if (te) te._cuVal = 0;
      recalc();
      try {
        const { data: data2 } = await supabase.from("app_settings").select("value").eq("key", "distance_surcharge_km").maybeSingle();
        const r = Number(data2 == null ? void 0 : data2.value);
        if (r > 0) cityRadiusKm = r;
      } catch (e) {
      }
      updateDelivery();
      const sa = getSelectedAddress();
      const addrInput = document.getElementById("ordAddress");
      if (sa && sa.text && addrInput) addrInput.value = sa.text;
      const dEl = document.getElementById("ordDate");
      const tEl = document.getElementById("ordTime");
      const soon = new Date(Date.now() + 60 * 60 * 1e3);
      if (dEl && !dEl.value) dEl.value = `${soon.getFullYear()}-${String(soon.getMonth() + 1).padStart(2, "0")}-${String(soon.getDate()).padStart(2, "0")}`;
      if (tEl && !tEl.value) tEl.value = `${String(soon.getHours()).padStart(2, "0")}:00`;
    });
  }

  // app/screens/catalog.js
  var activeCat = "material";
  var data = null;
  function card(item) {
    const fp = fromPrice(item);
    const icon = productIcon(item);
    const sub = item.category === "material" ? `${item.fractions.length} \u0444\u0440\u0430\u043A\u0446.` : item.category === "equipment" ? `\u043C\u0438\u043D. ${item.min_hours || 1} \u0447` : "\u0432\u044B\u0435\u0437\u0434 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430";
    const img = productImage(item);
    const media = img ? `<div style="height:92px;border-radius:12px;overflow:hidden;"><img src="${img}" alt="${item.product_name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"></div>` : `<div class="ar-ph" style="height:92px;"><i class="fa-solid ${icon}" style="font-size:24px;color:#b9c0cf"></i></div>`;
    const el = document.createElement("div");
    el.className = "ar-card ar-product";
    el.style.cursor = "pointer";
    el.innerHTML = `
    ${media}
    <div class="ar-name">${item.product_name}</div>
    <div class="ar-from">${sub}</div>
    <div class="ar-cost">\u043E\u0442 ${money(fp.value).replace(" \u20BD", "")} ${fp.unit}</div>`;
    if (img) fadeImg(el.querySelector("img"));
    el.addEventListener("click", () => openOrder(item));
    return el;
  }
  function render() {
    const grid = document.getElementById("catalogGrid");
    if (!grid || !data) return;
    const items = data[activeCat] || [];
    grid.innerHTML = "";
    if (!items.length) {
      grid.innerHTML = `<div class="ar-sub" style="grid-column:1/-1;padding:20px 0;">\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043F\u043E\u0437\u0438\u0446\u0438\u0439 \u0432 \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438.</div>`;
      return;
    }
    items.forEach((it) => grid.appendChild(card(it)));
    staggerIn(grid);
    document.querySelectorAll("#catalogChips .ar-chip").forEach((c) => {
      c.classList.toggle("is-on", c.getAttribute("data-cat") === activeCat);
    });
  }
  function initCatalog() {
    document.addEventListener("click", (e) => {
      const tile = e.target.closest('[data-screen="home"] [data-cat]');
      if (tile) activeCat = tile.getAttribute("data-cat");
    }, true);
    const chips = document.getElementById("catalogChips");
    chips == null ? void 0 : chips.addEventListener("click", (e) => {
      var _a;
      const chip = e.target.closest(".ar-chip");
      if (!chip || chip.classList.contains("is-on")) return;
      activeCat = chip.getAttribute("data-cat");
      document.querySelectorAll("#catalogChips .ar-chip").forEach((c) => c.classList.toggle("is-on", c.getAttribute("data-cat") === activeCat));
      const grid = document.getElementById("catalogGrid");
      if (grid && !((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches)) {
        grid.classList.add("is-swapping");
        setTimeout(() => {
          render();
          grid.classList.remove("is-swapping");
        }, 140);
      } else {
        render();
      }
    });
    onShow("catalog", async (params) => {
      if (params.cat) activeCat = params.cat;
      const grid = document.getElementById("catalogGrid");
      if (!data) data = cachedCatalog();
      if (data) {
        render();
        loadCatalog().then((fresh) => {
          data = fresh;
          render();
        }).catch(() => {
        });
        return;
      }
      grid.innerHTML = Array.from({ length: 6 }).map(() => `
      <div class="ar-card ar-product">
        <div class="ar-skel" style="height:92px;border-radius:12px;"></div>
        <div class="ar-skel" style="height:13px;width:72%;margin:2px 6px 0;"></div>
        <div class="ar-skel" style="height:11px;width:46%;margin:0 6px;"></div>
        <div class="ar-skel" style="height:12px;width:56%;margin:2px 6px 0;"></div>
      </div>`).join("");
      try {
        data = await loadCatalog();
      } catch (e) {
        toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433", "err");
        return;
      }
      render();
    });
  }

  // app/api/chat.js
  async function listChats(role = "customer") {
    const user = state.user;
    if (!user) return [];
    const column = role === "partner" ? "executor_id" : "customer_id";
    const { data: data2, error } = await supabase.from("chats").select("*, orders(product, display_id, status, customer_name, executor_name)").eq(column, user.id).order("last_message_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    const chats = data2 || [];
    if (chats.length) {
      const ids = chats.map((c) => c.id);
      const otherCol = role === "partner" ? "customer_id" : "executor_id";
      const otherIds = [...new Set(chats.filter((c) => !c.is_support && c[otherCol]).map((c) => c[otherCol]))];
      const [unRes, profsRes] = await Promise.all([
        supabase.from("messages").select("chat_id, sender_id").in("chat_id", ids).eq("read", false),
        otherIds.length ? supabase.from("user_profiles").select("user_id, avatar_url").in("user_id", otherIds) : Promise.resolve({ data: [] })
      ]);
      const counts = {};
      (unRes.data || []).forEach((m) => {
        if (m.sender_id !== user.id) counts[m.chat_id] = (counts[m.chat_id] || 0) + 1;
      });
      const amap = {};
      (profsRes.data || []).forEach((p) => {
        amap[p.user_id] = p.avatar_url;
      });
      chats.forEach((c) => {
        c.unread_count = counts[c.id] || 0;
        if (!c.is_support) c.counterpart_avatar = amap[c[otherCol]] || null;
      });
    }
    return chats;
  }
  async function getUserAvatar(userId) {
    if (!userId) return null;
    const { data: data2 } = await supabase.from("user_profiles").select("avatar_url").eq("user_id", userId).maybeSingle();
    return (data2 == null ? void 0 : data2.avatar_url) || null;
  }
  async function markChatRead(chatId) {
    const user = state.user;
    if (!user || !chatId) return;
    await supabase.from("messages").update({ read: true }).eq("chat_id", chatId).eq("read", false).neq("sender_id", user.id).then(() => {
    }, () => {
    });
  }
  var CHAT_ACTIVE_STATUSES = ["new", "taken", "in_progress", "awaiting_confirmation"];
  function chatIsOpen(chat) {
    var _a;
    if (!chat) return false;
    if (chat.is_support) return true;
    const status = (_a = chat.orders) == null ? void 0 : _a.status;
    if (!status) return true;
    return CHAT_ACTIVE_STATUSES.includes(status);
  }
  async function getOrCreateOrderChat(order3) {
    const user = state.user;
    const { data: found } = await supabase.from("chats").select("*").eq("order_id", order3.id).maybeSingle();
    if (found) {
      const fix = {};
      if (order3.customer_id && found.customer_id !== order3.customer_id) fix.customer_id = order3.customer_id;
      if (order3.executor_id && found.executor_id !== order3.executor_id) fix.executor_id = order3.executor_id;
      if (Object.keys(fix).length) {
        const { data: upd } = await supabase.from("chats").update(fix).eq("id", found.id).select().single();
        return upd || { ...found, ...fix };
      }
      return found;
    }
    const { data: data2, error } = await supabase.from("chats").insert({
      order_id: order3.id,
      customer_id: order3.customer_id || (state.role !== "partner" ? user.id : null),
      executor_id: order3.executor_id || (state.role === "partner" ? user.id : null),
      is_support: false
    }).select().single();
    if (error) {
      const { data: again } = await supabase.from("chats").select("*").eq("order_id", order3.id).maybeSingle();
      if (again) return again;
      throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442");
    }
    return data2;
  }
  async function getOrCreateSupportChat(role = state.role) {
    const user = state.user;
    const isPartner = role === "partner";
    const column = isPartner ? "executor_id" : "customer_id";
    const reselect = async () => {
      const { data: data3 } = await supabase.from("chats").select("*").eq(column, user.id).eq("is_support", true).order("created_at", { ascending: true }).limit(1);
      return data3 && data3[0] ? data3[0] : null;
    };
    const found = await reselect();
    if (found) return found;
    const row = isPartner ? { executor_id: user.id, is_support: true } : { customer_id: user.id, is_support: true };
    const { data: data2, error } = await supabase.from("chats").insert(row).select().single();
    if (error) {
      const again = await reselect();
      if (again) return again;
      throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438");
    }
    return data2;
  }
  async function loadMessages(chatId) {
    const { data: data2, error } = await supabase.from("messages").select("*").eq("chat_id", chatId).order("created_at", { ascending: true });
    if (error) throw error;
    return data2 || [];
  }
  function packImages(images) {
    if (!images) return null;
    const arr = Array.isArray(images) ? images.filter(Boolean) : [images];
    if (!arr.length) return null;
    return arr.length === 1 ? arr[0] : JSON.stringify(arr);
  }
  async function sendMessage(chatId, text, images = null) {
    const user = state.user;
    const imageVal = packImages(images);
    const { data: data2, error } = await supabase.from("messages").insert({ chat_id: chatId, sender_id: user.id, message: text || null, image_url: imageVal, read: false }).select().single();
    if (error) throw new Error("\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E");
    const preview = text || (imageVal ? "\u{1F4F7} \u0424\u043E\u0442\u043E" : "");
    await supabase.from("chats").update({ last_message: preview, last_message_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", chatId).then(() => {
    }, () => {
    });
    return data2;
  }
  function parseImages(val) {
    if (!val) return [];
    if (typeof val !== "string") return Array.isArray(val) ? val : [];
    if (val.startsWith("[")) {
      try {
        const a = JSON.parse(val);
        return Array.isArray(a) ? a : [val];
      } catch (e) {
        return [val];
      }
    }
    return [val];
  }
  function subscribeMessages(chatId, onInsert, onUpdate) {
    const channel2 = supabase.channel("messages:" + chatId).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
      (payload) => onInsert(payload.new)
    ).on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
      (payload) => onUpdate && onUpdate(payload.new)
    ).subscribe();
    return () => supabase.removeChannel(channel2);
  }

  // app/nav.js
  var CUSTOMER_ITEMS = [
    ["fa-solid fa-layer-group", "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", "home"],
    ["fa-regular fa-clipboard", "\u0417\u0430\u043A\u0430\u0437\u044B", "orders"],
    ["fa-regular fa-comment", "\u0427\u0430\u0442", "chats"],
    ["fa-regular fa-user", "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "profile"]
  ];
  function navHTML(items, active) {
    return items.map(([ic, label, target]) => {
      const on = target === active ? " is-on" : "";
      const nav = target === active ? "" : ` data-nav="${target}"`;
      return `<div class="ar-navitem${on}"${nav}><i class="${ic}"></i>${label}</div>`;
    }).join("");
  }
  function initNav() {
    document.querySelectorAll("[data-tabbar]").forEach((host2) => {
      host2.innerHTML = navHTML(CUSTOMER_ITEMS, host2.getAttribute("data-tabbar"));
    });
  }

  // app/partner-nav.js
  var PARTNER_ITEMS = [
    ["fa-solid fa-bolt", "\u0417\u0430\u043A\u0430\u0437\u044B", "p-orders"],
    ["fa-solid fa-truck-pickup", "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442", "p-transport"],
    ["fa-solid fa-wallet", "\u041A\u0430\u0431\u0438\u043D\u0435\u0442", "cabinet"],
    ["fa-regular fa-comment", "\u0427\u0430\u0442", "p-chats"],
    ["fa-regular fa-user", "\u041F\u0440\u043E\u0444\u0438\u043B\u044C", "p-profile"]
  ];
  function initPartnerNav() {
    document.querySelectorAll("[data-ptabbar]").forEach((host2) => {
      host2.innerHTML = navHTML(PARTNER_ITEMS, host2.getAttribute("data-ptabbar"));
    });
  }

  // app/api/storage.js
  var BUCKET = "user-media";
  function compressToBlob(file, max = 1280, quality = 0.78) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onerror = reject;
      img.onload = () => {
        let { width: w, height: h } = img;
        if (w > max || h > max) {
          const k = Math.min(max / w, max / h);
          w = Math.round(w * k);
          h = Math.round(h * k);
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        c.toBlob((b) => b ? resolve(b) : reject(new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0444\u043E\u0442\u043E")), "image/jpeg", quality);
      };
      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  function blobToDataUrl(blob) {
    return new Promise((r) => {
      const fr = new FileReader();
      fr.onload = () => r(fr.result);
      fr.readAsDataURL(blob);
    });
  }
  async function uploadImage(folder, file, opts = {}) {
    var _a;
    const blob = await compressToBlob(file, opts.max, opts.quality);
    const uid = ((_a = state.user) == null ? void 0 : _a.id) || "anon";
    const path = `${folder}/${uid}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
    try {
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg", upsert: false });
      if (error) throw error;
      const { data: data2 } = supabase.storage.from(BUCKET).getPublicUrl(path);
      if (data2 && data2.publicUrl) return data2.publicUrl;
      throw new Error("no public url");
    } catch (_) {
      return blobToDataUrl(blob);
    }
  }

  // app/screens/chat.js
  var currentChat = null;
  var unsubscribe = null;
  var renderedIds = /* @__PURE__ */ new Set();
  function chatsListScreen() {
    return state.role === "partner" ? "p-chats" : "chats";
  }
  async function openOrderChat(order3) {
    chatBackTo = null;
    try {
      const chat = await getOrCreateOrderChat(order3);
      chat.orders = {
        product: order3.product,
        display_id: order3.display_id,
        status: order3.status,
        customer_name: order3.customer_name,
        executor_name: order3.executor_name
      };
      openChatDialog(chat);
    } catch (e) {
      toast(e.message, "err");
    }
  }
  var chatBackTo = null;
  async function openSupportChat() {
    chatBackTo = null;
    try {
      const chat = await getOrCreateSupportChat(state.role);
      openChatDialog(chat);
    } catch (e) {
      toast(e.message, "err");
    }
  }
  async function openBannedSupport(returnScreen = "banned") {
    try {
      const role = returnScreen === "p-banned" ? "partner" : "customer";
      const chat = await getOrCreateSupportChat(role);
      chatBackTo = returnScreen;
      openChatDialog(chat);
    } catch (e) {
      toast(e.message, "err");
    }
  }
  function openChatDialog(chat) {
    currentChat = chat;
    go("chat");
  }
  function counterpart(c) {
    if (c.is_support) return { name: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", role: "\u0421\u0435\u0440\u0432\u0438\u0441 AlmaniRent" };
    const o = c.orders || {};
    if (state.role === "partner") return { name: o.customer_name || "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A", role: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A" };
    return { name: o.executor_name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440", role: "\u041F\u0430\u0440\u0442\u043D\u0451\u0440" };
  }
  function chatRow(c, pinned = false) {
    var _a;
    const cp = counterpart(c);
    const num = ((_a = c.orders) == null ? void 0 : _a.display_id) ? ` \xB7 ${orderCode(c.orders.display_id)}` : "";
    const sub = c.is_support ? "\u0421\u0435\u0440\u0432\u0438\u0441 AlmaniRent" : `${cp.role}${num}`;
    const time = c.last_message_at ? new Date(c.last_message_at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
    const closed = !chatIsOpen(c);
    const avatar = c.is_support ? `<div class="ar-chat-ava support"><img src="/assets/logo-white.png" alt="AlmaniRent" class="ar-support-logo"></div>` : c.counterpart_avatar ? `<div class="ar-chat-ava"${closed ? ' style="opacity:.5;"' : ""}><img src="${c.counterpart_avatar}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div>` : `<div class="ar-chat-ava"${closed ? ' style="opacity:.5;"' : ""}>${esc((cp.name[0] || "?").toUpperCase())}</div>`;
    const unread = Number(c.unread_count) || 0;
    const el = document.createElement("div");
    el.className = "ar-chat-row" + (pinned ? " pinned" : "");
    el.innerHTML = `
    ${avatar}
    <div style="flex:1;min-width:0;">
      <div class="ar-chat-name">${pinned ? '<i class="fa-solid fa-thumbtack" style="font-size:10px;color:var(--ink-3);margin-right:6px;"></i>' : ""}${esc(cp.name)}${closed ? '<span class="ar-pill is-work" style="font-size:9px;padding:2px 6px;margin-left:7px;">\u0437\u0430\u043A\u0440\u044B\u0442</span>' : ""}</div>
      <div class="ar-chat-prev">${esc(c.last_message || sub)}</div>
    </div>
    <div style="text-align:right;flex-shrink:0;"><div class="ar-chat-time">${time}</div>${unread ? `<span class="ar-unread">${unread}</span>` : ""}</div>`;
    el.addEventListener("click", () => {
      chatBackTo = null;
      openChatDialog(c);
    });
    return el;
  }
  async function renderChatsListFor(role, containerId) {
    const list = document.getElementById(containerId);
    if (!list) return;
    list.innerHTML = `<div class="ar-sub" style="padding:20px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0447\u0430\u0442\u044B\u2026</div>`;
    let chats = [];
    try {
      chats = await listChats(role);
    } catch (e) {
      toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0447\u0430\u0442\u044B", "err");
    }
    const support = chats.find((c) => c.is_support);
    const dialogs = chats.filter((c) => !c.is_support);
    list.innerHTML = "";
    const supUnread = Number(support == null ? void 0 : support.unread_count) || 0;
    const pinned = document.createElement("div");
    pinned.className = "ar-chat-row pinned";
    pinned.innerHTML = `
    <div class="ar-chat-ava support"><img src="/assets/logo-white.png" alt="AlmaniRent" class="ar-support-logo"></div>
    <div style="flex:1;min-width:0;">
      <div class="ar-chat-name"><i class="fa-solid fa-thumbtack" style="font-size:10px;color:var(--ink-3);margin-right:6px;"></i>\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430</div>
      <div class="ar-chat-prev">${esc((support == null ? void 0 : support.last_message) || "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F")}</div>
    </div>
    ${supUnread ? `<div style="flex-shrink:0;"><span class="ar-unread">${supUnread}</span></div>` : ""}`;
    pinned.addEventListener("click", openSupportChat);
    list.appendChild(pinned);
    if (!dialogs.length) {
      const sub = role === "partner" ? "\u041F\u043E\u044F\u0432\u044F\u0442\u0441\u044F, \u043A\u043E\u0433\u0434\u0430 \u0432\u043E\u0437\u044C\u043C\u0451\u0442\u0435 \u0437\u0430\u043A\u0430\u0437" : "\u041F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430";
      const empty = document.createElement("div");
      empty.style.cssText = "text-align:center;padding:40px 0;color:var(--ink-3);";
      empty.innerHTML = `<i class="fa-regular fa-comments" style="font-size:32px;opacity:.35;"></i>
      <div style="margin-top:12px;font-weight:700;color:var(--ink-2);">\u0414\u0440\u0443\u0433\u0438\u0445 \u0447\u0430\u0442\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442</div>
      <div class="ar-sub" style="margin-top:4px;">${sub}</div>`;
      list.appendChild(empty);
      return;
    }
    dialogs.forEach((c) => list.appendChild(chatRow(c)));
    staggerIn(list, { start: 1 });
  }
  function tickHTML(read) {
    return `<span class="ar-tick${read ? " read" : ""}">${read ? "\u2713\u2713 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E" : "\u2713 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"}</span>`;
  }
  function albumHTML(imgs, hasText) {
    if (!imgs.length) return "";
    const mb = hasText ? ' style="margin-bottom:6px;"' : "";
    if (imgs.length === 1) {
      return `<img class="ar-bubble-img" data-imgview="1" src="${imgs[0]}" alt="\u0444\u043E\u0442\u043E"${mb}>`;
    }
    const cells = imgs.map((src) => `<img class="ar-album-cell" data-imgview="1" src="${src}" alt="\u0444\u043E\u0442\u043E">`).join("");
    const cls = imgs.length === 2 ? "n2" : imgs.length === 3 ? "n3" : "n4";
    return `<div class="ar-album ${cls}"${mb}>${cells}</div>`;
  }
  function bubble(m) {
    var _a;
    const out = m.sender_id === ((_a = state.user) == null ? void 0 : _a.id);
    const time = m.created_at ? new Date(m.created_at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
    const wrap = document.createElement("div");
    if (m.id) wrap.dataset.mid = m.id;
    wrap.style.cssText = `display:flex;flex-direction:column;gap:4px;align-items:${out ? "flex-end" : "flex-start"};`;
    const meta = out ? `${time} \xB7 <span class="ar-tickwrap">${tickHTML(!!m.read)}</span>` : time;
    const imgHTML = albumHTML(parseImages(m.image_url), m.message);
    const textHTML = m.message ? `<div class="ar-bubble ${out ? "out" : "in"}"></div>` : "";
    wrap.innerHTML = `${imgHTML}${textHTML}<div class="ar-tstamp">${meta}</div>`;
    if (m.message) wrap.querySelector(".ar-bubble").textContent = m.message;
    return wrap;
  }
  function updateMessageStatus(box, m) {
    if (!m.id) return;
    const wrap = box.querySelector(`[data-mid="${m.id}"] .ar-tickwrap`);
    if (!wrap) return;
    wrap.innerHTML = tickHTML(!!m.read);
  }
  function addMessage(box, m) {
    if (m.id && renderedIds.has(m.id)) return;
    if (m.id) renderedIds.add(m.id);
    box.appendChild(bubble(m));
    box.scrollTop = box.scrollHeight;
  }
  async function renderDialog() {
    var _a;
    const cp = counterpart(currentChat);
    const num = ((_a = currentChat.orders) == null ? void 0 : _a.display_id) ? ` \xB7 \u0437\u0430\u043A\u0430\u0437 ${orderCode(currentChat.orders.display_id)}` : "";
    document.getElementById("chatTitle").textContent = cp.name;
    const subEl = document.getElementById("chatSubtitle");
    const avaEl = document.getElementById("chatHeadAva");
    if (currentChat.is_support) {
      subEl.textContent = "\u0421\u0435\u0440\u0432\u0438\u0441 AlmaniRent";
      avaEl.classList.add("support");
      avaEl.innerHTML = '<img src="/assets/logo-white.png" alt="AlmaniRent" class="ar-support-logo">';
    } else {
      subEl.textContent = cp.role + num;
      avaEl.classList.remove("support");
      avaEl.textContent = (cp.name[0] || "?").toUpperCase();
      const otherId = state.role === "partner" ? currentChat.customer_id : currentChat.executor_id;
      const ava = currentChat.counterpart_avatar || (otherId ? await getUserAvatar(otherId) : null);
      if (ava) avaEl.innerHTML = `<img src="${ava}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
    }
    const nav = document.getElementById("chatNav");
    if (nav) {
      if (chatBackTo) {
        nav.innerHTML = "";
      } else {
        const partner = state.role === "partner";
        nav.innerHTML = navHTML(partner ? PARTNER_ITEMS : CUSTOMER_ITEMS, partner ? "p-chats" : "chats");
      }
    }
    const box = document.getElementById("chatMessages");
    box.innerHTML = "";
    renderedIds.clear();
    let msgs = [];
    try {
      msgs = await loadMessages(currentChat.id);
    } catch (e) {
    }
    msgs.forEach((m) => addMessage(box, m));
    markChatRead(currentChat.id);
    const open = chatIsOpen(currentChat);
    const composer = document.getElementById("chatComposer");
    const closedNote = document.getElementById("chatClosedNote");
    if (composer) composer.style.display = open ? "flex" : "none";
    if (closedNote) closedNote.style.display = open ? "none" : "block";
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    unsubscribe = subscribeMessages(
      currentChat.id,
      (m) => {
        var _a2;
        addMessage(box, m);
        if (m.sender_id !== ((_a2 = state.user) == null ? void 0 : _a2.id)) markChatRead(currentChat.id);
      },
      (m) => updateMessageStatus(box, m)
    );
  }
  function stopChatSub() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  }
  function initChat() {
    var _a, _b;
    onShow("chats", () => {
      stopChatSub();
      renderChatsListFor("customer", "chatsList");
    });
    onShow("p-chats", () => {
      stopChatSub();
      renderChatsListFor("partner", "pChatsList");
    });
    (_a = document.getElementById("bannedSupport")) == null ? void 0 : _a.addEventListener("click", () => openBannedSupport("banned"));
    onShow("chat", () => {
      if (!currentChat) {
        go("chats");
        return;
      }
      renderDialog();
    });
    const input = document.getElementById("chatInput");
    const sendBtn = document.getElementById("chatSend");
    async function deliver(text, images) {
      var _a2, _b2, _c;
      const hasImg = Array.isArray(images) ? images.length : !!images;
      if (!text && !hasImg || !currentChat) return;
      const box = document.getElementById("chatMessages");
      const msg = await sendMessage(currentChat.id, text, images);
      addMessage(box, msg);
      const c = currentChat;
      const myName = ((_a2 = state.user) == null ? void 0 : _a2.name) || (state.role === "partner" ? "\u041F\u0430\u0440\u0442\u043D\u0451\u0440" : "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A");
      const preview = text || "\u{1F4F7} \u0424\u043E\u0442\u043E";
      if (c.is_support) {
        sendPush("support_message", { chat_id: c.id, sender_name: myName, sender_phone: ((_b2 = state.user) == null ? void 0 : _b2.phone) || "", message: preview });
      } else {
        const me = (_c = state.user) == null ? void 0 : _c.id;
        const recipientId = c.customer_id === me ? c.executor_id : c.customer_id;
        if (recipientId && recipientId !== me) sendPush("new_message", { chat_id: c.id, recipient_id: recipientId, sender_name: myName, message: preview });
      }
    }
    async function doSend() {
      const text = input.value.trim();
      if (!text || !currentChat) return;
      input.value = "";
      try {
        await deliver(text, null);
      } catch (e) {
        toast(e.message, "err");
        input.value = text;
      }
    }
    sendBtn == null ? void 0 : sendBtn.addEventListener("click", doSend);
    input == null ? void 0 : input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSend();
    });
    const attachBtn = document.getElementById("chatAttach");
    const fileInput = document.getElementById("chatFile");
    attachBtn == null ? void 0 : attachBtn.addEventListener("click", () => fileInput == null ? void 0 : fileInput.click());
    fileInput == null ? void 0 : fileInput.addEventListener("change", async () => {
      const files = [...fileInput.files || []];
      fileInput.value = "";
      if (!files.length || !currentChat) return;
      try {
        const settled = await Promise.all(files.map((f) => uploadImage("chat", f).catch(() => null)));
        const urls = settled.filter(Boolean);
        if (!urls.length) return;
        openSendPhotos(urls, async (imgs, caption) => {
          try {
            await deliver(caption, imgs);
          } catch (e) {
            toast(e.message, "err");
          }
        });
      } catch (e) {
        toast(e.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E", "err");
      }
    });
    (_b = document.getElementById("chatBack")) == null ? void 0 : _b.addEventListener("click", (e) => {
      e.preventDefault();
      stopChatSub();
      if (chatBackTo) {
        const to = chatBackTo;
        chatBackTo = null;
        go(to);
        return;
      }
      go(chatsListScreen());
    });
  }

  // app/screens/confirm.js
  var order = null;
  function openConfirm(o) {
    order = o;
    go("confirm");
  }
  function initConfirm() {
    document.getElementById("confirmBtn").addEventListener("click", async () => {
      const btn = document.getElementById("confirmBtn");
      btn.disabled = true;
      btn.textContent = "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u043C\u2026";
      try {
        await confirmOrder(order.id);
        sendPush("order_completed", order);
        toast("\u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u0417\u0430\u043A\u0430\u0437 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D");
        go("orders");
      } catch (e) {
        toast(e.message, "err");
      } finally {
        btn.disabled = false;
        btn.textContent = "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435";
      }
    });
    document.getElementById("confirmComplaint").addEventListener("click", () => openSupportChat());
    onShow("confirm", () => {
      if (!order) {
        go("orders");
        return;
      }
      const qty = order.category === "material" ? `${order.quantity || ""} \u043C\xB3` : order.category === "equipment" ? `${order.rental_hours || ""} \u0447` : `${order.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
      document.getElementById("confirmSummary").innerHTML = `
      <div class="ar-ric"><i class="fa-solid fa-cubes-stacked"></i></div>
      <div style="flex:1;"><div style="font-size:14px;font-weight:800;">${esc(order.product)}${order.fraction ? ", " + esc(order.fraction) : ""}, ${qty}</div>
      <div class="ar-rsub">${esc(order.address || "\u0430\u0434\u0440\u0435\u0441 \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F")}</div></div>
      <div class="ar-price">${money(order.total_price)}</div>`;
    });
  }

  // app/realtime.js
  var channel = null;
  var rebuildScheduled = false;
  var bindings = /* @__PURE__ */ new Map();
  function rebuild() {
    if (channel) {
      try {
        supabase.removeChannel(channel);
      } catch (e) {
      }
    }
    channel = supabase.channel("app-rt");
    bindings.forEach((b) => {
      const opts = { event: "*", schema: "public", table: b.table };
      if (b.filter) opts.filter = b.filter;
      channel.on("postgres_changes", opts, (payload) => {
        b.listeners.forEach((fn) => {
          try {
            fn(payload);
          } catch (e) {
          }
        });
      });
    });
    channel.subscribe();
  }
  function scheduleRebuild() {
    if (rebuildScheduled) return;
    rebuildScheduled = true;
    queueMicrotask(() => {
      rebuildScheduled = false;
      rebuild();
    });
  }
  function onTable(table, cb, filter = null) {
    const key = table + "|" + (filter || "*");
    let b = bindings.get(key);
    if (!b) {
      b = { table, filter, listeners: /* @__PURE__ */ new Set() };
      bindings.set(key, b);
      scheduleRebuild();
    }
    b.listeners.add(cb);
    return () => b.listeners.delete(cb);
  }
  function debounce(fn, ms = 350) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  // app/screens/order-detail.js
  function avaCircle(avatarUrl, name, size = 44) {
    const s = `width:${size}px;height:${size}px;`;
    if (avatarUrl) return `<div class="ar-ava" style="${s}overflow:hidden;"><img src="${avatarUrl}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>`;
    return `<div class="ar-ava" style="${s}">${esc(((name || "?").trim()[0] || "?").toUpperCase())}</div>`;
  }
  var order2 = null;
  var detailTimerStop = null;
  function deliveryMs(o) {
    if (!o.delivery_date || !/^\d{4}-\d{2}-\d{2}/.test(o.delivery_date)) return null;
    const time = (o.delivery_time || "23:59").slice(0, 5);
    const dt = /* @__PURE__ */ new Date(`${o.delivery_date}T${time}`);
    return isNaN(dt) ? null : dt.getTime();
  }
  function openOrderDetail(o) {
    order2 = o;
    go("order-detail");
  }
  var STEPS = [
    { title: "\u0417\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D", icon: "fa-solid fa-check" },
    { title: "\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043D\u0430\u0439\u0434\u0435\u043D", icon: "fa-solid fa-check" },
    { title: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", icon: "fa-solid fa-truck" },
    { title: "\u0417\u0430\u0432\u0435\u0440\u0448\u0451\u043D", icon: "fa-regular fa-flag" }
  ];
  function stageOf(status) {
    if (["completed", "done"].includes(status)) return 4;
    if (status === "awaiting_confirmation") return 3;
    if (["taken", "in_progress"].includes(status)) return 2;
    return 1;
  }
  function timeStr(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
  async function render2() {
    const body = document.getElementById("orderDetailBody");
    const execAvatar = order2.executor_id ? await getUserAvatar(order2.executor_id) : null;
    const [label, cls] = statusLabel(order2.status);
    document.getElementById("orderDetailPill").className = "ar-pill " + cls;
    document.getElementById("orderDetailPill").innerHTML = `<span class="ar-pdot"></span>${label}`;
    document.getElementById("orderDetailNum").textContent = orderCode(order2.display_id);
    const stage = stageOf(order2.status);
    const cancelled = order2.status === "cancelled";
    const steps = STEPS.map((s, i) => {
      let state2 = i < stage ? "done" : i === stage ? "now" : "next";
      let title = s.title;
      if (i === 1 && order2.status === "new") {
        title = "\u0418\u0449\u0435\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430";
      }
      const last = i === STEPS.length - 1;
      return `
      <div class="ar-step ${state2}">
        <div class="ar-snode"><div class="ar-sdot"><i class="${s.icon}"></i></div>${last ? "" : '<div class="ar-sline"></div>'}</div>
        <div style="padding-bottom:${last ? 4 : 16}px;">
          <div style="font-size:14px;font-weight:800;color:${state2 === "next" ? "var(--ink-3)" : "var(--ink)"};">${title}</div>
          <div class="ar-sub" style="font-size:12px;">${i === 0 ? timeStr(order2.created_at) : i === 1 && order2.executor_name ? order2.executor_name : ""}</div>
        </div>
      </div>`;
    }).join("");
    const qty = order2.category === "material" ? `${order2.quantity || ""} \u043C\xB3` : order2.category === "equipment" ? `${order2.rental_hours || ""} \u0447` : `${order2.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
    const cashPay = order2.payment_method === "cash";
    const chatOpen = ["taken", "in_progress", "awaiting_confirmation"].includes(order2.status);
    const partnerCard = order2.executor_id ? `<div class="ar-card" style="padding:14px 16px;display:flex;align-items:center;gap:13px;">
         ${avaCircle(execAvatar, order2.executor_name || "\u041F")}
         <div style="flex:1;"><div style="font-size:14.5px;font-weight:800;">${esc(order2.executor_name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440")}</div>
         <div class="ar-sub" style="font-size:12px;">\u0432\u0430\u0448 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0443</div></div>
         ${chatOpen ? `<button class="ar-btn ar-sm" id="orderChatBtn" style="width:auto;padding:0 16px;gap:7px;"><i class="fa-regular fa-comment"></i>\u0427\u0430\u0442</button>` : ""}
       </div>` : `<div class="ar-card" style="padding:14px 16px;display:flex;align-items:center;gap:12px;">
         <div class="ar-ric"><i class="fa-solid fa-magnifying-glass"></i></div>
         <div class="ar-sub" style="font-size:12.5px;">\u0418\u0449\u0435\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u2014 \u043E\u0431\u044B\u0447\u043D\u043E \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442.</div>
       </div>`;
    body.innerHTML = `
    <div class="ar-card" style="padding:16px 16px 2px;">${steps}</div>
    ${partnerCard}
    <div class="ar-card">
      <div class="ar-row">
        <div class="ar-ric"><i class="fa-solid fa-cubes-stacked"></i></div>
        <div style="flex:1;"><div>${esc(order2.product)}${order2.fraction ? ", " + esc(order2.fraction) : ""}, ${qty}</div><div class="ar-rsub">${esc(order2.address || "\u0430\u0434\u0440\u0435\u0441 \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F")}</div></div>
        <div class="ar-price">${money(order2.total_price)}</div>
      </div>
      <div class="ar-row">
        <div class="ar-ric" style="background:${cashPay ? "var(--green-tint)" : "#eaf0fb"};color:${cashPay ? "var(--green)" : "#2b5fb0"};"><i class="fa-solid ${cashPay ? "fa-money-bill-wave" : "fa-credit-card"}"></i></div>
        <div style="flex:1;"><div style="font-weight:700;">${cashPay ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442"}</div><div class="ar-rsub">${cashPay ? "\u043E\u043F\u043B\u0430\u0442\u0430 \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u043F\u0440\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435" : "\u043E\u043F\u043B\u0430\u0442\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0443"}</div></div>
      </div>
    </div>
    <div style="margin-top:auto;padding:10px 0 36px;display:flex;flex-direction:column;gap:10px;">
      ${order2.status === "awaiting_confirmation" ? `<button class="ar-btn" id="confirmDoneBtn">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435</button>` : ""}
      ${order2.status === "new" ? `<div id="autoExpire" class="ar-sub" style="text-align:center;font-size:11.5px;"></div>
           <div id="cancelOrder" style="text-align:center;font-size:13px;font-weight:700;color:var(--ink-3);cursor:pointer;">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</div>` : ["taken", "in_progress"].includes(order2.status) ? `<div class="ar-sub" style="text-align:center;font-size:11.5px;">\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u0443\u0436\u0435 \u0432\u0437\u044F\u043B \u0437\u0430\u043A\u0430\u0437 \u2014 \u043E\u0442\u043C\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430</div>` : ""}
    </div>`;
    const chatBtn = document.getElementById("orderChatBtn");
    if (chatBtn) chatBtn.addEventListener("click", () => openOrderChat(order2));
    const confirmDoneBtn = document.getElementById("confirmDoneBtn");
    if (confirmDoneBtn) confirmDoneBtn.addEventListener("click", () => openConfirm(order2));
    const cancelBtn = document.getElementById("cancelOrder");
    if (cancelBtn) cancelBtn.addEventListener("click", async () => {
      if (!confirm("\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437?")) return;
      const { data: data2, error } = await supabase.from("orders").update({ status: "cancelled", cancelled_by: "customer", cancelled_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", order2.id).eq("status", "new").select("id");
      if (error) {
        toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C", "err");
        return;
      }
      if (!data2 || !data2.length) {
        toast("\u0417\u0430\u043A\u0430\u0437 \u0443\u0436\u0435 \u0432\u0437\u044F\u0442 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u043C \u2014 \u043E\u0442\u043C\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430", "err");
        return;
      }
      toast("\u0417\u0430\u043A\u0430\u0437 \u043E\u0442\u043C\u0435\u043D\u0451\u043D");
      back();
    });
    if (detailTimerStop) {
      detailTimerStop();
      detailTimerStop = null;
    }
    if (order2.status === "new") {
      const dms = deliveryMs(order2);
      const expEl = document.getElementById("autoExpire");
      if (dms && expEl) {
        detailTimerStop = countdown(expEl, dms + 15 * 60 * 1e3, {
          prefix: "\u0410\u0432\u0442\u043E\u043E\u0442\u043C\u0435\u043D\u0430, \u0435\u0441\u043B\u0438 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0451\u0442\u0441\u044F: ",
          onZero: async () => {
            if (detailTimerStop) {
              detailTimerStop();
              detailTimerStop = null;
            }
            if (currentScreen() !== "order-detail") return;
            await expireStaleOrders();
            toast("\u0417\u0430\u043A\u0430\u0437 \u043E\u0442\u043C\u0435\u043D\u0451\u043D \u2014 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", "err");
            back();
          }
        });
      } else if (expEl) {
        expEl.textContent = "\u0418\u0449\u0435\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u2026";
      }
    }
  }
  var _detailRtSetup = false;
  function setupDetailRealtime() {
    var _a;
    if (_detailRtSetup || !((_a = state.user) == null ? void 0 : _a.id)) return;
    _detailRtSetup = true;
    const rtRefresh = debounce(async () => {
      if (currentScreen() !== "order-detail" || !order2) return;
      try {
        const { data: data2 } = await supabase.from("orders").select("*").eq("id", order2.id).maybeSingle();
        if (data2 && (data2.status !== order2.status || data2.executor_id !== order2.executor_id)) {
          order2 = data2;
          render2();
        }
      } catch (e) {
      }
    }, 250);
    onTable("orders", (payload) => {
      const row = payload.new || payload.old || {};
      if (order2 && row.id === order2.id) rtRefresh();
    }, "customer_id=eq." + state.user.id);
  }
  function initOrderDetail() {
    onShow("order-detail", () => {
      if (!order2) {
        go("orders");
        return;
      }
      setupDetailRealtime();
      render2();
    });
  }

  // app/screens/orders.js
  var tab = "active";
  var allOrders = [];
  function orderCard(o) {
    const [label, cls] = statusLabel(o.status);
    const qty = o.category === "material" ? `${o.quantity || ""} \u043C\xB3` : o.category === "equipment" ? `${o.rental_hours || ""} \u0447` : `${o.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
    const date = o.created_at ? new Date(o.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) : "";
    const el = document.createElement("div");
    el.className = "ar-card";
    el.style.cssText = "padding:14px 16px;cursor:pointer;";
    el.addEventListener("click", () => openOrderDetail(o));
    el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
      <span class="ar-mono" style="font-size:12px;color:var(--ink-3);">${orderCode(o.display_id)}</span>
      <span class="ar-pill ${cls}"><span class="ar-pdot"></span>${label}</span>
    </div>
    <div style="font-weight:800;font-size:15px;margin-top:8px;">${esc(o.product || "")}${o.fraction ? " \xB7 " + esc(o.fraction) : ""}</div>
    <div class="ar-sub" style="font-size:12.5px;margin-top:2px;">${qty} \xB7 ${esc(o.address || "\u0430\u0434\u0440\u0435\u0441 \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F")}</div>
    <div class="ar-hr" style="margin:12px 0;"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <span class="ar-sub" style="font-size:12px;">${date}</span>
      <span class="ar-price" style="font-size:16px;color:var(--ink);">${money(o.total_price)}</span>
    </div>`;
    return el;
  }
  function render3(quiet = false) {
    const list = document.getElementById("ordersList");
    document.querySelectorAll("#ordersSeg > div").forEach((d) => d.classList.toggle("is-on", d.getAttribute("data-otab") === tab));
    const items = allOrders.filter((o) => STATUS_GROUP[tab].includes(o.status));
    list.innerHTML = "";
    if (!items.length) {
      const labels = { active: "\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445", completed: "\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0445", cancelled: "\u043E\u0442\u043C\u0435\u043D\u0451\u043D\u043D\u044B\u0445" };
      list.innerHTML = `
      <div style="text-align:center;padding:44px 0;color:var(--ink-3);">
        <i class="fa-regular fa-clipboard" style="font-size:32px;opacity:.4;"></i>
        <div style="margin-top:12px;font-weight:700;color:var(--ink-2);">\u041D\u0435\u0442 ${labels[tab]} \u0437\u0430\u043A\u0430\u0437\u043E\u0432</div>
      </div>`;
      return;
    }
    items.forEach((o) => list.appendChild(orderCard(o)));
    if (!quiet) staggerIn(list);
  }
  function initOrders() {
    var _a;
    (_a = document.getElementById("ordersSeg")) == null ? void 0 : _a.addEventListener("click", (e) => {
      const d = e.target.closest("[data-otab]");
      if (!d) return;
      tab = d.getAttribute("data-otab");
      render3();
    });
    let rtSetup = false;
    const setupRt = () => {
      var _a2;
      if (rtSetup || !((_a2 = state.user) == null ? void 0 : _a2.id)) return;
      rtSetup = true;
      const rtRefresh = debounce(async () => {
        if (currentScreen() !== "orders") return;
        try {
          allOrders = await listMyOrders();
          render3(true);
        } catch (e) {
        }
      }, 300);
      onTable("orders", rtRefresh, "customer_id=eq." + state.user.id);
    };
    onShow("orders", async () => {
      setupRt();
      const list = document.getElementById("ordersList");
      list.innerHTML = Array.from({ length: 3 }).map(() => `
      <div class="ar-card" style="padding:14px 16px;">
        <div class="ar-skel" style="height:12px;width:38%;"></div>
        <div class="ar-skel" style="height:15px;width:68%;margin-top:10px;"></div>
        <div class="ar-skel" style="height:12px;width:54%;margin-top:8px;"></div>
        <div class="ar-hr" style="margin:12px 0;"></div>
        <div class="ar-skel" style="height:14px;width:32%;"></div>
      </div>`).join("");
      try {
        allOrders = await listMyOrders();
      } catch (e) {
        toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B", "err");
        allOrders = [];
      }
      render3();
    });
  }

  // app/api/profile.js
  async function getProfile() {
    if (!state.user) return null;
    const { data: data2 } = await supabase.from("user_profiles").select("name, avatar_url").eq("user_id", state.user.id).maybeSingle();
    return data2 || null;
  }
  async function saveAvatar(url) {
    const uid = state.user.id;
    const { data: upd, error: updErr } = await supabase.from("user_profiles").update({ avatar_url: url }).eq("user_id", uid).select("user_id");
    if (updErr) throw new Error(updErr.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E");
    if (!upd || upd.length === 0) {
      const name = state.user.name || "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C";
      const { error: insErr } = await supabase.from("user_profiles").insert({ user_id: uid, name, avatar_url: url });
      if (insErr) throw new Error(insErr.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E");
    }
    state.user.avatar_url = url;
  }

  // app/api/partner.js
  async function submitApplication({ full_name, phone, legal_status, legal_name, passport, equipment_number, pts, passport_photo, pts_photo }) {
    var _a;
    const { data: data2, error } = await supabase.rpc("submit_partner_application", {
      p_full_name: full_name,
      p_phone: phone,
      p_legal_status: legal_status,
      p_legal_name: legal_name || null,
      p_user_id: ((_a = state.user) == null ? void 0 : _a.id) || null,
      p_passport: passport || null,
      p_equipment_number: equipment_number || null,
      p_pts: pts || null,
      p_passport_photo: passport_photo || null,
      p_pts_photo: pts_photo || null
    });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443");
    const r = Array.isArray(data2) ? data2[0] : data2;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443");
    return r;
  }
  async function getPartnerProfile() {
    if (!state.user) return null;
    const { data: data2 } = await supabase.from("partner_profiles").select("*").eq("user_id", state.user.id).maybeSingle();
    return data2 || null;
  }
  async function listTariffs() {
    const { data: data2, error } = await supabase.rpc("list_connection_tariffs");
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0442\u0430\u0440\u0438\u0444\u044B");
    return data2 || [];
  }
  async function listMyVehicles() {
    if (!state.user) return [];
    const { data: data2, error } = await supabase.rpc("partner_list_vehicles", { p_user_id: state.user.id });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442");
    return data2 || [];
  }
  async function addVehicle({ tariff_id, reg_number, pts, pts_photo }) {
    var _a;
    const { data: data2, error } = await supabase.rpc("partner_add_vehicle", {
      p_user_id: ((_a = state.user) == null ? void 0 : _a.id) || null,
      p_tariff_id: tariff_id,
      p_reg_number: reg_number,
      p_pts: pts || null,
      p_pts_photo: pts_photo || null
    });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442");
    const r = Array.isArray(data2) ? data2[0] : data2;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C");
    return r;
  }
  var LS_PAY = "almanirent_pay_id";
  async function payVehicle(vehicleId) {
    var _a;
    const res = await fetch("/api/pay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_id: vehicleId, user_id: ((_a = state.user) == null ? void 0 : _a.id) || null })
    });
    const data2 = await res.json().catch(() => ({}));
    if (!res.ok || !data2.confirmation_url) throw new Error(data2.error || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043B\u0430\u0442\u0451\u0436");
    try {
      localStorage.setItem(LS_PAY, data2.payment_id || "");
    } catch (e) {
    }
    window.location.href = data2.confirmation_url;
  }
  async function reconcilePayments() {
    var _a;
    if (!((_a = state.user) == null ? void 0 : _a.id)) return 0;
    try {
      const res = await fetch("/api/pay/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: state.user.id })
      });
      const data2 = await res.json().catch(() => ({}));
      return data2.activated || 0;
    } catch (e) {
      return 0;
    }
  }
  async function checkPendingPayment() {
    let pid = "";
    try {
      pid = localStorage.getItem(LS_PAY) || "";
    } catch (e) {
    }
    if (!pid) return false;
    try {
      const res = await fetch("/api/pay/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_id: pid })
      });
      const data2 = await res.json().catch(() => ({}));
      if (data2.paid) {
        try {
          localStorage.removeItem(LS_PAY);
        } catch (e) {
        }
        return true;
      }
    } catch (e) {
    }
    return false;
  }
  function requiredVehicleType(o) {
    return o.category === "material" ? "\u0421\u0430\u043C\u043E\u0441\u0432\u0430\u043B" : o.product;
  }
  var _lastExpire = 0;
  async function listAvailableOrders(vehicleTypes = null) {
    if (Date.now() - _lastExpire > 6e4) {
      _lastExpire = Date.now();
      supabase.rpc("expire_stale_orders").then(() => {
      }, () => {
      });
    }
    const { data: data2, error } = await supabase.from("orders").select("*").eq("status", "new").is("executor_id", null).order("created_at", { ascending: false });
    if (error) throw error;
    let rows = data2 || [];
    if (Array.isArray(vehicleTypes)) {
      const types = new Set(vehicleTypes);
      rows = rows.filter((o) => types.has(requiredVehicleType(o)));
    }
    return rows;
  }
  async function takeOrder(orderId) {
    var _a;
    const { data: data2, error } = await supabase.rpc("partner_take_order", { p_user_id: ((_a = state.user) == null ? void 0 : _a.id) || null, p_order_id: orderId });
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u0437\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437");
    const r = Array.isArray(data2) ? data2[0] : data2;
    if (!r || r.success === false) throw new Error((r == null ? void 0 : r.message) || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u0437\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437");
    return r;
  }
  function vehicleSlots(vehicles, orders) {
    const paid = (vehicles || []).filter((v) => v.status === "approved" && v.is_paid).length;
    const active = (orders || []).filter((o) => ["taken", "in_progress", "awaiting_confirmation"].includes(o.status)).length;
    return { paid, active, canTake: paid > active };
  }
  async function cancelTakenOrder(orderId) {
    const { data: data2, error } = await supabase.from("orders").update({ status: "new", executor_id: null, executor_name: null, executor_phone: null, taken_at: null, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", orderId).eq("executor_id", state.user.id).in("status", ["taken", "in_progress"]).select("id");
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437");
    if (!data2 || !data2.length) throw new Error("\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u043B\u0435\u043D\u0442\u0443");
  }
  async function completeOrder(orderId) {
    const { data: data2, error } = await supabase.from("orders").update({ status: "awaiting_confirmation", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", orderId).eq("executor_id", state.user.id).in("status", ["taken", "in_progress"]).select("id");
    if (error) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437");
    if (!data2 || !data2.length) throw new Error("\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u043B\u0435\u043D\u0442\u0443");
  }
  async function listMyPartnerOrders() {
    if (!state.user) return [];
    const { data: data2, error } = await supabase.from("orders").select("*").eq("executor_id", state.user.id).order("created_at", { ascending: false });
    if (error) throw error;
    return data2 || [];
  }
  function earningsFrom(orders) {
    const done = orders.filter((o) => ["completed", "done"].includes(o.status));
    const sum = (arr) => arr.reduce((s, o) => s + (Number(o.partner_price) || 0), 0);
    const cash = sum(done.filter((o) => o.payment_method === "cash"));
    const cashless = sum(done.filter((o) => o.payment_method !== "cash"));
    const active = orders.filter((o) => ["taken", "in_progress"].includes(o.status)).length;
    return { cashless, cash, total: cashless + cash, doneCount: done.length, activeCount: active };
  }

  // app/screens/profile.js
  var pushOn = () => pushEnabled() && (typeof Notification === "undefined" || Notification.permission === "granted");
  function openNotifySettings() {
    const needsInstall = pushNeedsInstall();
    const render4 = () => {
      const on = pushOn();
      const hint = needsInstall ? `<div class="ar-deliv-info out" style="margin-top:12px;align-items:flex-start;">
           <i class="fa-brands fa-apple" style="margin-top:1px;"></i>
           <div>\u041D\u0430 iPhone \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438.<br>
           \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043C\u0435\u043D\u044E <b>\xAB\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F\xBB</b> \u0432 Safari \u2192 <b>\xAB\u041D\u0430 \u044D\u043A\u0440\u0430\u043D \u0414\u043E\u043C\u043E\u0439\xBB</b>, \u0437\u0430\u0442\u0435\u043C \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 AlmaniRent \u0441 \u044D\u043A\u0440\u0430\u043D\u0430 \u0438 \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0434\u0435\u0441\u044C.</div></div>` : "";
      return `
      <div class="ar-taprow" id="nsMain"${needsInstall ? ' style="opacity:.55;"' : ""}>
        <div class="ar-ric"><i class="fa-regular fa-bell"></i></div>
        <div style="flex:1;"><div style="font-weight:700;font-size:13.5px;">${on ? "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B" : "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u044B"}</div><div class="ar-rsub">${on ? "\u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435" : "\u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C"}</div></div>
        <div class="adm-toggle${on ? " on" : ""}"></div></div>${hint}`;
    };
    openModal({
      title: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
      bodyHTML: render4(),
      onMount: (el) => {
        const bind = () => el.querySelector("#nsMain").addEventListener("click", async () => {
          if (!pushSupported()) {
            toast("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B: \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0430\u0439\u0442 \u043F\u043E https", "err");
            return;
          }
          if (pushNeedsInstall()) {
            toast("\u041D\u0430 iPhone: \xAB\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F\xBB \u2192 \xAB\u041D\u0430 \u044D\u043A\u0440\u0430\u043D \u0414\u043E\u043C\u043E\u0439\xBB, \u0437\u0430\u0442\u0435\u043C \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0442\u0443\u0442", "err");
            return;
          }
          if (pushOn()) {
            await disablePush();
            toast("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u044B");
            el.innerHTML = render4();
            bind();
            return;
          }
          let permPromise = null;
          if (typeof Notification !== "undefined" && Notification.permission !== "granted") permPromise = requestNotifyPermission();
          try {
            const perm = permPromise ? await permPromise : "granted";
            await enablePush(perm);
            toast("\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B");
          } catch (e) {
            toast(e.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u043A\u043B\u044E\u0447\u0438\u0442\u044C", "err");
          }
          el.innerHTML = render4();
          bind();
        });
        bind();
      },
      actions: []
    });
  }
  function wireNotifyToggle(toggleId, rowId) {
    const target = document.getElementById(rowId) || document.getElementById(toggleId);
    if (!target || target._notifyWired) return;
    target._notifyWired = true;
    target.addEventListener("click", () => openNotifySettings());
  }
  function renderAvatar(name) {
    var _a;
    const avaEl = document.getElementById("profileAvatar");
    if ((_a = state.user) == null ? void 0 : _a.avatar_url) {
      avaEl.innerHTML = `<img src="${state.user.avatar_url}" alt="">`;
    } else {
      avaEl.textContent = (name.trim()[0] || "\xB7").toUpperCase();
    }
    avaEl.classList.add("ar-ava-edit");
    if (!avaEl.querySelector(".ar-ava-cam")) {
      const cam = document.createElement("span");
      cam.className = "ar-ava-cam";
      cam.innerHTML = `<i class="fa-solid fa-camera"></i>`;
      avaEl.appendChild(cam);
    }
  }
  async function pickAvatar(name) {
    const [file] = await pickFiles({ accept: "image/*" });
    if (!file) return;
    try {
      const url = await uploadImage("avatars", file, { max: 512 });
      await saveAvatar(url);
      toast("\u0424\u043E\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E");
      renderAvatar(name);
    } catch (e) {
      toast(e.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E", "err");
    }
  }
  function initProfile() {
    onShow("profile", async () => {
      const user = state.user;
      const nameEl = document.getElementById("profileName");
      const phoneEl = document.getElementById("profilePhone");
      const avaEl = document.getElementById("profileAvatar");
      const adminCard = document.getElementById("adminCard");
      if (!user) return;
      phoneEl.textContent = formatPhone(user.phone);
      adminCard.style.display = isAdmin() ? "flex" : "none";
      wireNotifyToggle("notifyToggle", "rowNotify");
      const rowBecome = document.getElementById("rowBecomePartner");
      const rowCabinet = document.getElementById("rowPartnerCabinet");
      let isPartner = false;
      try {
        const pp = await getPartnerProfile();
        isPartner = !!(pp && ["active", "blocked"].includes(pp.status));
      } catch (e) {
        isPartner = false;
      }
      if (rowBecome) rowBecome.style.display = isPartner ? "none" : "flex";
      if (rowCabinet) rowCabinet.style.display = isPartner ? "flex" : "none";
      let name = user.name || "";
      const prof = await getProfile();
      if (prof) {
        if (prof.name) name = prof.name;
        if (prof.avatar_url) state.user.avatar_url = prof.avatar_url;
      }
      if (!name) name = "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C";
      nameEl.textContent = name;
      renderAvatar(name);
      avaEl.onclick = () => openAccountMenu(name);
    });
  }
  function openAccountMenu(name) {
    var _a;
    openModal({
      title: "\u0410\u043A\u043A\u0430\u0443\u043D\u0442",
      bodyHTML: `
      <div class="ar-taplist">
        <div class="ar-taprow" id="amPhoto"><div class="ar-ric"><i class="fa-solid fa-camera"></i></div><div style="flex:1;font-weight:700;font-size:13.5px;">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E</div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
        <div class="ar-taprow" id="amEmail"><div class="ar-ric"><i class="fa-regular fa-envelope"></i></div><div style="flex:1;"><div style="font-weight:700;font-size:13.5px;">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C e-mail</div><div class="ar-rsub">${((_a = state.user) == null ? void 0 : _a.email) || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"}</div></div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
        <div class="ar-taprow" id="amPass"><div class="ar-ric"><i class="fa-solid fa-key"></i></div><div style="flex:1;font-weight:700;font-size:13.5px;">\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
      </div>`,
      onMount: (el, close) => {
        el.querySelector("#amPhoto").addEventListener("click", () => {
          close();
          pickAvatar(name);
        });
        el.querySelector("#amEmail").addEventListener("click", () => {
          close();
          setTimeout(openChangeEmail, 280);
        });
        el.querySelector("#amPass").addEventListener("click", () => {
          close();
          setTimeout(openChangePassword, 280);
        });
      },
      actions: []
    });
  }
  function openChangeEmail() {
    var _a;
    openModal({
      title: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C e-mail",
      bodyHTML: `
      <div><div class="ar-flabel">\u041D\u043E\u0432\u044B\u0439 e-mail</div>
        <div class="ar-field"><i class="fa-regular fa-envelope"></i><input id="ceEmail" type="email" autocomplete="email" placeholder="you@example.com" value="${((_a = state.user) == null ? void 0 : _a.email) || ""}"></div></div>`,
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        const email = document.getElementById("ceEmail").value.trim();
        if (!email) {
          toast("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 e-mail", "err");
          return true;
        }
        try {
          await changeEmail(email);
          toast("E-mail \u0438\u0437\u043C\u0435\u043D\u0451\u043D");
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  function openChangePassword() {
    openModal({
      title: "\u0421\u043C\u0435\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div><div class="ar-flabel">\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</div><div class="ar-field"><input id="cpOld" type="password" autocomplete="current-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022"></div></div>
        <div><div class="ar-flabel">\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</div><div class="ar-field"><input id="cpNew" type="password" autocomplete="new-password" placeholder="\u043D\u0435 \u043C\u0435\u043D\u0435\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"></div></div>
        <div><div class="ar-flabel">\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439</div><div class="ar-field"><input id="cpNew2" type="password" autocomplete="new-password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022"></div></div>
      </div>`,
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        const oldP = document.getElementById("cpOld").value;
        const newP = document.getElementById("cpNew").value;
        const newP2 = document.getElementById("cpNew2").value;
        if (!oldP || !newP) {
          toast("\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043E\u043B\u044F", "err");
          return true;
        }
        if (newP.length < 6) {
          toast("\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u043A\u043E\u0440\u043E\u0447\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432", "err");
          return true;
        }
        if (newP !== newP2) {
          toast("\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442", "err");
          return true;
        }
        try {
          await changePassword(oldP, newP);
          toast("\u041F\u0430\u0440\u043E\u043B\u044C \u0438\u0437\u043C\u0435\u043D\u0451\u043D");
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }

  // app/screens/become-partner.js
  var legal = "self_employed";
  var passportPhoto = null;
  function photoPreview(prevId, url) {
    const prev = document.getElementById(prevId);
    if (prev) prev.innerHTML = url ? `<img src="${url}" style="max-height:120px;max-width:100%;border-radius:10px;margin-top:8px;display:block;"><div class="ar-sub" style="font-size:11px;margin-top:4px;color:var(--green);">\u2713 \u0444\u043E\u0442\u043E \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043E</div>` : "";
  }
  function wirePhotoBtn(btnId, prevId, setter) {
    const btn = document.getElementById(btnId);
    if (!btn || btn._wired) return;
    btn._wired = true;
    btn.addEventListener("click", async () => {
      const [file] = await pickFiles({ accept: "image/*" });
      if (!file) return;
      try {
        const url = await uploadImage("docs", file);
        setter(url);
        photoPreview(prevId, url);
      } catch (e) {
        toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0444\u043E\u0442\u043E", "err");
      }
    });
  }
  function initBecomePartner() {
    const root = document.querySelector('[data-screen="become-partner"]');
    root.addEventListener("click", (e) => {
      const opt = e.target.closest("[data-legal]");
      if (opt) {
        legal = opt.getAttribute("data-legal");
        root.querySelectorAll("[data-legal]").forEach((o) => o.classList.toggle("is-on", o === opt));
      }
    });
    document.getElementById("bpSubmit").addEventListener("click", async () => {
      const name = document.getElementById("bpName").value.trim();
      const phone = document.getElementById("bpPhone").value.trim();
      const legalName = document.getElementById("bpLegalName").value.trim();
      const passport = document.getElementById("bpPassport").value.trim();
      if (!name) return toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0424\u0418\u041E", "err");
      if (!phone) return toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D", "err");
      if (!passport) return toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", "err");
      if (!passportPhoto) return toast("\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430", "err");
      const btn = document.getElementById("bpSubmit");
      btn.disabled = true;
      btn.textContent = "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u2026";
      try {
        await submitApplication({
          full_name: name,
          phone,
          legal_status: legal,
          legal_name: legal === "self_employed" ? null : legalName,
          passport,
          passport_photo: passportPhoto
        });
        toast("\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u2014 \u0435\u0451 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442 \u043C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440");
        go("profile");
      } catch (e) {
        toast(e.message, "err");
      } finally {
        btn.disabled = false;
        btn.textContent = "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443";
      }
    });
    onShow("become-partner", () => {
      var _a;
      const phone = document.getElementById("bpPhone");
      if (phone && !phone.value && ((_a = state.user) == null ? void 0 : _a.phone)) phone.value = formatPhone(state.user.phone);
      wirePhotoBtn("bpPassportPhotoBtn", "bpPassportPhotoPrev", (u) => {
        passportPhoto = u;
      });
    });
  }

  // app/screens/partner.js
  var activeOrder = null;
  var activeTimerStop = null;
  var myOrdersCache = [];
  var pMap = null;
  function setRolePartner() {
    state.role = "partner";
    try {
      localStorage.setItem("almanirent_role", "partner");
    } catch (e) {
    }
  }
  function emptyBlock(icon, title, sub) {
    return `<div style="text-align:center;padding:42px 0;color:var(--ink-3);">
    <i class="fa-solid ${icon}" style="font-size:32px;opacity:.4;"></i>
    <div style="margin-top:12px;font-weight:700;color:var(--ink-2);">${title}</div>
    <div class="ar-sub" style="margin-top:4px;">${sub}</div></div>`;
  }
  function payoutRow(o) {
    const cash = o.payment_method === "cash";
    const date = o.updated_at ? new Date(o.updated_at).toLocaleDateString("ru-RU", { day: "2-digit", month: "long" }) : "";
    return `<div class="ar-row">
    <div class="ar-ric" style="background:${cash ? "var(--green-tint)" : "#eaf0fb"};color:${cash ? "var(--green)" : "#2b5fb0"};"><i class="${cash ? "fa-solid fa-ruble-sign" : "fa-regular fa-credit-card"}"></i></div>
    <div style="flex:1;"><div style="font-size:13.5px;">${cash ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442"} \xB7 ${orderCode(o.display_id)}</div><div class="ar-rsub">${date}</div></div>
    <span class="ar-mono" style="font-size:14px;color:var(--green);">+${money(o.partner_price)}</span></div>`;
  }
  async function renderCabinet() {
    setRolePartner();
    const top = document.getElementById("cabinetTop");
    const body = document.getElementById("cabinetBody");
    top.innerHTML = `<div style="padding:40px 0;text-align:center;color:rgba(255,255,255,.6);">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    let cabVehicles = [];
    try {
      [myOrdersCache, cabVehicles] = await Promise.all([listMyPartnerOrders(), listMyVehicles().catch(() => [])]);
    } catch (e2) {
      myOrdersCache = [];
    }
    const e = earningsFrom(myOrdersCache);
    const slots = vehicleSlots(cabVehicles, myOrdersCache);
    const monthName = (/* @__PURE__ */ new Date()).toLocaleString("ru-RU", { month: "long" });
    const sharePct = e.total ? Math.round(e.cashless / e.total * 100) : 0;
    top.innerHTML = `
    <div style="padding:calc(var(--safe-top) + 14px) 20px 0;">
      <img src="/assets/logo-white.png" alt="AlmaniRent" style="height:17px;display:block;">
    </div>
    <div style="padding:14px 20px 18px;">
      <div style="font-size:12.5px;font-weight:500;color:rgba(255,255,255,.6);">\u0417\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E \u0432 ${monthName}</div>
      <div class="ar-mono" id="cabTotal" style="font-size:32px;font-weight:600;margin-top:5px;">${money(e.total)}</div>
      <div style="display:flex;gap:18px;margin-top:8px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.6);">
        <span>${e.doneCount} \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E</span><span>${e.activeCount} \u0432 \u0440\u0430\u0431\u043E\u0442\u0435</span></div>
      <div class="ar-earn" style="margin-top:16px;">
        <div class="ar-earncard card"><div class="ar-elabel"><i class="fa-regular fa-credit-card ar-eico"></i>\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \xB7 \u043D\u0430 \u0441\u0447\u0451\u0442</div><div class="ar-eval">${money(e.cashless)}</div><div class="ar-esub">\u0431\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B</div></div>
        <div class="ar-earncard cash"><div class="ar-elabel"><i class="fa-solid fa-ruble-sign ar-eico"></i>\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435 \xB7 \u043D\u0430 \u0440\u0443\u043A\u0438</div><div class="ar-eval">${money(e.cash)}</div><div class="ar-esub">\u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u043F\u0440\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435</div></div>
      </div>
      <div style="margin-top:14px;">
        <div class="ar-bar" style="background:rgba(255,255,255,.12);">
          <span style="width:${sharePct}%;background:#7fb0ff;display:inline-block;height:100%;"></span>
          <span style="width:${100 - sharePct}%;background:#7be0a8;display:inline-block;height:100%;"></span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:7px;font-size:11px;font-weight:700;">
          <span style="color:#7fb0ff;">\u25CF \u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0435 ${sharePct}%</span><span style="color:#7be0a8;">\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435 ${100 - sharePct}% \u25CF</span></div>
      </div>
    </div>`;
    countTo(document.getElementById("cabTotal"), e.total, { format: (v) => money(Math.round(v)) });
    const connBanner = slots.paid === 0 ? accessBanner("fa-lock", "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0437\u0430\u043A\u0430\u0437\u0430\u043C \u0437\u0430\u043A\u0440\u044B\u0442", "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0438 \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", true) : accessBanner("fa-circle-check", `\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E \xB7 \u0441\u043B\u043E\u0442\u043E\u0432 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E ${Math.max(0, slots.paid - slots.active)}`, `\u041E\u043F\u043B\u0430\u0447\u0435\u043D\u043E \u043C\u0430\u0448\u0438\u043D: ${slots.paid}`, false);
    body.innerHTML = `
    ${connBanner}
    <div class="ar-flabel" style="margin-top:2px;">\u0417\u0430\u043A\u0430\u0437\u044B \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>
    <div class="ar-seg" id="cabPeriod">${PERIODS.map(([k, l]) => `<div class="${k === cabPeriod ? "is-on" : ""}" data-cp="${k}">${l}</div>`).join("")}</div>
    <div class="ar-card" style="padding:0;" id="cabOrders"></div>
    <div style="height:8px;"></div>`;
    drawCabinetOrders();
  }
  var PERIODS = [["today", "\u0414\u0435\u043D\u044C"], ["week", "\u041D\u0435\u0434\u0435\u043B\u044F"], ["month", "\u041C\u0435\u0441\u044F\u0446"], ["all", "\u0412\u0441\u0451"]];
  var cabPeriod = "month";
  function drawCabinetOrders() {
    const box = document.getElementById("cabOrders");
    if (!box) return;
    const done = myOrdersCache.filter((o) => ["completed", "done"].includes(o.status) && inPeriod(o.created_at, cabPeriod)).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    box.innerHTML = done.length ? done.map(payoutRow).join("") : `<div class="ar-sub" style="padding:16px;">\u041D\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>`;
    staggerIn(box);
  }
  function catBadge(cat) {
    const m = { material: ["\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B", "#eaf0fb", "#2b5fb0"], equipment: ["\u0442\u0435\u0445\u043D\u0438\u043A\u0430", "#fbf0e6", "#b26a1c"], service: ["\u0443\u0441\u043B\u0443\u0433\u0430", "#ece8fb", "#6a4fb0"] };
    const [t, bg, c] = m[cat] || ["\u0437\u0430\u043A\u0430\u0437", "#eee", "#555"];
    return `<span class="ar-catbadge" style="background:${bg};color:${c};">${t}</span>`;
  }
  function feedCard(o) {
    const qty = o.category === "material" ? `${o.quantity || ""} \u043C\xB3` : o.category === "equipment" ? `${o.rental_hours || ""} \u0447` : `${o.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
    const el = document.createElement("div");
    el.className = "ar-card";
    el.style.cssText = "padding:14px 16px;display:flex;flex-direction:column;gap:11px;cursor:pointer;";
    const isAvailable = o.status === "new";
    const [stLabel, stCls] = statusLabel(o.status);
    const right = isAvailable ? `<button class="ar-btn ar-sm" data-take="${o.id}" style="width:auto;padding:0 18px;">\u0412\u0437\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437</button>` : `<span class="ar-pill ${stCls}"><span class="ar-pdot"></span>${stLabel}</span>`;
    el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;">${catBadge(o.category)}
      <div style="font-size:15px;font-weight:800;flex:1;">${esc(o.product || "")}${o.fraction ? " " + esc(o.fraction) : ""} \xB7 ${qty}</div>
      <span class="ar-mono" style="font-size:11.5px;color:var(--ink-3);">${orderCode(o.display_id)}</span></div>
    <div class="ar-sub" style="font-size:12.5px;">${esc(o.address || "\u0430\u0434\u0440\u0435\u0441 \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F")}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div><div style="font-size:10px;font-weight:700;color:var(--ink-3);">\u0441\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430</div><span class="ar-mono" style="font-size:16px;">${money(o.partner_price)}</span></div>
      ${right}</div>`;
    el.addEventListener("click", (e) => {
      if (!e.target.closest("[data-take]")) openPActive(o);
    });
    return el;
  }
  var feedTab = "available";
  var feedAvailable = [];
  async function renderOrdersFeed(quiet = false) {
    setRolePartner();
    const list = document.getElementById("pOrdersList");
    if (!quiet) list.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    document.querySelectorAll("#pOrdersSeg > div").forEach((d) => d.classList.toggle("is-on", d.getAttribute("data-ptab2") === feedTab));
    let available = [], mine = [], vehicles = [];
    try {
      vehicles = await listMyVehicles().catch(() => []);
      const types = approvedVehicleTypes(vehicles);
      [available, mine] = await Promise.all([listAvailableOrders(types), listMyPartnerOrders()]);
      myOrdersCache = mine;
      feedAvailable = available;
    } catch (e) {
      if (!quiet) list.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B.</div>`;
      return;
    }
    const slots = vehicleSlots(vehicles, mine);
    const banner = document.getElementById("pFeedBanner");
    if (banner) {
      if (slots.paid === 0) {
        banner.innerHTML = accessBanner("fa-lock", "\u0417\u0430\u043A\u0430\u0437\u044B \u043C\u043E\u0436\u043D\u043E \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u043D\u043E \u043D\u0435 \u0431\u0440\u0430\u0442\u044C", "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0438 \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", true);
      } else if (!slots.canTake) {
        banner.innerHTML = accessBanner("fa-circle-info", "\u0412\u0441\u0435 \u0441\u043B\u043E\u0442\u044B \u0437\u0430\u043D\u044F\u0442\u044B", "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437 \u0438\u043B\u0438 \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0435\u0449\u0451 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442", false);
      } else {
        banner.innerHTML = accessBanner("fa-circle-check", `\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0441\u043B\u043E\u0442\u043E\u0432: ${slots.paid - slots.active}`, "\u041C\u043E\u0436\u043D\u043E \u0431\u0440\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B", false);
      }
    }
    const order3 = { taken: 0, in_progress: 0, awaiting_confirmation: 1, completed: 2, done: 2, cancelled: 3, expired: 3 };
    mine.sort((a, b) => {
      var _a, _b;
      return ((_a = order3[a.status]) != null ? _a : 9) - ((_b = order3[b.status]) != null ? _b : 9);
    });
    const av = document.getElementById("pAvailCount");
    if (av) av.textContent = available.length || "";
    const mc = document.getElementById("pMineCount");
    if (mc) mc.textContent = mine.length || "";
    const items = feedTab === "available" ? available : mine;
    list.innerHTML = "";
    if (!items.length) {
      list.innerHTML = feedTab === "available" ? emptyBlock("fa-box-open", "\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043D\u0435\u0442", "\u041D\u043E\u0432\u044B\u0435 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C") : emptyBlock("fa-clipboard-check", "\u0412\u044B \u043F\u043E\u043A\u0430 \u043D\u0435 \u0431\u0440\u0430\u043B\u0438 \u0437\u0430\u043A\u0430\u0437\u043E\u0432", "\u0412\u043E\u0437\u044C\u043C\u0438\u0442\u0435 \u0438\u0437 \xAB\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445\xBB");
      return;
    }
    items.forEach((o) => list.appendChild(feedCard(o)));
    if (!quiet) staggerIn(list);
  }
  var VSTAT = { pending: ["is-new", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"], approved: ["is-done", "\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D"], rejected: ["is-work", "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D"] };
  function accessBanner(icon, title, sub, warn) {
    const color = warn ? "var(--pink)" : "var(--ink-2)";
    const bg = warn ? "var(--pink-tint)" : "#eef0f4";
    return `<div class="ar-card" style="padding:12px 14px;display:flex;align-items:center;gap:12px;">
    <div style="width:34px;height:34px;border-radius:10px;background:${bg};color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fa-solid ${icon}"></i></div>
    <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:800;">${title}</div><div class="ar-sub" style="font-size:11.5px;">${sub}</div></div>
    <span style="font-size:12px;font-weight:700;color:var(--pink);white-space:nowrap;" data-nav="p-transport">\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u2192</span>
  </div>`;
  }
  function vehicleCard(v) {
    let [sc, sl] = VSTAT[v.status] || ["is-work", v.status];
    if (v.status === "approved" && !v.is_paid) {
      sc = "is-new";
      sl = "\u0436\u0434\u0451\u0442 \u043E\u043F\u043B\u0430\u0442\u044B";
    }
    const paidLabel = v.is_paid ? `\u043E\u043F\u043B\u0430\u0447\u0435\u043D\u043E \u0434\u043E ${new Date(v.paid_until).toLocaleDateString("ru-RU")}` : "\u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B";
    let payBtn = "";
    if (v.status === "approved" && !v.is_paid) {
      payBtn = `<button class="ar-btn ar-sm" data-pay-vehicle="${v.id}" style="width:auto;padding:0 16px;">\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C ${money(v.monthly_fee)}</button>`;
    }
    return `<div class="ar-card" style="padding:13px 15px;display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="font-size:14.5px;font-weight:800;flex:1;min-width:0;">${v.type_name || "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435"}${v.reg_number ? " \xB7 " + v.reg_number : ""}</div>
      <span class="ar-pill ${sc}" style="font-size:10px;">${sl}</span></div>
    <div class="ar-sub" style="font-size:12px;">${money(v.monthly_fee)}/\u043C\u0435\u0441 \xB7 ${v.is_paid ? '<span style="color:var(--green);font-weight:700;">' + paidLabel + "</span>" : paidLabel}</div>
    ${payBtn ? `<div style="display:flex;justify-content:flex-end;">${payBtn}</div>` : ""}
  </div>`;
  }
  async function renderTransport(quiet = false) {
    setRolePartner();
    const body = document.getElementById("pTransportBody");
    if (!quiet) {
      body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
      await reconcilePayments();
    }
    let vehicles = [], mine = myOrdersCache;
    try {
      [vehicles, mine] = await Promise.all([listMyVehicles(), listMyPartnerOrders().catch(() => myOrdersCache)]);
    } catch (e) {
    }
    myOrdersCache = mine;
    const slots = vehicleSlots(vehicles, mine);
    const rows = vehicles.length ? vehicles.map(vehicleCard).join("") : `<div class="ar-sub" style="padding:14px;">\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u043F\u043E\u043A\u0430 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D</div>`;
    body.innerHTML = `
    <div class="ar-card" style="padding:14px 16px;">
      <div style="font-size:13.5px;font-weight:800;">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430</div>
      <div class="ar-sub" style="font-size:12px;margin-top:5px;line-height:1.45;">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0430\u0448\u0438\u043D\u0443, \u0434\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C \u0438 \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u043F\u043B\u0430\u0442\u0451\u0436 \u0437\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435. \u0411\u0440\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B \u043C\u043E\u0436\u043D\u043E \u043F\u043E \u0447\u0438\u0441\u043B\u0443 \u043E\u043F\u043B\u0430\u0447\u0435\u043D\u043D\u044B\u0445 \u043C\u0430\u0448\u0438\u043D: 1 \u043C\u0430\u0448\u0438\u043D\u0430 \u2014 1 \u0437\u0430\u043A\u0430\u0437 \u043E\u0434\u043D\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E.</div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <div class="ar-card" style="flex:1;padding:10px 12px;background:var(--bg);border:0;"><div class="ar-sub" style="font-size:10.5px;">\u041E\u043F\u043B\u0430\u0447\u0435\u043D\u043E \u043C\u0430\u0448\u0438\u043D</div><div class="ar-mono" style="font-size:18px;font-weight:700;">${slots.paid}</div></div>
        <div class="ar-card" style="flex:1;padding:10px 12px;background:var(--bg);border:0;"><div class="ar-sub" style="font-size:10.5px;">\u0421\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u043B\u043E\u0442\u043E\u0432</div><div class="ar-mono" style="font-size:18px;font-weight:700;color:${slots.paid - slots.active > 0 ? "var(--green)" : "var(--ink-3)"};">${Math.max(0, slots.paid - slots.active)}</div></div>
      </div>
    </div>
    <button class="ar-btn" id="pAddVehicle"><i class="fa-solid fa-plus"></i>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442</button>
    <div class="ar-flabel" style="margin-top:4px;">\u041C\u043E\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442</div>
    <div id="pVehiclesList" style="display:flex;flex-direction:column;gap:10px;">${rows}</div>
    <div style="height:8px;"></div>`;
    if (!quiet) staggerIn(document.getElementById("pVehiclesList"));
  }
  async function openAddVehicle() {
    let tariffs = [];
    try {
      tariffs = await listTariffs();
    } catch (e) {
    }
    if (!tariffs.length) {
      toast("\u0422\u0438\u043F\u044B \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C", "err");
      return;
    }
    let tariffId = Number(tariffs[0].id);
    let ptsPhoto = null;
    const reqOf = (id) => {
      const t = tariffs.find((x) => Number(x.id) === Number(id));
      return t ? t.requires_vehicle !== false : true;
    };
    openModal({
      title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div><div class="ar-flabel">\u0422\u0438\u043F</div>
          <div class="ar-chips" id="av_type" style="flex-wrap:wrap;gap:8px;">
            ${tariffs.map((t, i) => `<div class="ar-chip ${i === 0 ? "is-on" : ""}" data-tid="${t.id}">${t.name} \xB7 ${money(t.monthly_fee)}/\u043C\u0435\u0441</div>`).join("")}</div></div>
        <div id="av_vehfields" style="display:${reqOf(tariffId) ? "flex" : "none"};flex-direction:column;gap:12px;">
          <div><div class="ar-flabel">\u0413\u043E\u0441. \u043D\u043E\u043C\u0435\u0440</div><div class="ar-field"><i class="fa-solid fa-truck-pickup"></i><input id="av_reg" type="text" placeholder="\u041D\u0430\u043F\u0440. \u0410123\u0412\u042176"></div></div>
          <div><div class="ar-flabel">\u041F\u0422\u0421</div><div class="ar-field"><i class="fa-regular fa-file-lines"></i><input id="av_pts" type="text" placeholder="\u0421\u0435\u0440\u0438\u044F \u0438 \u043D\u043E\u043C\u0435\u0440 \u041F\u0422\u0421"></div></div>
          <button type="button" class="ar-btn ar-ghost ar-sm" id="av_photo_btn"><i class="fa-solid fa-camera"></i> \u0424\u043E\u0442\u043E \u041F\u0422\u0421</button>
          <div id="av_photo_prev"></div>
        </div>
        <div class="ar-sub" style="font-size:11.5px;">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0439\u0434\u0451\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C, \u043F\u043E\u0441\u043B\u0435 \u2014 \u043E\u043F\u043B\u0430\u0442\u0430.</div>
      </div>`,
      onMount: (el) => {
        el.querySelectorAll("#av_type [data-tid]").forEach((c) => c.addEventListener("click", () => {
          tariffId = Number(c.getAttribute("data-tid"));
          el.querySelectorAll("#av_type [data-tid]").forEach((x) => x.classList.toggle("is-on", x === c));
          const vf = el.querySelector("#av_vehfields");
          if (vf) vf.style.display = reqOf(tariffId) ? "flex" : "none";
        }));
        el.querySelector("#av_photo_btn").addEventListener("click", async () => {
          const [f] = await pickFiles({ accept: "image/*" });
          if (!f) return;
          try {
            const u = await uploadImage("docs", f);
            ptsPhoto = u;
            const p = el.querySelector("#av_photo_prev");
            if (p) p.innerHTML = `<img src="${u}" style="max-height:110px;max-width:100%;border-radius:10px;margin-top:8px;display:block;"><div class="ar-sub" style="font-size:11px;color:var(--green);margin-top:4px;">\u2713 \u0444\u043E\u0442\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043E</div>`;
          } catch (e) {
            toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0444\u043E\u0442\u043E", "err");
          }
        });
      },
      actions: [{ label: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443", primary: true, onClick: async () => {
        var _a, _b;
        const needsVeh = reqOf(tariffId);
        const reg = needsVeh ? ((_a = document.getElementById("av_reg")) == null ? void 0 : _a.value.trim()) || "" : "";
        const pts = needsVeh ? ((_b = document.getElementById("av_pts")) == null ? void 0 : _b.value.trim()) || "" : "";
        if (needsVeh && !reg) {
          toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0433\u043E\u0441. \u043D\u043E\u043C\u0435\u0440", "err");
          return true;
        }
        if (needsVeh && !ptsPhoto) {
          toast("\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u041F\u0422\u0421", "err");
          return true;
        }
        try {
          await addVehicle({ tariff_id: tariffId, reg_number: reg, pts, pts_photo: needsVeh ? ptsPhoto : null });
          toast("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443");
          renderTransport();
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  function openPActive(order3) {
    activeOrder = order3;
    go("p-active");
  }
  function initActiveMap(o) {
    if (typeof ymaps === "undefined") return;
    let coords = YAROSLAVL_CENTER;
    if (Array.isArray(o.coordinates)) coords = o.coordinates;
    else if (o.coordinates && o.coordinates.lat) coords = [o.coordinates.lat, o.coordinates.lon];
    ymaps.ready(() => {
      const el = document.getElementById("pActiveMap");
      if (!el) return;
      el.innerHTML = "";
      pMap = new ymaps.Map(el, { center: coords, zoom: 15, controls: [] }, { suppressMapOpenBlock: true });
      pMap.behaviors.disable(["scrollZoom"]);
      pMap.geoObjects.add(new ymaps.Placemark(coords, {}, { preset: "islands#redIcon", iconColor: "#ed2e68" }));
    });
  }
  function hasVehicleFor(o, vehicles) {
    const t = requiredVehicleType(o);
    return (vehicles || []).some((v) => v.status === "approved" && v.is_paid && v.type_name === t);
  }
  function approvedVehicleTypes(vehicles) {
    return [...new Set((vehicles || []).filter((v) => v.status === "approved").map((v) => v.type_name).filter(Boolean))];
  }
  async function renderActive() {
    var _a;
    const o = activeOrder;
    if (!o) {
      go("p-orders");
      return;
    }
    const custAvatar = o.customer_id ? await getUserAvatar(o.customer_id) : null;
    let myVehicles = [];
    try {
      myVehicles = await listMyVehicles();
    } catch (e) {
    }
    const canTakeThis = hasVehicleFor(o, myVehicles);
    document.getElementById("pActiveNum").textContent = orderCode(o.display_id);
    const qty = o.category === "material" ? `${o.quantity || ""} \u043C\xB3` : o.category === "equipment" ? `${o.rental_hours || ""} \u0447` : `${o.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
    const cashPay = o.payment_method === "cash";
    const [stLabel, stCls] = statusLabel(o.status);
    const isAvailable = o.status === "new";
    const canComplete = ["taken", "in_progress"].includes(o.status);
    const hLeft = hoursUntilOrder(o);
    const canCancel = canComplete && (hLeft == null || hLeft >= 1);
    const body = document.getElementById("pActiveBody");
    body.innerHTML = `
    <div id="pActiveMap" style="border-radius:16px;overflow:hidden;height:160px;background:#e7eae3;"></div>
    <div style="display:flex;justify-content:flex-end;"><span class="ar-pill ${stCls}"><span class="ar-pdot"></span>${stLabel}</span></div>
    <div class="ar-card">
      <div class="ar-row"><div class="ar-ric"><i class="fa-solid fa-location-dot"></i></div><div style="flex:1;"><div>${esc(o.address || "\u0430\u0434\u0440\u0435\u0441 \u0443\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F")}</div><div class="ar-rsub">${esc(o.delivery_date || "")} ${esc(o.delivery_time || "")}</div></div></div>
      <div class="ar-row"><div class="ar-ric"><i class="fa-solid fa-cubes-stacked"></i></div><div style="flex:1;"><div>${esc(o.product || "")}${o.fraction ? ", " + esc(o.fraction) : ""}, ${qty}</div></div></div>
      <div class="ar-row">
        <div class="ar-ric" style="background:${cashPay ? "var(--green-tint)" : "#eaf0fb"};color:${cashPay ? "var(--green)" : "#2b5fb0"};"><i class="fa-solid ${cashPay ? "fa-money-bill-wave" : "fa-credit-card"}"></i></div>
        <div style="flex:1;"><div style="font-weight:700;">${cashPay ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442"}</div><div class="ar-rsub">${cashPay ? "\u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A \u043F\u043B\u0430\u0442\u0438\u0442 \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u043F\u0440\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435" : "\u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A \u043F\u043B\u0430\u0442\u0438\u0442 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u043C"}</div></div>
      </div>
      <div class="ar-row"><div style="flex:1;font-size:13px;font-weight:700;color:var(--ink-2);">\u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430</div><span class="ar-mono" style="font-size:16px;">${money(o.partner_price)}</span></div>
    </div>
    <div class="ar-card" style="padding:14px 16px;display:flex;align-items:center;gap:13px;">
      ${custAvatar ? `<div class="ar-ava" style="width:44px;height:44px;overflow:hidden;"><img src="${custAvatar}" alt="" style="width:100%;height:100%;object-fit:cover;"></div>` : `<div class="ar-ava" style="width:44px;height:44px;">${esc(((o.customer_name || "\u0417").trim()[0] || "\u0417").toUpperCase())}</div>`}
      <div style="flex:1;"><div style="font-size:14.5px;font-weight:800;">${esc(o.customer_name || "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A")}</div><div class="ar-sub" style="font-size:12px;">\u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A</div></div>
      ${canComplete ? `<button class="ar-btn ar-sm" id="pActiveChat" style="width:auto;padding:0 16px;gap:7px;"><i class="fa-regular fa-comment"></i>\u0427\u0430\u0442</button>` : ""}
    </div>
    ${isAvailable ? canTakeThis ? `<div style="margin-top:auto;padding-bottom:36px;"><button class="ar-btn" id="pActiveTake">\u0412\u0437\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437</button></div>` : `<div style="margin-top:auto;padding-bottom:36px;">
           <div class="ar-card" style="padding:14px 16px;display:flex;align-items:center;gap:11px;">
             <div class="ar-ric" style="background:var(--pink-tint);color:var(--pink-deep);"><i class="fa-solid fa-triangle-exclamation"></i></div>
             <div style="flex:1;font-size:13px;font-weight:600;color:var(--ink-2);">\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0439 \u0442\u0435\u0445\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u2014 \u043D\u0443\u0436\u0435\u043D \xAB${requiredVehicleType(o)}\xBB</div>
           </div></div>` : ""}
    ${canComplete ? `<div style="margin-top:auto;padding-bottom:36px;display:flex;flex-direction:column;gap:10px;">
      <button class="ar-btn" id="pActiveComplete">\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</button>
      ${canCancel ? `<div id="pCancelTimer" class="ar-sub" style="text-align:center;font-size:11.5px;"></div>
           <div id="pActiveCancel" style="text-align:center;font-size:13px;font-weight:700;color:var(--ink-3);cursor:pointer;">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</div>` : `<div class="ar-sub" style="text-align:center;font-size:11.5px;">\u041E\u0442\u043C\u0435\u043D\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u2014 \u0434\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0430\u0441\u0430</div>`}
    </div>` : ""}`;
    (_a = document.getElementById("pActiveChat")) == null ? void 0 : _a.addEventListener("click", () => openOrderChat(o));
    const takeBtn = document.getElementById("pActiveTake");
    if (takeBtn) takeBtn.addEventListener("click", async () => {
      takeBtn.disabled = true;
      takeBtn.textContent = "\u0411\u0435\u0440\u0451\u043C\u2026";
      try {
        await takeOrder(o.id);
        sendPush("order_taken", o);
        toast("\u0417\u0430\u043A\u0430\u0437 \u0432\u0430\u0448");
        feedTab = "mine";
        activeOrder = { ...o, status: "taken", executor_id: state.user.id };
        renderActive();
      } catch (err) {
        toast(err.message, "err");
        takeBtn.disabled = false;
        takeBtn.textContent = "\u0412\u0437\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437";
      }
    });
    const completeBtn = document.getElementById("pActiveComplete");
    if (completeBtn) completeBtn.addEventListener("click", async () => {
      const btn = completeBtn;
      btn.disabled = true;
      btn.textContent = "\u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C\u2026";
      try {
        await completeOrder(o.id);
        sendPush("order_awaiting_confirmation", o);
        toast("\u0413\u043E\u0442\u043E\u0432\u043E \u2014 \u0436\u0434\u0451\u043C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430");
        go("p-orders");
      } catch (err) {
        toast(err.message, "err");
        btn.disabled = false;
        btn.textContent = "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437";
      }
    });
    const cancelEl = document.getElementById("pActiveCancel");
    if (cancelEl) cancelEl.addEventListener("click", async () => {
      if (!confirm("\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0437\u0430\u043A\u0430\u0437\u0430? \u041E\u043D \u0432\u0435\u0440\u043D\u0451\u0442\u0441\u044F \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u043C \u0434\u0440\u0443\u0433\u0438\u043C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C.")) return;
      try {
        await cancelTakenOrder(o.id);
        sendPush("order_released", o);
        toast("\u0412\u044B \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0438\u0441\u044C \u043E\u0442 \u0437\u0430\u043A\u0430\u0437\u0430");
        go("p-orders");
      } catch (err) {
        toast(err.message, "err");
      }
    });
    if (activeTimerStop) {
      activeTimerStop();
      activeTimerStop = null;
    }
    const tEl = document.getElementById("pCancelTimer");
    if (canCancel && tEl && hLeft != null) {
      const dms = orderDeliveryMs(o);
      if (dms) activeTimerStop = countdown(tEl, dms - 3600 * 1e3, {
        prefix: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043C\u043E\u0436\u043D\u043E \u0435\u0449\u0451: ",
        onZero: () => {
          if (activeTimerStop) {
            activeTimerStop();
            activeTimerStop = null;
          }
          if (currentScreen() === "p-active") renderActive();
        }
      });
    }
    setTimeout(() => initActiveMap(o), 80);
  }
  function orderDeliveryMs(o) {
    if (!o.delivery_date || !/^\d{4}-\d{2}-\d{2}/.test(o.delivery_date)) return null;
    const time = (o.delivery_time || "00:00").slice(0, 5);
    const dt = /* @__PURE__ */ new Date(`${o.delivery_date}T${time}`);
    return isNaN(dt) ? null : dt.getTime();
  }
  function hoursUntilOrder(o) {
    if (!o.delivery_date) return null;
    const time = (o.delivery_time || "00:00").slice(0, 5);
    const dt = /* @__PURE__ */ new Date(`${o.delivery_date}T${time}`);
    if (isNaN(dt)) return null;
    return (dt - /* @__PURE__ */ new Date()) / 36e5;
  }
  var MONTHS = ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"];
  var schedMonth = (/* @__PURE__ */ new Date()).getMonth();
  var schedYear = (/* @__PURE__ */ new Date()).getFullYear();
  var schedSelected = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  function ordersOn(iso) {
    return myOrdersCache.filter((o) => (o.delivery_date || "").slice(0, 10) === iso);
  }
  function dayDotColor(orders) {
    if (orders.some((o) => ["taken", "in_progress", "awaiting_confirmation"].includes(o.status))) return "var(--pink)";
    if (orders.some((o) => ["completed", "done"].includes(o.status))) return "var(--green)";
    if (orders.some((o) => ["cancelled", "expired"].includes(o.status))) return "#c0c6d2";
    return "transparent";
  }
  var SCAT_ICON = { material: "fa-cubes-stacked", equipment: "fa-truck-pickup", service: "fa-helmet-safety" };
  async function renderSchedule() {
    setRolePartner();
    const body = document.getElementById("pSchedBody");
    try {
      myOrdersCache = await listMyPartnerOrders();
    } catch (e) {
    }
    const todayIso = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const first = new Date(schedYear, schedMonth, 1);
    const startDow = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(schedYear, schedMonth + 1, 0).getDate();
    const dnames = ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"];
    let cells = dnames.map((d) => `<div style="text-align:center;font-size:10px;font-weight:700;color:var(--ink-3);padding-bottom:4px;">${d}</div>`).join("");
    for (let i = 0; i < startDow; i++) cells += `<div></div>`;
    for (let day = 1; day <= daysInMonth; day++) {
      const iso = `${schedYear}-${String(schedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayOrd = ordersOn(iso);
      const isToday = iso === todayIso;
      const isSel = iso === schedSelected;
      const bg = isSel ? "var(--ink)" : isToday ? "var(--pink-tint)" : "var(--card)";
      const color = isSel ? "#fff" : "var(--ink)";
      const border = isSel ? "var(--ink)" : isToday ? "#f6c7d6" : "var(--line)";
      const dot = dayOrd.length ? isSel ? "#fff" : dayDotColor(dayOrd) : "transparent";
      cells += `<button data-day="${iso}" style="border:1px solid ${border};background:${bg};color:${color};border-radius:11px;padding:7px 0;text-align:center;cursor:pointer;">
      <div class="ar-mono" style="font-size:14px;">${day}</div>
      <div style="width:5px;height:5px;border-radius:99px;margin:3px auto 0;background:${dot};"></div></button>`;
    }
    const selDate = /* @__PURE__ */ new Date(schedSelected + "T00:00:00");
    const selLabel = `${selDate.getDate()} ${MONTHS[selDate.getMonth()].toLowerCase()}`;
    const dayOrders = ordersOn(schedSelected);
    const rows = dayOrders.length ? dayOrders.map((o) => {
      const qty = o.category === "material" ? `${o.quantity || ""} \u043C\xB3` : o.category === "equipment" ? `${o.rental_hours || ""} \u0447` : "1 \u0442\u043E\u0447\u043A\u0430";
      const [stLabel, stCls] = statusLabel(o.status);
      return `<div class="ar-row" data-order="${o.id}" style="cursor:pointer;">
      <div class="ar-ric" style="background:var(--pink-tint);color:var(--pink);"><i class="fa-solid ${SCAT_ICON[o.category] || "fa-box"}"></i></div>
      <div style="flex:1;min-width:0;"><div>${o.product || ""}, ${qty}</div><div class="ar-rsub" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.address || ""}</div></div>
      <div style="text-align:right;"><span class="ar-pill ${stCls}" style="font-size:9.5px;padding:3px 7px;">${stLabel}</span><div class="ar-mono" style="font-size:11.5px;color:var(--ink-3);margin-top:3px;">${(o.delivery_time || "").slice(0, 5)}</div></div></div>`;
    }).join("") : `<div class="ar-sub" style="padding:16px;">\u041D\u0430 \u044D\u0442\u043E\u0442 \u0434\u0435\u043D\u044C \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043D\u0435\u0442</div>`;
    body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <button id="schedPrev" class="ar-iconbtn"><i class="fa-solid fa-chevron-left"></i></button>
      <div style="font-weight:800;font-size:16px;">${MONTHS[schedMonth]} ${schedYear}</div>
      <button id="schedNext" class="ar-iconbtn"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;">${cells}</div>
    <div style="display:flex;gap:14px;font-size:10.5px;font-weight:600;color:var(--ink-3);">
      <span><span style="display:inline-block;width:7px;height:7px;border-radius:99px;background:var(--pink);margin-right:4px;"></span>\u0432 \u0440\u0430\u0431\u043E\u0442\u0435</span>
      <span><span style="display:inline-block;width:7px;height:7px;border-radius:99px;background:var(--green);margin-right:4px;"></span>\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D</span>
      <span><span style="display:inline-block;width:7px;height:7px;border-radius:99px;background:#c0c6d2;margin-right:4px;"></span>\u043E\u0442\u043C\u0435\u043D\u0451\u043D</span>
    </div>
    <div class="ar-flabel" style="margin-top:2px;">${selLabel} \xB7 \u0437\u0430\u043A\u0430\u0437\u044B</div>
    <div class="ar-card" style="padding:0;">${rows}</div>`;
    document.getElementById("schedPrev").addEventListener("click", () => {
      schedMonth--;
      if (schedMonth < 0) {
        schedMonth = 11;
        schedYear--;
      }
      renderSchedule();
    });
    document.getElementById("schedNext").addEventListener("click", () => {
      schedMonth++;
      if (schedMonth > 11) {
        schedMonth = 0;
        schedYear++;
      }
      renderSchedule();
    });
    body.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => {
      schedSelected = b.getAttribute("data-day");
      renderSchedule();
    }));
    body.querySelectorAll("[data-order]").forEach((r) => r.addEventListener("click", () => {
      const o = myOrdersCache.find((x) => x.id === r.getAttribute("data-order"));
      if (o) openPActive(o);
    }));
  }
  var partnerProfile = null;
  function avatarHTML(name, size = 52) {
    var _a;
    const av = (_a = state.user) == null ? void 0 : _a.avatar_url;
    const inner = av ? `<img src="${av}" alt="">` : name[0] || "\u041F";
    return `<div class="ar-ava ar-ava-edit" id="pAvatar" style="width:${size}px;height:${size}px;font-size:19px;">${inner}<span class="ar-ava-cam"><i class="fa-solid fa-camera"></i></span></div>`;
  }
  async function renderPProfile() {
    setRolePartner();
    const u = state.user;
    const name = (u == null ? void 0 : u.name) || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440";
    const body = document.getElementById("pProfileBody");
    try {
      partnerProfile = await getPartnerProfile();
    } catch (e) {
      partnerProfile = null;
    }
    body.innerHTML = `
    <div class="ar-card" style="padding:16px;display:flex;align-items:center;gap:14px;">
      ${avatarHTML(name)}
      <div style="flex:1;"><div style="font-size:16.5px;font-weight:800;">${name}</div><div class="ar-sub" style="font-size:12.5px;">${u ? formatPhone(u.phone) : ""}</div></div>
      <span class="ar-pill is-done"><i class="fa-solid fa-check" style="font-size:9px;"></i>\u043F\u0430\u0440\u0442\u043D\u0451\u0440</span>
    </div>
    <div class="ar-taplist">
      <div class="ar-taprow" data-nav="p-transport"><div class="ar-ric"><i class="fa-solid fa-truck-pickup"></i></div><div style="flex:1;font-weight:700;font-size:13.5px;">\u041C\u043E\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442</div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
      <div class="ar-taprow" id="pRowNotify"><div class="ar-ric"><i class="fa-regular fa-bell"></i></div><div style="flex:1;font-weight:700;font-size:13.5px;">\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F</div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
      <div class="ar-taprow" data-nav="p-chats"><div class="ar-ric"><i class="fa-regular fa-comment"></i></div><div style="flex:1;font-weight:700;font-size:13.5px;">\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430</div><i class="fa-solid fa-chevron-right ar-chev"></i></div>
    </div>
    <div class="ar-card" id="toCustomer" style="padding:15px 16px;display:flex;align-items:center;gap:13px;cursor:pointer;">
      <div style="width:38px;height:38px;border-radius:11px;background:var(--pink-tint);display:flex;align-items:center;justify-content:center;color:var(--pink);font-size:14px;flex-shrink:0;"><i class="fa-solid fa-repeat"></i></div>
      <div style="flex:1;"><div style="font-size:14px;font-weight:800;">\u0420\u0435\u0436\u0438\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430</div><div style="font-size:11.5px;font-weight:500;color:var(--ink-3);">\u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u0438 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443</div></div>
      <i class="fa-solid fa-arrow-right" style="color:var(--pink);font-size:13px;"></i>
    </div>
    <div id="pLogout" style="text-align:center;font-size:13px;font-weight:700;color:var(--ink-3);margin-top:4px;cursor:pointer;">\u0412\u044B\u0439\u0442\u0438</div>`;
    document.getElementById("pAvatar").addEventListener("click", pickAvatar2);
    wireNotifyToggle("pNotifyToggle", "pRowNotify");
    document.getElementById("toCustomer").addEventListener("click", () => {
      state.role = "customer";
      try {
        localStorage.setItem("almanirent_role", "customer");
      } catch (e) {
      }
      go("home");
    });
    document.getElementById("pLogout").addEventListener("click", () => {
      clearSession();
      go("login", { replace: true });
    });
  }
  async function pickAvatar2() {
    const [file] = await pickFiles({ accept: "image/*" });
    if (!file) return;
    try {
      const url = await uploadImage("avatars", file, { max: 512 });
      await saveAvatar(url);
      toast("\u0424\u043E\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E");
      renderPProfile();
    } catch (e) {
      toast(e.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E", "err");
    }
  }
  async function handlePaymentReturn() {
    const url = new URL(window.location.href);
    if (url.searchParams.get("paid") !== "1") return false;
    url.searchParams.delete("paid");
    history.replaceState(null, "", url.pathname + (url.search || "") + (url.hash || ""));
    setRolePartner();
    const paid = await checkPendingPayment();
    toast(paid ? "\u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0448\u043B\u0430 \u2014 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E" : "\u041F\u043B\u0430\u0442\u0451\u0436 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443", paid ? "ok" : "err");
    go("p-transport");
    return true;
  }
  var _partnerRtSetup = false;
  function setupPartnerRealtime() {
    var _a;
    if (_partnerRtSetup) return;
    _partnerRtSetup = true;
    const rtRefresh = debounce(() => {
      const cur = currentScreen();
      if (cur === "p-orders") renderOrdersFeed(true);
      else if (cur === "p-transport") renderTransport(true);
      else if (cur === "p-active" && activeOrder) {
        supabase.from("orders").select("*").eq("id", activeOrder.id).maybeSingle().then(({ data: data2 }) => {
          if (data2 && data2.status !== activeOrder.status) {
            activeOrder = data2;
            if (currentScreen() === "p-active") renderActive();
          }
        });
      }
    }, 350);
    onTable("orders", rtRefresh);
    if ((_a = state.user) == null ? void 0 : _a.id) onTable("partner_vehicles", rtRefresh, "user_id=eq." + state.user.id);
    else onTable("partner_vehicles", rtRefresh);
  }
  function initPartner() {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.getElementById("pOrdersSeg")) == null ? void 0 : _a.addEventListener("click", (e) => {
      const d = e.target.closest("[data-ptab2]");
      if (!d) return;
      feedTab = d.getAttribute("data-ptab2");
      renderOrdersFeed();
    });
    (_b = document.getElementById("cabinetBody")) == null ? void 0 : _b.addEventListener("click", (e) => {
      const cp = e.target.closest("[data-cp]");
      if (cp) {
        cabPeriod = cp.getAttribute("data-cp");
        document.querySelectorAll("#cabPeriod [data-cp]").forEach((d) => d.classList.toggle("is-on", d === cp));
        drawCabinetOrders();
      }
    });
    (_c = document.getElementById("pOrdersList")) == null ? void 0 : _c.addEventListener("click", async (e) => {
      const take = e.target.closest("[data-take]");
      if (!take) return;
      take.disabled = true;
      const id = take.getAttribute("data-take");
      const order3 = feedAvailable.find((o) => o.id === id);
      try {
        await takeOrder(id);
        if (order3) sendPush("order_taken", order3);
        toast("\u0417\u0430\u043A\u0430\u0437 \u0432\u0430\u0448");
        feedTab = "mine";
        if (order3) openPActive({ ...order3, status: "taken", executor_id: state.user.id });
        else renderOrdersFeed();
      } catch (err) {
        toast(err.message, "err");
        take.disabled = false;
      }
    });
    (_d = document.getElementById("pTransportBody")) == null ? void 0 : _d.addEventListener("click", async (e) => {
      if (e.target.closest("#pAddVehicle")) {
        openAddVehicle();
        return;
      }
      const pay = e.target.closest("[data-pay-vehicle]");
      if (pay) {
        pay.disabled = true;
        pay.textContent = "\u041F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u043C \u043A \u043E\u043F\u043B\u0430\u0442\u0435\u2026";
        try {
          await payVehicle(pay.getAttribute("data-pay-vehicle"));
        } catch (err) {
          toast(err.message, "err");
          pay.disabled = false;
        }
      }
    });
    const gate = (fn) => async () => {
      setRolePartner();
      setupPartnerRealtime();
      let pp = null;
      try {
        pp = await getPartnerProfile();
      } catch (e) {
      }
      if (pp && pp.status === "blocked") {
        go("p-banned");
        return;
      }
      fn();
    };
    onShow("cabinet", gate(renderCabinet));
    onShow("p-orders", gate(() => renderOrdersFeed()));
    onShow("p-transport", gate(renderTransport));
    onShow("p-active", gate(renderActive));
    onShow("p-sched", gate(renderSchedule));
    onShow("p-profile", gate(renderPProfile));
    (_e = document.getElementById("pBannedSupport")) == null ? void 0 : _e.addEventListener("click", () => openBannedSupport("p-banned"));
    (_f = document.getElementById("pBannedToCustomer")) == null ? void 0 : _f.addEventListener("click", () => {
      state.role = "customer";
      try {
        localStorage.setItem("almanirent_role", "customer");
      } catch (e) {
      }
      go("home");
    });
  }

  // app/api/admin.js
  var ap = () => {
    var _a;
    return ((_a = state.user) == null ? void 0 : _a.phone) || "";
  };
  async function rpc(fn, args) {
    const { data: data2, error } = await supabase.rpc(fn, args);
    if (error) throw new Error(error.message || "\u041E\u0448\u0438\u0431\u043A\u0430");
    return data2;
  }
  async function adminStatsPeriod(period = "all", from = null, to = null) {
    const d = await rpc("admin_stats_period", { admin_phone: ap(), p_period: period, p_from: from, p_to: to });
    return Array.isArray(d) ? d[0] : d;
  }
  async function adminRecentOrders(limit = 5) {
    const d = await rpc("admin_get_orders", { admin_phone: ap(), status_filter: null });
    return (d || []).slice(0, limit);
  }
  function adminGetUsers(status = null) {
    return rpc("admin_get_users", { admin_phone: ap(), status_filter: status });
  }
  async function adminOnlineCounts() {
    const d = await rpc("admin_online_counts", { admin_phone: ap() });
    return (Array.isArray(d) ? d[0] : d) || { partners_online: 0, customers_online: 0, total_online: 0 };
  }
  function adminUserDetail(userId) {
    return rpc("admin_get_user_detail", { admin_phone: ap(), target_user_id: userId }).then((d) => Array.isArray(d) ? d[0] : d);
  }
  async function adminGetUserPassword(userId) {
    const d = await rpc("admin_get_user_password", { admin_phone: ap(), target_user_id: userId });
    const r = Array.isArray(d) ? d[0] : d;
    return (r == null ? void 0 : r.password) || "";
  }
  function adminSetVerification(userId, status) {
    return rpc("admin_update_verification", { admin_phone: ap(), target_user_id: userId, new_status: status });
  }
  function adminDeleteUser(userId) {
    return rpc("admin_delete_user", { admin_phone: ap(), target_user_id: userId });
  }
  async function adminSetUserBan(userId, banned, reason = null) {
    const d = await rpc("admin_set_user_ban", { admin_phone: ap(), target_user_id: userId, p_banned: banned, p_reason: reason });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0443\u0441");
    return r;
  }
  async function adminUpdateUser(userId, { name = null, email = null, phone = null } = {}) {
    const d = await rpc("admin_update_user", { admin_phone: ap(), target_user_id: userId, p_name: name, p_email: email, p_phone: phone });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
    return r;
  }
  function adminListAdmins() {
    return rpc("super_admin_list_admins", { main_admin_phone: ap() });
  }
  async function adminGrantByUserId(userId) {
    return rpc("super_admin_grant_admin", { main_admin_phone: ap(), target_user_id: userId });
  }
  async function adminRevoke(userId) {
    return rpc("super_admin_revoke_admin", { main_admin_phone: ap(), target_user_id: userId });
  }
  async function adminFindUserByPhone(phone) {
    const d = await rpc("admin_find_user_by_phone", { admin_phone: ap(), p_phone: phone });
    const r = Array.isArray(d) ? d[0] : d;
    return (r == null ? void 0 : r.id) || null;
  }
  async function adminGrantByPhone(phone) {
    const id = await adminFindUserByPhone(phone);
    if (!id) throw new Error("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
    return adminGrantByUserId(id);
  }
  function adminListApplications() {
    return rpc("admin_get_partner_applications", { admin_phone: ap(), status_filter: null });
  }
  async function adminApproveApplication(appId) {
    const d = await rpc("admin_approve_partner_application", { admin_phone: ap(), application_id: appId });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043E\u0431\u0440\u0438\u0442\u044C");
    return r;
  }
  function adminRejectApplication(appId) {
    return rpc("admin_reject_partner_application", { admin_phone: ap(), application_id: appId });
  }
  function adminListPartners() {
    return rpc("admin_get_partners", { admin_phone: ap() });
  }
  function adminPartnerDetail(userId) {
    return rpc("admin_get_partner_detail", { admin_phone: ap(), target_user_id: userId }).then((d) => Array.isArray(d) ? d[0] : d);
  }
  async function adminUpdatePartner(userId, upd = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const d = await rpc("admin_update_partner", {
      admin_phone: ap(),
      target_user_id: userId,
      p_legal_status: (_a = upd.legal_status) != null ? _a : null,
      p_legal_name: (_b = upd.legal_name) != null ? _b : null,
      p_categories: null,
      p_payout_bank: (_c = upd.payout_bank) != null ? _c : null,
      p_payout_account: (_d = upd.payout_account) != null ? _d : null,
      p_payout_name: (_e = upd.payout_name) != null ? _e : null,
      p_passport: (_f = upd.passport) != null ? _f : null,
      p_equipment_number: (_g = upd.equipment_number) != null ? _g : null,
      p_pts: (_h = upd.pts) != null ? _h : null,
      p_passport_photo: (_i = upd.passport_photo) != null ? _i : null,
      p_pts_photo: (_j = upd.pts_photo) != null ? _j : null
    });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
    return r;
  }
  function adminSetPartnerStatus(userId, status) {
    return rpc("admin_set_partner_status", { admin_phone: ap(), target_user_id: userId, new_status: status });
  }
  async function adminAddPartner(userId, { legal_status, legal_name, passport, equipment_number, pts, passport_photo, pts_photo } = {}) {
    const d = await rpc("admin_add_partner", {
      admin_phone: ap(),
      target_user_id: userId,
      p_legal_status: legal_status,
      p_legal_name: legal_name,
      p_categories: null,
      p_passport: passport || null,
      p_equipment_number: equipment_number || null,
      p_pts: pts || null,
      p_passport_photo: passport_photo || null,
      p_pts_photo: pts_photo || null
    });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C");
    return r;
  }
  async function adminListOrders(group = "all") {
    let status = null;
    if (group === "new") status = "new";
    try {
      await supabase.rpc("expire_stale_orders");
    } catch (e) {
    }
    return rpc("admin_get_orders", { admin_phone: ap(), status_filter: status }).then((d) => {
      const arr = d || [];
      if (group === "work") return arr.filter((o) => ["taken", "in_progress", "awaiting_confirmation"].includes(o.status));
      if (group === "done") return arr.filter((o) => ["completed", "done"].includes(o.status));
      if (group === "cancelled") return arr.filter((o) => ["cancelled", "expired"].includes(o.status));
      return arr;
    });
  }
  function adminOrderDetail(id) {
    return rpc("admin_get_order_detail", { admin_phone: ap(), target_order_id: id }).then((d) => Array.isArray(d) ? d[0] : d);
  }
  function adminCancelOrder(id) {
    return rpc("admin_cancel_order", { admin_phone: ap(), target_order_id: id });
  }
  async function adminListCatalog() {
    const { data: data2 } = await supabase.from("product_prices").select("*").order("category").order("product_name");
    return (data2 || []).map((p) => ({ ...p, is_available: p.is_available !== false }));
  }
  function adminTogglePrice(id, isAvailable) {
    return rpc("admin_toggle_price", { admin_phone: ap(), p_price_id: id, p_is_available: isAvailable });
  }
  function adminUpdatePrice(id, updates) {
    return rpc("admin_update_product_price", { admin_phone: ap(), p_price_id: id, p_updates: updates });
  }
  async function adminGetSettings() {
    const { data: data2 } = await supabase.from("app_settings").select("*");
    const m = {};
    (data2 || []).forEach((r) => {
      m[r.key] = r.value;
    });
    return m;
  }
  function adminSetSetting(key, value) {
    return rpc("admin_upsert_app_setting", { admin_phone: ap(), setting_key: key, setting_value: String(value) });
  }
  function adminListSupportChats() {
    return rpc("admin_get_support_chats", { admin_phone: ap() });
  }
  function adminChatMessages(chatId) {
    return rpc("admin_get_chat_messages", { admin_phone: ap(), target_chat_id: chatId });
  }
  function adminSendSupport(chatId, text, imageUrl = null) {
    return rpc("admin_send_support_message", { admin_phone: ap(), target_chat_id: chatId, message_text: text, image_url_param: imageUrl });
  }
  function adminSearchUsers(q) {
    return rpc("admin_search_users_for_support", { admin_phone: ap(), search_query: q });
  }
  function adminCreateSupportChat(userId) {
    return rpc("admin_create_support_chat", { admin_phone: ap(), target_user_id: userId });
  }
  function adminListBroadcasts() {
    return rpc("admin_get_broadcasts", { admin_phone: ap() });
  }
  async function adminSendBroadcast({ title, body, audience }) {
    const role = audience === "both" ? "all" : audience;
    try {
      const res = await fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "admin_broadcast", order: { title, body, target_role: role, admin_phone: ap() } })
      });
      if (res.ok) return;
    } catch (e) {
    }
    await rpc("admin_send_broadcast", { admin_phone: ap(), p_title: title, p_body: body, p_target_role: role });
  }
  function adminListTariffs() {
    return rpc("admin_list_tariffs", { admin_phone: ap() });
  }
  async function adminUpsertTariff(id, name, fee, requiresVehicle = true) {
    const d = await rpc("admin_upsert_tariff", { admin_phone: ap(), p_id: id != null ? id : null, p_name: name, p_fee: fee, p_requires_vehicle: requiresVehicle });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
    return r;
  }
  function adminListVehicles(status = null) {
    return rpc("admin_list_vehicles", { admin_phone: ap(), status_filter: status });
  }
  async function adminDeletePartner(userId) {
    const d = await rpc("admin_delete_partner", { admin_phone: ap(), target_user_id: userId });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C");
    return r;
  }
  async function adminDeleteVehicle(vehicleId) {
    const d = await rpc("admin_delete_vehicle", { admin_phone: ap(), p_vehicle_id: vehicleId });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C");
    return r;
  }
  async function adminGrantFreeDays({ userId = null, vehicleId = null, days }) {
    const d = await rpc("admin_grant_free_days", { admin_phone: ap(), p_user_id: userId, p_vehicle_id: vehicleId, p_days: days });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0434\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F");
    return r;
  }
  async function adminUpdateVehicle(vehicleId, { tariff_id = null, reg_number = null, pts = null, pts_photo = null } = {}) {
    const d = await rpc("admin_update_vehicle", { admin_phone: ap(), p_vehicle_id: vehicleId, p_tariff_id: tariff_id, p_reg_number: reg_number, p_pts: pts, p_pts_photo: pts_photo });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
    return r;
  }
  async function adminSetVehicleStatus(vehicleId, status) {
    const d = await rpc("admin_set_vehicle_status", { admin_phone: ap(), p_vehicle_id: vehicleId, p_status: status });
    const r = Array.isArray(d) ? d[0] : d;
    if (r && r.success === false) throw new Error(r.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C");
    return r;
  }

  // app/screens/admin.js
  var ANAV = [
    ["fa-solid fa-chart-line", "\u041E\u0431\u0437\u043E\u0440", "a-dash"],
    ["fa-solid fa-box", "\u0417\u0430\u043A\u0430\u0437\u044B", "a-orders"],
    ["fa-solid fa-handshake", "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u044B", "a-partners"],
    ["fa-regular fa-comments", "\u0427\u0430\u0442\u044B", "a-chats"],
    ["fa-solid fa-ellipsis", "\u0415\u0449\u0451", "a-more"]
  ];
  function fillAdminNav() {
    document.querySelectorAll("[data-atabbar]").forEach((h) => {
      h.innerHTML = navHTML(ANAV, h.getAttribute("data-atabbar"));
    });
  }
  var CAT = { material: ["\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B", "#eaf0fb", "#2b5fb0"], equipment: ["\u0442\u0435\u0445\u043D\u0438\u043A\u0430", "#fbf0e6", "#b26a1c"], service: ["\u0443\u0441\u043B\u0443\u0433\u0430", "#ece8fb", "#6a4fb0"] };
  function catBadge2(c) {
    const [t, bg, col] = CAT[c] || ["\u2014", "#eee", "#555"];
    return `<span class="ar-catbadge" style="background:${bg};color:${col};">${t}</span>`;
  }
  var ST = { new: ["is-new", "\u041D\u043E\u0432\u044B\u0439"], taken: ["is-work", "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435"], in_progress: ["is-work", "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435"], awaiting_confirmation: ["is-new", "\u0416\u0434\u0451\u0442"], completed: ["is-done", "\u0413\u043E\u0442\u043E\u0432"], done: ["is-done", "\u0413\u043E\u0442\u043E\u0432"], cancelled: ["is-work", "\u041E\u0442\u043C\u0435\u043D\u0451\u043D"], expired: ["is-work", "\u0418\u0441\u0442\u0451\u043A"] };
  function pill(s) {
    const [c, l] = ST[s] || ["is-work", s];
    return `<span class="ar-pill ${c}" style="font-size:10px;">${l}</span>`;
  }
  var LEGAL = { self_employed: "\u0424\u0438\u0437 \u043B\u0438\u0446\u043E (\u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u044B\u0439)", ip: "\u0418\u041F", ooo: "\u041E\u041E\u041E" };
  function docPhoto(label, url) {
    if (!url) return "";
    return `<div><div class="ar-sub" style="margin-bottom:6px;">${label}</div><img src="${url}" data-imgview="1" style="width:100%;max-height:240px;object-fit:contain;border-radius:10px;background:#f0f1f4;display:block;cursor:zoom-in;" /></div>`;
  }
  function wireDocPhoto(root, btnSel, prevSel, setter) {
    const btn = root.querySelector(btnSel);
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const [file] = await pickFiles({ accept: "image/*" });
      if (!file) return;
      try {
        const url = await uploadImage("docs", file);
        setter(url);
        const prev = root.querySelector(prevSel);
        if (prev) prev.innerHTML = `<img src="${url}" style="max-height:110px;max-width:100%;border-radius:10px;margin-top:8px;display:block;"><div class="ar-sub" style="font-size:11px;color:var(--green);margin-top:4px;">\u2713 \u0444\u043E\u0442\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043E</div>`;
      } catch (e) {
        toast("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0444\u043E\u0442\u043E", "err");
      }
    });
  }
  var aDashPeriod = "all";
  var aDashFrom = "";
  var aDashTo = "";
  var DASH_PERIODS = [["today", "\u0421\u0435\u0433\u043E\u0434\u043D\u044F"], ["week", "\u041D\u0435\u0434\u0435\u043B\u044F"], ["month", "\u041C\u0435\u0441\u044F\u0446"], ["all", "\u0412\u0441\u0451"], ["range", "\u041F\u0435\u0440\u0438\u043E\u0434"]];
  async function renderDash() {
    var _a, _b, _c, _d, _e;
    const body = document.getElementById("aDashBody");
    body.innerHTML = `<div class="ar-sub" style="padding:20px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    let s, recent = [];
    try {
      if (aDashPeriod === "range" && aDashFrom) {
        const to = aDashTo || aDashFrom;
        s = await adminStatsPeriod("range", `${aDashFrom}T00:00:00`, `${to}T23:59:59`);
      } else {
        s = await adminStatsPeriod(aDashPeriod);
      }
      recent = await adminRecentOrders(5);
    } catch (e) {
      body.innerHTML = `<div class="ar-sub" style="padding:20px 0;">\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430: ${e.message}</div>`;
      return;
    }
    const periodSeg = `<div class="ar-seg" id="aDashPeriod" style="margin-bottom:12px;font-size:12px;">${DASH_PERIODS.map(([k, l]) => `<div class="${k === aDashPeriod ? "is-on" : ""}" data-dperiod="${k}">${l}</div>`).join("")}</div>`;
    const rangeBox = aDashPeriod === "range" ? `
    <div style="display:flex;gap:8px;margin-bottom:12px;align-items:flex-end;">
      <div style="flex:1;"><div class="ar-flabel">\u0421</div><div class="ar-field" style="padding:0 10px;"><input id="aDashFrom" type="date" value="${aDashFrom}"></div></div>
      <div style="flex:1;"><div class="ar-flabel">\u041F\u043E</div><div class="ar-field" style="padding:0 10px;"><input id="aDashTo" type="date" value="${aDashTo}"></div></div>
      <button class="ar-btn ar-sm" id="aDashApply" style="width:auto;padding:0 16px;height:42px;">\u041E\u041A</button>
    </div>` : "";
    const stat = (icon, tint, ic, label, num, trend, statKey) => `
    <div class="ar-card" ${statKey ? `data-stat="${statKey}"` : ""} style="padding:13px 14px;${statKey ? "cursor:pointer;" : ""}">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:28px;height:28px;border-radius:8px;background:${tint};color:${ic};display:flex;align-items:center;justify-content:center;font-size:12px;"><i class="fa-solid ${icon}"></i></div>
        <span style="font-size:11.5px;font-weight:700;color:var(--ink-3);">${label}</span>${statKey ? `<i class="fa-solid fa-chevron-right" style="margin-left:auto;font-size:10px;color:var(--ink-3);"></i>` : ""}</div>
      <div class="ar-mono" style="font-size:22px;margin-top:9px;">${num}</div>
      ${trend ? `<div style="font-size:10.5px;font-weight:700;color:var(--green);margin-top:2px;">${trend}</div>` : ""}</div>`;
    const total = Number(s.cash_sum) + Number(s.card_sum) || 1;
    const cardPct = Math.round(Number(s.card_sum) / total * 100);
    const recentRows = recent.length ? recent.map((o) => `
    <div class="ar-row"><span class="ar-mono" style="font-size:11px;color:var(--ink-3);">${orderCode(o.display_id)}</span>
      <div style="flex:1;font-size:13.5px;margin-left:8px;">${o.product || ""}</div>${pill(o.status)}
      <span class="ar-mono" style="font-size:12.5px;margin-left:8px;">${money(o.total_price)}</span></div>`).join("") : `<div class="ar-sub" style="padding:14px;">\u0417\u0430\u043A\u0430\u0437\u043E\u0432 \u043D\u0435\u0442</div>`;
    body.innerHTML = `
    ${periodSeg}
    ${rangeBox}
    <div class="ar-grid2">
      ${stat("fa-box", "#eaf0fb", "#2b5fb0", "\u0417\u0430\u043A\u0430\u0437\u043E\u0432", (_a = s.orders_total) != null ? _a : 0, ((_b = s.orders_active) != null ? _b : 0) + " \u0430\u043A\u0442\u0438\u0432\u043D\u044B", "orders")}
      ${stat("fa-ruble-sign", "var(--pink-tint)", "var(--pink)", "\u041E\u0431\u043E\u0440\u043E\u0442", money(s.turnover), "", "turnover")}
      ${stat("fa-truck-pickup", "#fbf1df", "#9a6e1e", "\u0414\u043E\u0445\u043E\u0434 \u0441 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439", money(s.monthly_revenue), ((_c = s.active_vehicles) != null ? _c : 0) + " \u043C\u0430\u0448\u0438\u043D \u0430\u043A\u0442\u0438\u0432\u043D\u043E", "connections")}
      ${stat("fa-handshake", "var(--green-tint)", "var(--green)", "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432", (_d = s.partners) != null ? _d : 0, ((_e = s.applications_new) != null ? _e : 0) + " \u0437\u0430\u044F\u0432\u043E\u043A", "partners")}
    </div>
    <div class="ar-card" style="padding:14px 16px;">
      <div style="font-size:13.5px;font-weight:800;margin-bottom:12px;">\u041E\u043F\u043B\u0430\u0442\u044B</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:6px;"><span style="color:#2b5fb0;">\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0435</span><span class="ar-mono">${money(s.card_sum)}</span></div><div class="ar-bar"><span style="width:${cardPct}%;background:#2b5fb0;display:inline-block;height:100%;"></span></div></div>
        <div><div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:6px;"><span style="color:var(--green);">\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435</span><span class="ar-mono">${money(s.cash_sum)}</span></div><div class="ar-bar"><span style="width:${100 - cardPct}%;background:var(--green);display:inline-block;height:100%;"></span></div></div>
      </div></div>
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:2px;"><div class="ar-h2">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u044B</div><span style="font-size:12.5px;font-weight:700;color:var(--pink);" data-nav="a-orders">\u0412\u0441\u0435</span></div>
    <div class="ar-card" style="padding:0;">${recentRows}</div><div style="height:8px;"></div>`;
  }
  function dashInPeriod(dateStr) {
    if (aDashPeriod === "range") {
      if (!aDashFrom) return true;
      const d = new Date(dateStr);
      if (isNaN(d)) return false;
      if (d < /* @__PURE__ */ new Date(`${aDashFrom}T00:00:00`)) return false;
      if (aDashTo && d > /* @__PURE__ */ new Date(`${aDashTo}T23:59:59`)) return false;
      return true;
    }
    return inPeriod(dateStr, aDashPeriod);
  }
  function dashPeriodLabel() {
    const m = { today: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F", week: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E", month: "\u0437\u0430 \u043C\u0435\u0441\u044F\u0446", all: "\u0437\u0430 \u0432\u0441\u0451 \u0432\u0440\u0435\u043C\u044F", range: aDashFrom ? `${aDashFrom} \u2014 ${aDashTo || aDashFrom}` : "\u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434" };
    return m[aDashPeriod] || "";
  }
  async function openDashList(kind) {
    if (kind === "partners") {
      go("a-partners");
      return;
    }
    try {
      if (kind === "orders" || kind === "turnover") {
        const all = await adminListOrders("all");
        let items = all.filter((o) => dashInPeriod(o.created_at));
        let title, total;
        if (kind === "turnover") {
          items = items.filter((o) => ["completed", "done"].includes(o.status));
          total = items.reduce((s, o) => s + (Number(o.total_price) || 0), 0);
          title = `\u041E\u0431\u043E\u0440\u043E\u0442 \xB7 ${dashPeriodLabel()}`;
        } else {
          total = items.reduce((s, o) => s + (Number(o.total_price) || 0), 0);
          title = `\u0417\u0430\u043A\u0430\u0437\u044B \xB7 ${dashPeriodLabel()}`;
        }
        const rows = items.length ? items.map((o) => `
        <div class="ar-taprow" data-dorder="${o.id}">
          <span class="ar-mono" style="font-size:11px;color:var(--ink-3);flex-shrink:0;">${orderCode(o.display_id)}</span>
          <div style="flex:1;font-size:13px;font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${o.product || "\u2014"}</div>
          ${pill(o.status)}
          <span class="ar-mono" style="font-size:12.5px;flex-shrink:0;">${money(o.total_price)}</span></div>`).join("") : `<div class="ar-sub" style="padding:16px;text-align:center;">\u041D\u0435\u0442 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434</div>`;
        openModal({
          title,
          bodyHTML: `
          <div class="ar-listtotal"><div><div class="ar-lt-sub">\u0418\u0442\u043E\u0433\u043E \xB7 ${items.length} \u0448\u0442.</div></div><div class="ar-lt-val">${money(total)}</div></div>
          <div class="ar-taplist">${rows}</div>`,
          onMount: (el) => el.querySelectorAll("[data-dorder]").forEach((r) => r.addEventListener("click", () => openAdminOrderDetail(r.getAttribute("data-dorder")))),
          actions: []
        });
      } else if (kind === "connections") {
        const veh = await adminListVehicles(null);
        const active = veh.filter((v) => v.status === "approved" && v.paid_until && new Date(v.paid_until) > /* @__PURE__ */ new Date());
        pdVehicles = active;
        const total = active.reduce((s, v) => s + (Number(v.monthly_fee) || 0), 0);
        const rows = active.length ? active.map((v) => `
        <div class="ar-taprow" data-dveh="${v.id}">
          <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${v.partner_name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440"}</div>
            <div class="ar-rsub">${v.type_name || "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"}${v.reg_number ? " \xB7 " + esc(v.reg_number) : ""} \xB7 \u0434\u043E ${new Date(v.paid_until).toLocaleDateString("ru-RU")}</div></div>
          <span class="ar-mono" style="font-size:13px;flex-shrink:0;">${money(v.monthly_fee)}/\u043C\u0435\u0441</span></div>`).join("") : `<div class="ar-sub" style="padding:16px;text-align:center;">\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u043E\u043F\u043B\u0430\u0447\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439</div>`;
        openModal({
          title: "\u0414\u043E\u0445\u043E\u0434 \u0441 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439",
          bodyHTML: `
          <div class="ar-listtotal"><div><div class="ar-lt-sub">\u0412 \u043C\u0435\u0441\u044F\u0446 \xB7 ${active.length} \u043F\u043E\u0434\u043A\u043B.</div></div><div class="ar-lt-val">${money(total)}</div></div>
          <div class="ar-taplist">${rows}</div>`,
          onMount: (el) => el.querySelectorAll("[data-dveh]").forEach((r) => r.addEventListener("click", () => openVehicleDetail(r.getAttribute("data-dveh")))),
          actions: []
        });
      }
    } catch (e) {
      toast(e.message, "err");
    }
  }
  var aOF = "all";
  var aOQuery = "";
  var aOPeriod = "all";
  var aOrdersCache = [];
  var O_PERIODS = [["today", "\u0414\u0435\u043D\u044C"], ["week", "\u041D\u0435\u0434\u0435\u043B\u044F"], ["month", "\u041C\u0435\u0441\u044F\u0446"], ["all", "\u0412\u0441\u0451"]];
  var O_GROUP = {
    new: (s) => s === "new",
    work: (s) => ["taken", "in_progress", "awaiting_confirmation"].includes(s),
    done: (s) => ["completed", "done"].includes(s),
    cancelled: (s) => ["cancelled", "expired"].includes(s),
    all: () => true
  };
  var _adminRtSetup = false;
  function setupAdminRealtime() {
    if (_adminRtSetup) return;
    _adminRtSetup = true;
    const rtOrders = debounce(async () => {
      if (currentScreen() !== "a-orders") return;
      try {
        aOrdersCache = await adminListOrders("all");
        drawOrders();
      } catch (e) {
      }
    }, 400);
    const rtVehicles = debounce(async () => {
      if (currentScreen() !== "a-transport") return;
      try {
        atVehicles = await adminListVehicles(null);
        drawTransportAdmin();
      } catch (e) {
      }
    }, 400);
    const rtChats = debounce(async () => {
      if (currentScreen() !== "a-chats") return;
      try {
        aChatsCache = await adminListSupportChats();
        drawAdminChats();
      } catch (e) {
      }
    }, 400);
    onTable("orders", rtOrders);
    onTable("partner_vehicles", rtVehicles);
    onTable("chats", rtChats);
    onTable("messages", rtChats);
  }
  async function renderOrders() {
    setupAdminRealtime();
    const body = document.getElementById("aOrdersBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    try {
      aOrdersCache = await adminListOrders("all");
    } catch (e) {
      aOrdersCache = [];
    }
    const chips = [["all", "\u0412\u0441\u0435"], ["new", "\u041D\u043E\u0432\u044B\u0435"], ["work", "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435"], ["done", "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u044B"], ["cancelled", "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u044B"]].map(([k, l]) => `<div class="ar-chip ${k === aOF ? "is-on" : ""}" data-of="${k}">${l}</div>`).join("");
    const periodSeg = O_PERIODS.map(([k, l]) => `<div class="${k === aOPeriod ? "is-on" : ""}" data-operiod="${k}">${l}</div>`).join("");
    body.innerHTML = `
    <div class="ar-field" style="margin-bottom:10px;"><i class="fa-solid fa-magnifying-glass"></i>
      <input id="aOrdersSearch" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A: \u043D\u043E\u043C\u0435\u0440, \u0442\u043E\u0432\u0430\u0440, \u0438\u043C\u044F, \u0430\u0434\u0440\u0435\u0441" value="${aOQuery.replace(/"/g, "&quot;")}"></div>
    <div class="ar-seg" id="aOrdersPeriod" style="margin-bottom:10px;">${periodSeg}</div>
    <div class="ar-chips" style="overflow-x:auto;flex-wrap:nowrap;">${chips}</div>
    <div id="aOrdersList" style="display:flex;flex-direction:column;gap:10px;margin-top:12px;"></div>
    <div style="height:8px;"></div>`;
    drawOrders();
  }
  function drawOrders() {
    const list = document.getElementById("aOrdersList");
    if (!list) return;
    const items = aOrdersCache.filter((o) => (O_GROUP[aOF] || O_GROUP.all)(o.status) && inPeriod(o.created_at, aOPeriod) && orderMatches(o, aOQuery));
    if (!items.length) {
      list.innerHTML = `<div class="ar-sub" style="padding:18px 0;">${aOQuery ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" : "\u041D\u0435\u0442 \u0437\u0430\u043A\u0430\u0437\u043E\u0432"}</div>`;
      return;
    }
    list.innerHTML = items.map((o) => {
      return `<div class="ar-card" data-order="${o.id}" style="padding:13px 15px;display:flex;flex-direction:column;gap:9px;cursor:pointer;">
      <div style="display:flex;align-items:center;gap:8px;"><span class="ar-mono" style="font-size:12px;color:var(--ink-3);">${orderCode(o.display_id)}</span>${catBadge2(o.category)}<span style="margin-left:auto;">${pill(o.status)}</span></div>
      <div style="font-size:14.5px;font-weight:800;">${esc(o.product || "")}</div>
      <div style="font-size:12px;font-weight:600;color:var(--ink-3);">${esc(o.address || "\u0430\u0434\u0440\u0435\u0441 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D")}</div>
      <div style="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;color:var(--ink-3);">
        <span><i class="fa-regular fa-user" style="margin-right:5px;"></i>${esc(o.customer_name || o.customer_phone || "\u2014")}</span>
        <span><i class="fa-solid fa-truck-pickup" style="margin-right:5px;"></i>${esc(o.executor_name || "\u2014")}</span>
        <span class="ar-mono" style="margin-left:auto;font-size:14px;color:var(--ink);">${money(o.total_price)}</span></div>
      </div>`;
    }).join("");
    staggerIn(list);
  }
  async function openAdminOrderDetail(orderId) {
    let o;
    try {
      o = await adminOrderDetail(orderId);
    } catch (e) {
      toast(e.message, "err");
      return;
    }
    if (!o) {
      toast("\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", "err");
      return;
    }
    const qty = o.category === "material" ? `${o.quantity || "\u2014"} \u043C\xB3` : o.category === "equipment" ? `${o.rental_hours || "\u2014"} \u0447` : `${o.service_points || 1} \u0442\u043E\u0447\u043A\u0430`;
    const pay = o.payment_method === "cash" ? "\u041D\u0430\u043B\u0438\u0447\u043D\u044B\u0435" : "\u0411\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442";
    const row = (l, v) => v ? `<div style="display:flex;justify-content:space-between;gap:12px;"><span class="ar-sub">${l}</span><span style="text-align:right;font-weight:600;">${esc(v)}</span></div>` : "";
    openModal({
      title: orderCode(o.display_id),
      bodyHTML: `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">${catBadge2(o.category)}${pill(o.status)}</div>
      <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;">
        ${row("\u0422\u043E\u0432\u0430\u0440", (o.product || "\u2014") + (o.fraction ? " \xB7 " + o.fraction : ""))}
        ${row("\u041E\u0431\u044A\u0451\u043C / \u0447\u0430\u0441\u044B", qty)}
        ${row("\u0410\u0434\u0440\u0435\u0441", o.address)}
        ${row("\u0414\u0430\u0442\u0430 / \u0432\u0440\u0435\u043C\u044F", [o.delivery_date, o.delivery_time].filter(Boolean).join(" "))}
        ${row("\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439", o.comments)}
        <div class="ar-hr" style="margin:4px 0;"></div>
        ${row("\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A", o.customer_name)}
        ${row("\u0422\u0435\u043B\u0435\u0444\u043E\u043D", o.customer_phone ? formatPhone(o.customer_phone) : "")}
        ${row("\u041F\u0430\u0440\u0442\u043D\u0451\u0440", o.executor_name)}
        ${row("\u0422\u0435\u043B. \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430", o.executor_phone ? formatPhone(o.executor_phone) : "")}
        <div class="ar-hr" style="margin:4px 0;"></div>
        ${row("\u041E\u043F\u043B\u0430\u0442\u0430", pay)}
        ${row("\u0421\u0443\u043C\u043C\u0430 \u0437\u0430\u043A\u0430\u0437\u0430", money(o.total_price))}
        ${row("\u0421\u043E\u0437\u0434\u0430\u043D", o.created_at ? new Date(o.created_at).toLocaleString("ru-RU") : "")}
        ${o.cancel_reason ? row("\u041F\u0440\u0438\u0447\u0438\u043D\u0430 \u043E\u0442\u043C\u0435\u043D\u044B", o.cancel_reason) : ""}
      </div>`,
      // Действия только для заказа «в работе»; для готовых/отменённых — кнопок нет.
      actions: ["new", "taken", "in_progress", "awaiting_confirmation"].includes(o.status) ? [
        { label: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437", onClick: async () => {
          if (!confirm("\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0437\u0430\u043A\u0430\u0437?")) return true;
          try {
            await adminCancelOrder(o.id);
            toast("\u0417\u0430\u043A\u0430\u0437 \u043E\u0442\u043C\u0435\u043D\u0451\u043D");
            renderOrders();
          } catch (e) {
            toast(e.message, "err");
            return true;
          }
          return false;
        } }
      ] : []
    });
  }
  var aPartners = [];
  var aApps = [];
  var aVehicles = [];
  var aPQuery = "";
  var atFilter = "all";
  var atQuery = "";
  var atVehicles = [];
  var VEH_STAT = { pending: ["is-new", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"], approved: ["is-done", "\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D"], rejected: ["is-work", "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D"] };
  async function renderTransportAdmin() {
    setupAdminRealtime();
    const body = document.getElementById("aTransportBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    try {
      atVehicles = await adminListVehicles(null);
    } catch (e) {
      atVehicles = [];
    }
    const pend = atVehicles.filter((v) => v.status === "pending").length;
    const paid = atVehicles.filter((v) => v.status === "approved" && v.paid_until && new Date(v.paid_until) > /* @__PURE__ */ new Date()).length;
    const chips = [["all", "\u0412\u0441\u0435"], ["pending", `\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435${pend ? " \xB7 " + pend : ""}`], ["approved", "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B"], ["rejected", "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u044B"]].map(([k, l]) => `<div class="ar-chip ${k === atFilter ? "is-on" : ""}" data-atf="${k}">${l}</div>`).join("");
    body.innerHTML = `
    <div class="ar-grid2">
      <div class="ar-card" style="padding:12px 14px;"><div class="ar-sub" style="font-size:10.5px;">\u0412\u0441\u0435\u0433\u043E \u043C\u0430\u0448\u0438\u043D</div><div class="ar-mono" style="font-size:20px;font-weight:700;">${atVehicles.length}</div></div>
      <div class="ar-card" style="padding:12px 14px;"><div class="ar-sub" style="font-size:10.5px;">\u041E\u043F\u043B\u0430\u0447\u0435\u043D\u043E \u0441\u0435\u0439\u0447\u0430\u0441</div><div class="ar-mono" style="font-size:20px;font-weight:700;color:var(--green);">${paid}</div></div>
    </div>
    <div class="ar-field"><i class="fa-solid fa-magnifying-glass"></i>
      <input id="atSearch" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A: \u043F\u0430\u0440\u0442\u043D\u0451\u0440, \u0442\u0435\u043B\u0435\u0444\u043E\u043D, \u0433\u043E\u0441. \u043D\u043E\u043C\u0435\u0440" value="${atQuery.replace(/"/g, "&quot;")}"></div>
    <div class="ar-chips" style="overflow-x:auto;flex-wrap:nowrap;">${chips}</div>
    <div id="atList" style="display:flex;flex-direction:column;gap:10px;"></div><div style="height:8px;"></div>`;
    drawTransportAdmin();
  }
  function vehMatch(v, q) {
    q = String(q || "").trim().toLowerCase();
    if (!q) return true;
    const digits = q.replace(/\D/g, "");
    if (digits && String(v.partner_phone || "").replace(/\D/g, "").includes(digits)) return true;
    return [v.partner_name, v.reg_number, v.type_name].filter(Boolean).join(" ").toLowerCase().includes(q);
  }
  function drawTransportAdmin() {
    const list = document.getElementById("atList");
    if (!list) return;
    const items = atVehicles.filter((v) => (atFilter === "all" || v.status === atFilter) && vehMatch(v, atQuery));
    if (!items.length) {
      list.innerHTML = `<div class="ar-sub" style="padding:16px;">${atQuery ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" : "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430 \u043D\u0435\u0442"}</div>`;
      return;
    }
    list.innerHTML = items.map((v) => {
      const [sc, sl] = VEH_STAT[v.status] || ["is-work", v.status];
      const isPaid = v.paid_until && new Date(v.paid_until) > /* @__PURE__ */ new Date();
      const payInfo = v.status === "approved" ? isPaid ? `<span style="color:var(--green);font-weight:700;">\u043E\u043F\u043B\u0430\u0447\u0435\u043D \u0434\u043E ${new Date(v.paid_until).toLocaleDateString("ru-RU")}</span>` : `<span style="color:var(--pink);font-weight:700;">\u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B</span>` : "";
      return `<div class="ar-card" data-atveh="${v.id}" style="padding:13px 15px;display:flex;flex-direction:column;gap:8px;cursor:pointer;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:800;">${v.type_name || "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435"}${v.reg_number ? " \xB7 " + esc(v.reg_number) : ""}</div>
          <div class="ar-sub" style="font-size:11.5px;">${v.partner_name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440"} \xB7 ${formatPhone(v.partner_phone)}</div></div>
        <span class="ar-pill ${sc}" style="font-size:10px;">${sl}</span></div>
      <div class="ar-sub" style="font-size:11.5px;display:flex;justify-content:space-between;"><span>${money(v.monthly_fee)}/\u043C\u0435\u0441</span>${payInfo}</div>
      ${v.status === "pending" ? `<div style="display:flex;gap:8px;"><button class="ar-btn ar-sm" data-vapprove="${v.id}" style="flex:1;height:34px;background:var(--green);box-shadow:none;">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button><button class="ar-btn ar-sm ar-ghost" data-vreject="${v.id}" style="flex:1;height:34px;">\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C</button></div>` : v.status === "approved" ? `<div style="display:flex;justify-content:flex-end;"><span class="ar-pill is-work" style="font-size:10px;cursor:pointer;padding:3px 9px;" data-vblock="${v.id}">\u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C</span></div>` : `<div style="display:flex;justify-content:flex-end;"><span class="ar-pill is-done" style="font-size:10px;cursor:pointer;padding:3px 9px;" data-vapprove="${v.id}">\u0432\u0435\u0440\u043D\u0443\u0442\u044C</span></div>`}
    </div>`;
    }).join("");
    staggerIn(list);
  }
  async function renderPartners() {
    const body = document.getElementById("aPartnersBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    try {
      [aApps, aPartners, aVehicles] = await Promise.all([adminListApplications(), adminListPartners(), adminListVehicles("pending").catch(() => [])]);
    } catch (e) {
      aApps = [];
      aPartners = [];
      aVehicles = [];
    }
    const newApps = aApps.filter((a) => a.status === "new");
    const vehCards = aVehicles.length ? aVehicles.map((v) => `
    <div class="ar-card" data-vehdetail="${v.id}" style="padding:13px 15px;display:flex;flex-direction:column;gap:9px;cursor:pointer;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:800;">${v.type_name || "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"} \xB7 ${esc(v.reg_number || "")}</div>
          <div class="ar-sub" style="font-size:11.5px;">${v.partner_name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440"} \xB7 ${formatPhone(v.partner_phone)}</div></div>
        <span class="ar-mono" style="font-size:12.5px;color:var(--ink-2);">${money(v.monthly_fee)}/\u043C\u0435\u0441</span></div>
      <div style="display:flex;gap:8px;"><button class="ar-btn ar-sm" data-vapprove="${v.id}" style="flex:1;height:36px;background:var(--green);box-shadow:none;"><i class="fa-solid fa-check"></i>\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C</button>
        <button class="ar-btn ar-sm ar-ghost" data-vreject="${v.id}" style="flex:1;height:36px;">\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C</button></div></div>`).join("") : "";
    const appCards = newApps.length ? newApps.map((a) => `
    <div class="ar-card" data-appdetail="${a.id}" style="padding:13px 15px;display:flex;flex-direction:column;gap:10px;cursor:pointer;">
      <div style="display:flex;align-items:center;gap:11px;"><div class="ar-ava" style="width:38px;height:38px;font-size:14px;">${esc((a.full_name || "?")[0])}</div>
        <div style="flex:1;"><div style="font-size:14px;font-weight:800;">${esc(a.full_name)}</div><div class="ar-sub" style="font-size:11.5px;">${LEGAL[a.legal_status] || ""} \xB7 ${formatPhone(a.phone)}</div></div></div>
      <div class="ar-sub" style="font-size:11px;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-id-card"></i>\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C</div>
      <div style="display:flex;gap:8px;"><button class="ar-btn ar-sm" data-approve="${a.id}" style="flex:1;height:38px;background:var(--green);box-shadow:none;"><i class="fa-solid fa-check"></i>\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C</button>
        <button class="ar-btn ar-sm ar-ghost" data-reject="${a.id}" style="flex:1;height:38px;">\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C</button></div></div>`).join("") : `<div class="ar-sub" style="padding:6px 2px;">\u041D\u043E\u0432\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A \u043D\u0435\u0442</div>`;
    body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;"><div class="ar-flabel">\u0417\u0430\u044F\u0432\u043A\u0438</div>
      <span style="font-size:12.5px;font-weight:700;color:var(--pink);" id="aAddPartner">+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</span></div>
    <div style="display:flex;flex-direction:column;gap:10px;">${appCards}</div>
    ${vehCards ? `<div class="ar-flabel" style="margin-top:6px;">\u0417\u0430\u044F\u0432\u043A\u0438 \u043D\u0430 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \xB7 ${aVehicles.length}</div>
      <div style="display:flex;flex-direction:column;gap:10px;">${vehCards}</div>` : ""}
    <div class="ar-flabel" style="margin-top:6px;">\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u044B \xB7 ${aPartners.filter((p) => p.status === "active").length} \u0430\u043A\u0442\u0438\u0432\u043D\u044B</div>
    <div class="ar-field" style="margin-bottom:10px;"><i class="fa-solid fa-magnifying-glass"></i>
      <input id="aPartnersSearch" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443" value="${aPQuery.replace(/"/g, "&quot;")}"></div>
    <div class="ar-card" style="padding:0;" id="aPartnersList"></div><div style="height:8px;"></div>`;
    drawPartners();
  }
  function drawPartners() {
    const list = document.getElementById("aPartnersList");
    if (!list) return;
    const items = aPartners.filter((p) => personMatches(p, aPQuery));
    if (!items.length) {
      list.innerHTML = `<div class="ar-sub" style="padding:14px;">${aPQuery ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" : "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432 \u043D\u0435\u0442"}</div>`;
      return;
    }
    list.innerHTML = items.map((p) => {
      const on = p.status === "active";
      const blocked = p.status === "blocked";
      return `<div class="ar-row" data-pdetail="${p.user_id}" style="cursor:pointer;${blocked ? "opacity:.7;" : ""}">
      <div class="ar-ava" style="width:36px;height:36px;font-size:13px;">${(p.name || "\u041F")[0]}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:700;">${esc(p.name || "\u041F\u0430\u0440\u0442\u043D\u0451\u0440")}${blocked ? ` <span class="ar-pill is-work" style="font-size:9px;padding:2px 6px;margin-left:4px;">\u{1F512} \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D</span>` : ""}</div><div class="ar-rsub">${LEGAL[p.legal_status] || ""} \xB7 ${formatPhone(p.phone)}</div></div>
      <div class="adm-toggle${on ? " on" : ""}" data-ptoggle="${p.user_id}" data-cur="${p.status}" style="margin-left:10px;"></div></div>`;
    }).join("");
    staggerIn(list);
  }
  function openApplicationDetail(appId) {
    const a = aApps.find((x) => x.id === appId);
    if (!a) {
      toast("\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430", "err");
      return;
    }
    const row = (l, v) => `<div style="display:flex;justify-content:space-between;gap:12px;"><span class="ar-sub">${l}</span><span style="text-align:right;font-weight:600;">${esc(v || "\u2014")}</span></div>`;
    openModal({
      title: a.full_name || "\u0417\u0430\u044F\u0432\u043A\u0430",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;">
        ${row("\u0422\u0435\u043B\u0435\u0444\u043E\u043D", a.phone ? formatPhone(a.phone) : "")}
        ${row("\u042E\u0440. \u0444\u043E\u0440\u043C\u0430", LEGAL[a.legal_status] || a.legal_status)}
        ${row("\u042E\u0440. \u0438\u043C\u044F", a.legal_name)}
        <div class="ar-hr" style="margin:4px 0;"></div>
        ${row("\u041F\u0430\u0441\u043F\u043E\u0440\u0442", a.passport)}
        ${row("\u0413\u043E\u0441. \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u0445\u043D\u0438\u043A\u0438", a.equipment_number)}
        ${row("\u041F\u0422\u0421", a.pts)}
        ${docPhoto("\u0424\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430", a.passport_photo)}
        ${docPhoto("\u0424\u043E\u0442\u043E \u041F\u0422\u0421", a.pts_photo)}
        ${row("\u041F\u043E\u0434\u0430\u043D\u0430", a.created_at ? new Date(a.created_at).toLocaleString("ru-RU") : "")}
      </div>`,
      actions: [
        { label: "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430", primary: true, onClick: async () => {
          try {
            await adminApproveApplication(appId);
            toast("\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043E\u0434\u043E\u0431\u0440\u0435\u043D");
            renderPartners();
          } catch (e) {
            toast(e.message, "err");
            return true;
          }
          return false;
        } },
        { label: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C", onClick: async () => {
          try {
            await adminRejectApplication(appId);
            toast("\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0430");
            renderPartners();
          } catch (e) {
            toast(e.message, "err");
            return true;
          }
          return false;
        } }
      ]
    });
  }
  function openGrantDays({ vehicleId = null, vehicles = null, title = "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F", onDone } = {}) {
    const sel2 = /* @__PURE__ */ new Set();
    let pickList = "";
    if (vehicles) {
      if (!vehicles.length) {
        toast("\u0423 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u043D\u0435\u0442 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430 \u2014 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043C\u0430\u0448\u0438\u043D\u0443", "err");
        return;
      }
      vehicles.forEach((v) => sel2.add(v.id));
      pickList = `<div><div class="ar-flabel">\u041D\u0430 \u043A\u0430\u043A\u0443\u044E \u0442\u0435\u0445\u043D\u0438\u043A\u0443</div>
      <div id="gdVehs" style="display:flex;flex-direction:column;gap:8px;">
        ${vehicles.map((v) => `<div class="ar-chip is-on" data-gv="${v.id}" style="justify-content:flex-start;text-align:left;border-radius:12px;padding:10px 12px;">
          <i class="fa-solid fa-check" style="margin-right:8px;"></i>${v.type_name || "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"}${v.reg_number ? " \xB7 " + esc(v.reg_number) : ""}</div>`).join("")}</div></div>`;
    }
    openModal({
      title,
      bodyHTML: `<div style="display:flex;flex-direction:column;gap:12px;">
      <div class="ar-sub" style="font-size:12.5px;">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0442\u0435\u0445\u043D\u0438\u043A\u0438 \u043F\u0440\u043E\u0434\u043B\u0438\u0442\u0441\u044F \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u0434\u043D\u0435\u0439 (\u043A\u0430\u043A \u043E\u043F\u043B\u0430\u0447\u0435\u043D\u043D\u043E\u0435).</div>
      ${pickList}
      <div><div class="ar-flabel">\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0434\u043D\u0435\u0439</div><div class="ar-field"><input id="gdDays" type="number" inputmode="numeric" placeholder="\u043D\u0430\u043F\u0440. 14" value="30"></div></div>
      <div class="ar-chips" id="gdQuick" style="flex-wrap:wrap;gap:8px;">
        ${[7, 14, 30, 60, 90].map((n) => `<div class="ar-chip" data-gd="${n}">${n} \u0434\u043D.</div>`).join("")}</div>
    </div>`,
      onMount: (el) => {
        el.querySelectorAll("#gdQuick [data-gd]").forEach((ch) => ch.addEventListener("click", () => {
          el.querySelector("#gdDays").value = ch.getAttribute("data-gd");
        }));
        el.querySelectorAll("#gdVehs [data-gv]").forEach((ch) => ch.addEventListener("click", () => {
          const id = ch.getAttribute("data-gv");
          if (sel2.has(id)) sel2.delete(id);
          else sel2.add(id);
          ch.classList.toggle("is-on", sel2.has(id));
          ch.querySelector("i").style.visibility = sel2.has(id) ? "visible" : "hidden";
        }));
      },
      actions: [{ label: "\u0412\u044B\u0434\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F", primary: true, onClick: async () => {
        const days = Math.floor(Number(document.getElementById("gdDays").value));
        if (!days || days <= 0) {
          toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E \u0434\u043D\u0435\u0439", "err");
          return true;
        }
        try {
          if (vehicles) {
            if (!sel2.size) {
              toast("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u0445\u043D\u0438\u043A\u0443", "err");
              return true;
            }
            await Promise.all([...sel2].map((id) => adminGrantFreeDays({ vehicleId: id, days })));
            toast(`\u0412\u044B\u0434\u0430\u043D\u043E ${days} \u0434\u043D. \xB7 \u043C\u0430\u0448\u0438\u043D: ${sel2.size}`);
          } else {
            const r = await adminGrantFreeDays({ vehicleId, days });
            toast((r == null ? void 0 : r.message) || "\u0413\u043E\u0442\u043E\u0432\u043E");
          }
          if (onDone) onDone();
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  function refreshVehScreens() {
    var _a;
    const active = (_a = document.querySelector(".ar-screen.is-active")) == null ? void 0 : _a.dataset.screen;
    if (active === "a-transport") renderTransportAdmin();
    else renderPartners();
  }
  function openVehicleDetail(vehicleId) {
    const v = aVehicles.find((x) => x.id === vehicleId) || atVehicles.find((x) => x.id === vehicleId) || pdVehicles.find((x) => x.id === vehicleId);
    if (!v) {
      toast("\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", "err");
      return;
    }
    const isPaid = v.paid_until && new Date(v.paid_until) > /* @__PURE__ */ new Date();
    const row = (l, val) => `<div style="display:flex;justify-content:space-between;gap:12px;"><span class="ar-sub">${l}</span><span style="text-align:right;font-weight:600;">${esc(val || "\u2014")}</span></div>`;
    const statLabel = { pending: "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435", approved: "\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D", rejected: "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D" }[v.status] || v.status;
    const payLine = v.status === "approved" ? isPaid ? `<span style="color:var(--green);font-weight:700;">\u043E\u043F\u043B\u0430\u0447\u0435\u043D \u0434\u043E ${new Date(v.paid_until).toLocaleDateString("ru-RU")}</span>` : `<span style="color:var(--pink);font-weight:700;">\u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u0434\u043E \u043E\u043F\u043B\u0430\u0442\u044B</span>` : "\u2014";
    const actions = [{ label: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435", primary: true, onClick: () => {
      openVehicleEditor(v);
      return true;
    } }];
    actions.push({ label: "\u0412\u044B\u0434\u0430\u0442\u044C \u0434\u043D\u0435\u0439 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", onClick: () => {
      openGrantDays({ vehicleId, title: "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \xB7 " + (v.type_name || "\u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"), onDone: () => refreshVehScreens() });
      return true;
    } });
    if (v.status !== "approved") actions.push({ label: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C", onClick: async () => {
      try {
        await adminSetVehicleStatus(vehicleId, "approved");
        toast("\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D \u2014 \u0436\u0434\u0451\u0442 \u043E\u043F\u043B\u0430\u0442\u044B \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u043C");
        refreshVehScreens();
      } catch (e) {
        toast(e.message, "err");
        return true;
      }
      return false;
    } });
    if (v.status !== "rejected") actions.push({ label: v.status === "approved" ? "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C" : "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C", onClick: async () => {
      try {
        await adminSetVehicleStatus(vehicleId, "rejected");
        toast(v.status === "approved" ? "\u041E\u0442\u043A\u043B\u044E\u0447\u0451\u043D" : "\u041E\u0442\u043A\u043B\u043E\u043D\u0451\u043D");
        refreshVehScreens();
      } catch (e) {
        toast(e.message, "err");
        return true;
      }
      return false;
    } });
    actions.push({ label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: async () => {
      if (!confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442/\u0443\u0441\u043B\u0443\u0433\u0443 \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E?")) return true;
      try {
        await adminDeleteVehicle(vehicleId);
        toast("\u0423\u0434\u0430\u043B\u0435\u043D\u043E");
        refreshVehScreens();
      } catch (e) {
        toast(e.message, "err");
        return true;
      }
      return false;
    } });
    openModal({
      title: `${v.type_name || "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"}${v.reg_number ? " \xB7 " + esc(v.reg_number) : ""}`,
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;">
        ${row("\u041F\u0430\u0440\u0442\u043D\u0451\u0440", v.partner_name)}
        ${row("\u0422\u0435\u043B\u0435\u0444\u043E\u043D", v.partner_phone ? formatPhone(v.partner_phone) : "")}
        ${row("\u0421\u0442\u0430\u0442\u0443\u0441", statLabel)}
        ${row("\u0422\u0438\u043F", v.type_name)}
        ${row("\u0413\u043E\u0441. \u043D\u043E\u043C\u0435\u0440", v.reg_number)}
        ${row("\u041F\u0422\u0421", v.pts)}
        ${row("\u041F\u043B\u0430\u0442\u0451\u0436", money(v.monthly_fee) + "/\u043C\u0435\u0441")}
        ${row("\u041E\u043F\u043B\u0430\u0442\u0430", payLine)}
        ${docPhoto("\u0424\u043E\u0442\u043E \u041F\u0422\u0421", v.pts_photo)}
      </div>`,
      actions
    });
  }
  async function openVehicleEditor(v) {
    let tariffs = [];
    try {
      tariffs = await adminListTariffs();
    } catch (e) {
    }
    const active = tariffs.filter((t) => t.is_active);
    let tariffId = null;
    const cur = active.find((t) => t.name === v.type_name);
    if (cur) tariffId = cur.id;
    let req = cur ? cur.requires_vehicle !== false : true;
    let ptsPhoto = null;
    const reqOf = (id) => {
      const t = active.find((x) => Number(x.id) === Number(id));
      return t ? t.requires_vehicle !== false : true;
    };
    openModal({
      title: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div><div class="ar-flabel">\u0422\u0438\u043F</div>
          <div class="ar-chips" id="ve_type" style="flex-wrap:wrap;gap:8px;">
            ${active.map((t) => `<div class="ar-chip ${t.id === tariffId ? "is-on" : ""}" data-tid="${t.id}">${t.name} \xB7 ${money(t.monthly_fee)}/\u043C\u0435\u0441</div>`).join("")}</div></div>
        <div id="ve_vehfields" style="display:${req ? "flex" : "none"};flex-direction:column;gap:12px;">
          <div><div class="ar-flabel">\u0413\u043E\u0441. \u043D\u043E\u043C\u0435\u0440</div><div class="ar-field"><i class="fa-solid fa-truck-pickup"></i><input id="ve_reg" type="text" value="${(v.reg_number || "").replace(/"/g, "&quot;")}"></div></div>
          <div><div class="ar-flabel">\u041F\u0422\u0421</div><div class="ar-field"><i class="fa-regular fa-file-lines"></i><input id="ve_pts" type="text" value="${(v.pts || "").replace(/"/g, "&quot;")}"></div></div>
          <div><div class="ar-flabel">\u0424\u043E\u0442\u043E \u041F\u0422\u0421</div>
            <div id="vePtsPrev">${v.pts_photo ? `<img src="${v.pts_photo}" data-imgview="1" style="max-height:160px;max-width:100%;border-radius:10px;display:block;cursor:zoom-in;margin-bottom:8px;">` : `<div class="ar-sub" style="font-size:12px;margin-bottom:8px;">\u0424\u043E\u0442\u043E \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E</div>`}</div>
            <button type="button" class="ar-btn ar-ghost ar-sm" id="vePtsBtn"><i class="fa-solid fa-camera"></i> ${v.pts_photo ? "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E" : "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E"}</button></div>
        </div>
      </div>`,
      onMount: (el) => {
        el.querySelectorAll("#ve_type [data-tid]").forEach((c) => c.addEventListener("click", () => {
          tariffId = Number(c.getAttribute("data-tid"));
          req = reqOf(tariffId);
          el.querySelectorAll("#ve_type [data-tid]").forEach((x) => x.classList.toggle("is-on", x === c));
          const vf = el.querySelector("#ve_vehfields");
          if (vf) vf.style.display = req ? "flex" : "none";
        }));
        wireDocPhoto(el, "#vePtsBtn", "#vePtsPrev", (u) => {
          ptsPhoto = u;
        });
      },
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        var _a, _b;
        const reg = req ? ((_a = document.getElementById("ve_reg")) == null ? void 0 : _a.value.trim()) || "" : "";
        const pts = req ? ((_b = document.getElementById("ve_pts")) == null ? void 0 : _b.value.trim()) || "" : "";
        if (req && !reg) {
          toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0433\u043E\u0441. \u043D\u043E\u043C\u0435\u0440", "err");
          return true;
        }
        try {
          await adminUpdateVehicle(v.id, { tariff_id: tariffId, reg_number: reg, pts, pts_photo: ptsPhoto });
          toast("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
          refreshVehScreens();
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  var pdVehicles = [];
  function openPartnerDetail(userId) {
    const close = openModal({
      title: "\u041F\u0430\u0440\u0442\u043D\u0451\u0440",
      bodyHTML: `<div class="ar-sub" id="pdBody" style="padding:30px 0;text-align:center;">\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026</div>`,
      actions: []
    });
    (async () => {
      var _a;
      let p, allVeh = [];
      try {
        [p, allVeh] = await Promise.all([adminPartnerDetail(userId), adminListVehicles(null).catch(() => [])]);
      } catch (e) {
        toast(e.message, "err");
        close();
        return;
      }
      if (!p) {
        toast("\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", "err");
        close();
        return;
      }
      pdVehicles = allVeh.filter((v) => v.user_id === userId);
      const body = document.getElementById("pdBody");
      if (!body) return;
      const row = (l, v) => `<div style="display:flex;justify-content:space-between;gap:12px;"><span class="ar-sub">${l}</span><span style="text-align:right;font-weight:600;">${esc(v || "\u2014")}</span></div>`;
      const vehRows = pdVehicles.length ? pdVehicles.map((v) => {
        const [sc, sl] = VEH_STAT[v.status] || ["is-work", v.status];
        const isPaid = v.paid_until && new Date(v.paid_until) > /* @__PURE__ */ new Date();
        const pay = v.status === "approved" ? isPaid ? "\u043E\u043F\u043B\u0430\u0447\u0435\u043D" : "\u0436\u0434\u0451\u0442 \u043E\u043F\u043B\u0430\u0442\u044B" : "";
        return `<div class="ar-taprow" data-pveh="${v.id}">
        <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${v.type_name || "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442"}${v.reg_number ? " \xB7 " + esc(v.reg_number) : ""}</div>
          <div class="ar-rsub">${money(v.monthly_fee)}/\u043C\u0435\u0441${pay ? " \xB7 " + pay : ""}</div></div>
        <span class="ar-pill ${sc}" style="font-size:9.5px;flex-shrink:0;">${sl}</span>
        <i class="fa-solid fa-chevron-right ar-chev"></i></div>`;
      }).join("") : `<div class="ar-sub" style="padding:12px;">\u041C\u0430\u0448\u0438\u043D \u043D\u0435\u0442</div>`;
      const blockLabel = p.status === "blocked" ? "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430" : "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430";
      body.style.padding = "0";
      body.style.textAlign = "left";
      body.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px;">
        ${row("\u0422\u0435\u043B\u0435\u0444\u043E\u043D", p.phone ? formatPhone(p.phone) : "")}
        ${row("E-mail", p.email)}
        ${row("\u0421\u0442\u0430\u0442\u0443\u0441", p.is_banned ? "\u{1F6AB} \u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0437\u0430\u0431\u0430\u043D\u0435\u043D" : p.status === "active" ? "\u0410\u043A\u0442\u0438\u0432\u0435\u043D" : "\u{1F512} \u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D")}
        ${row("\u042E\u0440. \u0444\u043E\u0440\u043C\u0430", LEGAL[p.legal_status] || p.legal_status)}
        ${row("\u042E\u0440. \u0438\u043C\u044F", p.legal_name)}
        <div class="ar-hr" style="margin:4px 0;"></div>
        ${row("\u041F\u0430\u0441\u043F\u043E\u0440\u0442", p.passport)}
        ${docPhoto("\u0424\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430", p.passport_photo)}
        <div class="ar-flabel" style="margin-top:4px;">\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \xB7 ${pdVehicles.length}</div>
        <div class="ar-taplist">${vehRows}</div>
        <div class="ar-hr" style="margin:4px 0;"></div>
        ${row("\u0417\u0430\u043A\u0430\u0437\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E", (_a = p.done_count) != null ? _a : 0)}
        ${row("\u0417\u0430\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E \u0432\u0441\u0435\u0433\u043E", money(p.earned_total))}
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px;">
          <button class="ar-btn" id="pdEdit">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>
          <button class="ar-btn ar-ghost" id="pdGrant"><i class="fa-solid fa-gift"></i> \u0412\u044B\u0434\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F</button>
          <button class="ar-btn ar-ghost" id="pdBlock">${blockLabel}</button>
          <div id="pdDelete" style="text-align:center;font-size:13px;font-weight:700;color:var(--pink-deep);cursor:pointer;padding:4px 0;">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430</div>
        </div>
      </div>`;
      body.querySelectorAll("[data-pveh]").forEach((r) => r.addEventListener("click", () => openVehicleDetail(r.getAttribute("data-pveh"))));
      body.querySelector("#pdEdit").addEventListener("click", () => openPartnerEditor(p));
      body.querySelector("#pdGrant").addEventListener("click", () => openGrantDays({ vehicles: pdVehicles, title: "\u0414\u043E\u0441\u0442\u0443\u043F \u0434\u043B\u044F " + (p.name || "\u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430"), onDone: () => {
        close();
        refreshVehScreens();
      } }));
      body.querySelector("#pdBlock").addEventListener("click", async () => {
        const next = p.status === "blocked" ? "active" : "blocked";
        if (next === "blocked" && !confirm("\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C? \u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u0441\u0442\u0430\u043D\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D (\u043A\u0430\u043A \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A \u043E\u043D \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F).")) return;
        try {
          await adminSetPartnerStatus(userId, next);
          toast(next === "blocked" ? "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0438\u0439 \u0440\u0435\u0436\u0438\u043C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D" : "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D");
          close();
          refreshVehScreens();
        } catch (e) {
          toast(e.message, "err");
        }
      });
      body.querySelector("#pdDelete").addEventListener("click", async () => {
        if (!confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430? \u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u0442\u0432\u043E \u0438 \u0432\u0435\u0441\u044C \u0435\u0433\u043E \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B, \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u043E\u0441\u0442\u0430\u043D\u0435\u0442\u0441\u044F \u043A\u0430\u043A \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A.")) return;
        try {
          await adminDeletePartner(userId);
          toast("\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u0443\u0434\u0430\u043B\u0451\u043D");
          close();
          refreshVehScreens();
        } catch (e) {
          toast(e.message, "err");
        }
      });
    })();
  }
  function openPartnerEditor(p) {
    let legal2 = p.legal_status;
    let passPhoto = p.passport_photo || null, ptsPhoto = p.pts_photo || null;
    const fld = (id, label, val) => `<div><div class="ar-flabel">${label}</div><div class="ar-field"><input id="${id}" type="text" value="${(val != null ? val : "").toString().replace(/"/g, "&quot;")}"></div></div>`;
    openModal({
      title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${fld("pe_name", "\u0418\u043C\u044F", p.name)}
        ${fld("pe_phone", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", p.phone)}
        ${fld("pe_email", "E-mail", p.email)}
        ${fld("pe_legalname", "\u042E\u0440. \u0438\u043C\u044F", p.legal_name)}
        <div><div class="ar-flabel">\u042E\u0440. \u0444\u043E\u0440\u043C\u0430</div>
          <div class="ar-seg" id="pe_legal">
            <div class="${p.legal_status === "self_employed" ? "is-on" : ""}" data-ls="self_employed">\u0424\u0438\u0437 \u043B\u0438\u0446\u043E</div>
            <div class="${p.legal_status === "ip" ? "is-on" : ""}" data-ls="ip">\u0418\u041F</div>
            <div class="${p.legal_status === "ooo" ? "is-on" : ""}" data-ls="ooo">\u041E\u041E\u041E</div></div></div>
        <div class="ar-flabel" style="margin-top:2px;">\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B</div>
        ${fld("pe_passport", "\u041F\u0430\u0441\u043F\u043E\u0440\u0442", p.passport)}
        <button type="button" class="ar-btn ar-ghost ar-sm" id="pePassBtn"><i class="fa-solid fa-camera"></i> \u0424\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430</button>
        <div id="pePassPrev">${p.passport_photo ? `<img src="${p.passport_photo}" style="max-height:110px;max-width:100%;border-radius:10px;margin-top:8px;display:block;">` : ""}</div>
        ${fld("pe_equip", "\u0413\u043E\u0441. \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u0445\u043D\u0438\u043A\u0438", p.equipment_number)}
        ${fld("pe_pts", "\u041F\u0422\u0421", p.pts)}
        <button type="button" class="ar-btn ar-ghost ar-sm" id="pePtsBtn"><i class="fa-solid fa-camera"></i> \u0424\u043E\u0442\u043E \u041F\u0422\u0421</button>
        <div id="pePtsPrev">${p.pts_photo ? `<img src="${p.pts_photo}" style="max-height:110px;max-width:100%;border-radius:10px;margin-top:8px;display:block;">` : ""}</div>
      </div>`,
      onMount: (el) => {
        el.querySelectorAll("#pe_legal [data-ls]").forEach((d) => d.addEventListener("click", () => {
          legal2 = d.getAttribute("data-ls");
          el.querySelectorAll("#pe_legal [data-ls]").forEach((x) => x.classList.toggle("is-on", x === d));
        }));
        wireDocPhoto(el, "#pePassBtn", "#pePassPrev", (u) => {
          passPhoto = u;
        });
        wireDocPhoto(el, "#pePtsBtn", "#pePtsPrev", (u) => {
          ptsPhoto = u;
        });
      },
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        const v = (id) => {
          const e = document.getElementById(id);
          return e ? e.value.trim() : "";
        };
        try {
          await adminUpdateUser(p.user_id, { name: v("pe_name"), email: v("pe_email"), phone: v("pe_phone") });
          await adminUpdatePartner(p.user_id, {
            legal_status: legal2,
            legal_name: v("pe_legalname"),
            passport: v("pe_passport"),
            equipment_number: v("pe_equip"),
            pts: v("pe_pts"),
            passport_photo: passPhoto,
            pts_photo: ptsPhoto
          });
          toast("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  var aUF = "all";
  var aUQuery = "";
  var aUsers = [];
  var U_VMAP = { pending: ["is-new", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"], approved: ["is-done", "\u043E\u043A"], rejected: ["is-work", "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D"] };
  var aURole = "customer";
  async function renderUsers() {
    const body = document.getElementById("aUsersBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    try {
      aUsers = await adminGetUsers(aUF === "all" ? null : aUF);
    } catch (e) {
      aUsers = [];
    }
    const roleSeg = `<div class="ar-seg" id="aUsersRole" style="margin-bottom:10px;">
    <div class="${aURole === "customer" ? "is-on" : ""}" data-urole="customer">\u041E\u0431\u044B\u0447\u043D\u044B\u0435</div>
    <div class="${aURole === "partner" ? "is-on" : ""}" data-urole="partner">\u0421 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u0442\u0432\u043E\u043C</div></div>`;
    const chips = [["all", "\u0412\u0441\u0435"], ["pending", "\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"], ["approved", "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B"], ["rejected", "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u044B"]].map(([k, l]) => `<div class="ar-chip ${k === aUF ? "is-on" : ""}" data-uf="${k}">${l}</div>`).join("");
    body.innerHTML = `
    <div class="ar-online" id="aOnline">
      <div class="ar-online-card"><span class="ar-online-dot"></span><div><div class="ar-online-num" id="aOnPartners">\u2026</div><div class="ar-online-lbl">\u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432 \u043E\u043D\u043B\u0430\u0439\u043D</div></div></div>
      <div class="ar-online-card"><span class="ar-online-dot"></span><div><div class="ar-online-num" id="aOnUsers">\u2026</div><div class="ar-online-lbl">\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043E\u043D\u043B\u0430\u0439\u043D</div></div></div>
    </div>
    ${roleSeg}
    <div class="ar-chips" style="overflow-x:auto;flex-wrap:nowrap;">${chips}</div>
    <div class="ar-field" style="margin-top:12px;margin-bottom:10px;"><i class="fa-solid fa-magnifying-glass"></i>
      <input id="aUsersSearch" type="text" placeholder="\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043C\u0435\u043D\u0438 \u0438\u043B\u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443" value="${aUQuery.replace(/"/g, "&quot;")}"></div>
    <div class="ar-card" style="padding:0;" id="aUsersList"></div><div style="height:8px;"></div>`;
    drawUsers();
    startOnlineRefresh();
  }
  var onlineTimer = null;
  async function refreshOnline() {
    var _a, _b;
    if (currentScreen() !== "a-users") {
      if (onlineTimer) {
        clearInterval(onlineTimer);
        onlineTimer = null;
      }
      return;
    }
    let c = { partners_online: 0, customers_online: 0 };
    try {
      c = await adminOnlineCounts();
    } catch (e) {
    }
    const p = document.getElementById("aOnPartners");
    const u = document.getElementById("aOnUsers");
    if (p) p.textContent = (_a = c.partners_online) != null ? _a : 0;
    if (u) u.textContent = (_b = c.customers_online) != null ? _b : 0;
  }
  function startOnlineRefresh() {
    if (onlineTimer) clearInterval(onlineTimer);
    refreshOnline();
    onlineTimer = setInterval(refreshOnline, 15e3);
  }
  function drawUsers() {
    const list = document.getElementById("aUsersList");
    if (!list) return;
    const items = aUsers.filter((u) => !u.is_admin && u.role === aURole && personMatches(u, aUQuery));
    if (!items.length) {
      list.innerHTML = `<div class="ar-sub" style="padding:14px;">${aUQuery ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" : "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043D\u0435\u0442"}</div>`;
      return;
    }
    list.innerHTML = items.map((u) => {
      const [vc, vl] = u.is_banned ? ["is-work", "\u0437\u0430\u0431\u0430\u043D\u0435\u043D"] : U_VMAP[u.verification_status] || ["is-work", u.verification_status];
      return `<div class="ar-row" data-user="${u.id}" style="cursor:pointer;">
      <div class="ar-ava" style="width:36px;height:36px;font-size:13px;">${(u.name || "?")[0].toUpperCase()}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:700;">${esc(u.name || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438")}${u.is_banned ? " \u{1F6AB}" : ""}</div><div class="ar-rsub">${formatPhone(u.phone)}</div></div>
      <span class="ar-pill ${vc}" style="font-size:9.5px;">${vl}</span></div>`;
    }).join("");
    staggerIn(list);
  }
  async function openUserDetail(userId) {
    let u;
    try {
      u = await adminUserDetail(userId);
    } catch (e) {
      toast(e.message, "err");
      return;
    }
    if (!u) return;
    const cached = aUsers.find((x) => x.id === userId);
    u.name = (cached == null ? void 0 : cached.name) || u.name || "";
    openModal({
      title: u.name || "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:8px;font-size:13.5px;">
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">\u0418\u043C\u044F</span><span>${esc(u.name || "\u2014")}</span></div>
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</span><span class="ar-mono">${formatPhone(u.phone)}</span></div>
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">E-mail</span><span>${esc(u.email || "\u2014")}</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><span class="ar-sub">\u041F\u0430\u0440\u043E\u043B\u044C</span>
          <span style="display:flex;align-items:center;gap:8px;"><span id="uPwVal" class="ar-mono" style="font-weight:600;">\u2022\u2022\u2022\u2022\u2022\u2022</span>
          <i id="uPwToggle" class="fa-regular fa-eye" style="cursor:pointer;color:var(--ink-3);"></i></span></div>
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">\u0420\u043E\u043B\u044C</span><span>${u.role === "partner" ? "\u041F\u0430\u0440\u0442\u043D\u0451\u0440" : "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A"}</span></div>
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">\u0421\u0442\u0430\u0442\u0443\u0441</span><span>${u.is_banned ? "\u{1F6AB} \u0417\u0430\u0431\u0430\u043D\u0435\u043D" : u.verification_status}</span></div>
        <div style="display:flex;justify-content:space-between;"><span class="ar-sub">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</span><span>${u.created_at ? new Date(u.created_at).toLocaleDateString("ru-RU") : "\u2014"}</span></div>
      </div>`,
      onMount: (el) => {
        const toggle = el.querySelector("#uPwToggle");
        const valEl = el.querySelector("#uPwVal");
        let shown = false, pw = null;
        toggle == null ? void 0 : toggle.addEventListener("click", async () => {
          shown = !shown;
          toggle.className = shown ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
          if (!shown) {
            valEl.textContent = "\u2022\u2022\u2022\u2022\u2022\u2022";
            return;
          }
          if (pw === null) {
            valEl.textContent = "\u2026";
            try {
              pw = await adminGetUserPassword(userId);
            } catch (e) {
              pw = "";
            }
          }
          valEl.textContent = pw || "\u2014";
        });
      },
      actions: [
        { label: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435", primary: true, onClick: () => {
          openUserEditor(u);
          return true;
        } },
        { label: u.is_banned ? "\u0420\u0430\u0437\u0431\u0430\u043D\u0438\u0442\u044C" : "\u0417\u0430\u0431\u0430\u043D\u0438\u0442\u044C", onClick: async () => {
          if (!u.is_banned && !confirm("\u0417\u0430\u0431\u0430\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F? \u041E\u043D \u043D\u0435 \u0441\u043C\u043E\u0436\u0435\u0442 \u0432\u043E\u0439\u0442\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435.")) return true;
          try {
            await adminSetUserBan(userId, !u.is_banned);
            toast(u.is_banned ? "\u0420\u0430\u0437\u0431\u0430\u043D\u0435\u043D" : "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0437\u0430\u0431\u0430\u043D\u0435\u043D");
            renderUsers();
          } catch (e) {
            toast(e.message, "err");
            return true;
          }
          return false;
        } },
        { label: u.verification_status === "approved" ? "\u0421\u043D\u044F\u0442\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435" : "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C", onClick: async () => {
          try {
            await adminSetVerification(userId, u.verification_status === "approved" ? "pending" : "approved");
            toast("\u0413\u043E\u0442\u043E\u0432\u043E");
            renderUsers();
          } catch (e) {
            toast(e.message, "err");
          }
          return false;
        } },
        { label: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F", onClick: async () => {
          if (!confirm("\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E?")) return true;
          try {
            await adminDeleteUser(userId);
            toast("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0434\u0430\u043B\u0451\u043D");
            renderUsers();
          } catch (e) {
            toast(e.message, "err");
          }
          return false;
        } }
      ]
    });
  }
  function openUserEditor(u) {
    const fld = (id, label, val, type = "text") => `<div><div class="ar-flabel">${label}</div><div class="ar-field"><input id="${id}" type="${type}" value="${(val != null ? val : "").toString().replace(/"/g, "&quot;")}"></div></div>`;
    openModal({
      title: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435",
      bodyHTML: `<div style="display:flex;flex-direction:column;gap:12px;">
      ${fld("ue_name", "\u0418\u043C\u044F", u.name)}
      ${fld("ue_phone", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", u.phone, "tel")}
      ${fld("ue_email", "E-mail", u.email, "email")}
    </div>`,
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        const v = (id) => {
          const e = document.getElementById(id);
          return e ? e.value.trim() : "";
        };
        try {
          await adminUpdateUser(u.id, { name: v("ue_name"), email: v("ue_email"), phone: v("ue_phone") });
          toast("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
          renderUsers();
        } catch (er) {
          toast(er.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  function chatAvatarHTML(avatarUrl, name) {
    if (avatarUrl) return `<div class="ar-chat-ava"><img src="${avatarUrl}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div>`;
    const letter = ((name || "?").trim()[0] || "?").toUpperCase();
    return `<div class="ar-chat-ava">${letter}</div>`;
  }
  var aChatsCache = [];
  var aChatsFilter = "all";
  async function renderAdminChats() {
    setupAdminRealtime();
    if (aUnsub) {
      aUnsub();
      aUnsub = null;
    }
    const list = document.getElementById("aChatsList");
    list.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    try {
      aChatsCache = await adminListSupportChats();
    } catch (e) {
      aChatsCache = [];
    }
    drawAdminChats();
  }
  function drawAdminChats() {
    const list = document.getElementById("aChatsList");
    if (!list) return;
    const seg = `<div class="ar-seg" id="aChatsSeg" style="margin-bottom:10px;">
    <div class="${aChatsFilter === "all" ? "is-on" : ""}" data-cf="all">\u0412\u0441\u0435</div>
    <div class="${aChatsFilter === "customer" ? "is-on" : ""}" data-cf="customer">\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0438</div>
    <div class="${aChatsFilter === "partner" ? "is-on" : ""}" data-cf="partner">\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u044B</div></div>`;
    const items = aChatsCache.filter((c) => aChatsFilter === "all" || (c.customer_role || "customer") === aChatsFilter);
    list.innerHTML = `<button class="ar-btn ar-sm ar-ghost" id="aNewChat" style="margin-bottom:8px;"><i class="fa-solid fa-plus"></i>\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E</button>${seg}<div id="aChatsRows"></div>`;
    const rows = document.getElementById("aChatsRows");
    if (!items.length) {
      rows.innerHTML = `<div class="ar-sub" style="padding:30px 0;text-align:center;">${aChatsFilter === "all" ? "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439 \u043D\u0435\u0442" : "\u041D\u0435\u0442 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439 \u0432 \u044D\u0442\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435"}</div>`;
      return;
    }
    items.forEach((c) => {
      const time = c.last_message_at ? new Date(c.last_message_at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
      const unread = Number(c.unread_count) > 0;
      const roleBadge = (c.customer_role || "customer") === "partner" ? `<span class="ar-pill is-done" style="font-size:9px;padding:2px 6px;margin-left:6px;">\u043F\u0430\u0440\u0442\u043D\u0451\u0440</span>` : "";
      const el = document.createElement("div");
      el.className = "ar-chat-row";
      el.innerHTML = `${chatAvatarHTML(c.customer_avatar, c.customer_name || c.customer_phone)}
      <div style="flex:1;min-width:0;"><div class="ar-chat-name">${esc(c.customer_name || formatPhone(c.customer_phone))}${roleBadge}</div>
      <div class="ar-chat-prev">${esc(c.last_message || "\u041D\u0435\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439")}</div></div>
      <div style="text-align:right;"><div class="ar-chat-time">${time}</div>${unread ? `<span class="ar-pill is-new" style="font-size:10px;margin-top:4px;padding:2px 7px;">${c.unread_count}</span>` : ""}</div>`;
      el.addEventListener("click", () => openAdminChat(c));
      rows.appendChild(el);
    });
    staggerIn(rows);
  }
  var aChat = null;
  var aUnsub = null;
  function openAdminChat(chat) {
    aChat = chat;
    go("a-chat");
  }
  function aTick(read) {
    return `<span class="ar-tick${read ? " read" : ""}">${read ? "\u2713\u2713 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043E" : "\u2713 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"}</span>`;
  }
  function aAlbumHTML(imgs, hasText) {
    if (!imgs.length) return "";
    const mb = hasText ? ' style="margin-bottom:6px;"' : "";
    if (imgs.length === 1) return `<img class="ar-bubble-img" data-imgview="1" src="${imgs[0]}" alt="\u0444\u043E\u0442\u043E"${mb}>`;
    const cells = imgs.map((src) => `<img class="ar-album-cell" data-imgview="1" src="${src}" alt="\u0444\u043E\u0442\u043E">`).join("");
    const cls = imgs.length === 2 ? "n2" : imgs.length === 3 ? "n3" : "n4";
    return `<div class="ar-album ${cls}"${mb}>${cells}</div>`;
  }
  function aBubble(m) {
    const out = m.sender_id !== aChat.customer_id;
    const wrap = document.createElement("div");
    if (m.id) wrap.dataset.mid = m.id;
    wrap.style.cssText = `display:flex;flex-direction:column;gap:4px;align-items:${out ? "flex-end" : "flex-start"};`;
    const time = m.created_at ? new Date(m.created_at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "";
    const tick = out ? ` \xB7 <span class="ar-tickwrap">${aTick(!!m.read)}</span>` : "";
    const imgHTML = aAlbumHTML(parseImages(m.image_url), m.message);
    const textHTML = m.message ? `<div class="ar-bubble ${out ? "out" : "in"}"></div>` : "";
    wrap.innerHTML = `${imgHTML}${textHTML}<div class="ar-tstamp">${time}${tick}</div>`;
    if (m.message) wrap.querySelector(".ar-bubble").textContent = m.message;
    return wrap;
  }
  async function renderAdminChatDialog() {
    if (!aChat) {
      go("a-chats");
      return;
    }
    document.getElementById("aChatTitle").textContent = aChat.customer_name || formatPhone(aChat.customer_phone) || "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430";
    document.getElementById("aChatSub").textContent = formatPhone(aChat.customer_phone) + " \xB7 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430";
    const headAva = document.getElementById("aChatHeadAva");
    if (headAva) {
      if (aChat.customer_avatar) {
        headAva.classList.remove("support");
        headAva.innerHTML = `<img src="${aChat.customer_avatar}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
      } else {
        headAva.classList.remove("support");
        headAva.textContent = ((aChat.customer_name || aChat.customer_phone || "?").trim()[0] || "?").toUpperCase();
      }
    }
    const box = document.getElementById("aChatMessages");
    box.innerHTML = "";
    const seen = /* @__PURE__ */ new Set();
    let msgs = [];
    try {
      msgs = await adminChatMessages(aChat.id);
    } catch (e) {
    }
    markChatRead(aChat.id);
    msgs.forEach((m) => {
      if (m.id) seen.add(m.id);
      box.appendChild(aBubble(m));
    });
    box.scrollTop = box.scrollHeight;
    if (aUnsub) {
      aUnsub();
      aUnsub = null;
    }
    aUnsub = subscribeMessages(
      aChat.id,
      (m) => {
        if (!m.id || seen.has(m.id)) return;
        seen.add(m.id);
        box.appendChild(aBubble(m));
        box.scrollTop = box.scrollHeight;
        if (m.sender_id === aChat.customer_id) markChatRead(aChat.id);
      },
      (m) => {
        const wrap = box.querySelector(`[data-mid="${m.id}"] .ar-tickwrap`);
        if (wrap) wrap.innerHTML = aTick(!!m.read);
      }
    );
  }
  async function renderPrices() {
    const body = document.getElementById("aPricesBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    let items = [];
    try {
      items = await adminListCatalog();
    } catch (e) {
    }
    const priceField = { material: "base_price", equipment: "price_per_hour", service: "base_price" };
    const unit = { material: " \u20BD/\u043C\xB3", equipment: " \u20BD/\u0447", service: " \u20BD" };
    const grp = (title, arr) => arr.length ? `<div class="ar-flabel">${title}</div><div class="ar-taplist" style="margin-bottom:14px;">${arr.map((p) => {
      const f = priceField[p.category];
      const off = !p.is_available;
      return `<div class="ar-taprow" style="${off ? "opacity:.55;" : ""}">
      <div data-edit="${p.id}" style="flex:1;min-width:0;cursor:pointer;">
        <div style="font-size:13.5px;font-weight:700;">${p.product_name}${p.fraction ? " \xB7 " + p.fraction : ""}${off ? ' <span class="ar-pill" style="font-size:9px;padding:2px 6px;background:#eef0f4;color:var(--ink-3);">\u0432\u044B\u043A\u043B</span>' : ""}</div>
        <div class="ar-rsub"><span class="ar-mono">${money(p[f])}${unit[p.category] || ""}</span>${p.category === "equipment" ? ` \xB7 \u043F\u043E\u0434\u0430\u0447\u0430 ${money(p.city_delivery)} \xB7 \u043C\u0438\u043D ${p.min_hours || 1} \u0447` : ""}</div>
      </div>
      <div class="adm-toggle${p.is_available ? " on" : ""}" data-priceid="${p.id}" data-cur="${p.is_available}"></div></div>`;
    }).join("")}</div>` : "";
    body.innerHTML = `${grp("\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \xB7 \u0437\u0430 \u043C\xB3", items.filter((i) => i.category === "material"))}
    ${grp("\u0422\u0435\u0445\u043D\u0438\u043A\u0430 \xB7 \u0437\u0430 \u0447\u0430\u0441", items.filter((i) => i.category === "equipment"))}
    ${grp("\u0423\u0441\u043B\u0443\u0433\u0438", items.filter((i) => i.category === "service"))}<div style="height:12px;"></div>`;
    body._items = items;
  }
  function openPriceEditor(p) {
    const fld = (id, label, val) => `<div><div class="ar-flabel">${label}</div><div class="ar-field"><input id="${id}" type="number" inputmode="numeric" value="${val != null ? val : ""}"></div></div>`;
    let fields = "";
    if (p.category === "material") {
      fields = fld("f_base", "\u0426\u0435\u043D\u0430 \u0437\u0430 \u043C\xB3, \u20BD", p.base_price);
    } else if (p.category === "equipment") {
      fields = fld("f_hour", "\u0426\u0435\u043D\u0430 \u0437\u0430 \u0447\u0430\u0441, \u20BD", p.price_per_hour) + fld("f_min", "\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0447\u0430\u0441\u043E\u0432", p.min_hours) + fld("f_city", "\u041F\u043E\u0434\u0430\u0447\u0430 \u043F\u043E \u0433\u043E\u0440\u043E\u0434\u0443, \u20BD", p.city_delivery) + fld("f_out", "\u041F\u043E\u0434\u0430\u0447\u0430 \u0437\u0430 \u0433\u043E\u0440\u043E\u0434, \u20BD", p.out_of_city_delivery);
    } else {
      fields = fld("f_base", "\u0426\u0435\u043D\u0430, \u20BD", p.base_price);
    }
    openModal({
      title: `${p.product_name}${p.fraction ? " \xB7 " + p.fraction : ""}`,
      bodyHTML: `<div style="display:flex;flex-direction:column;gap:12px;">${fields}</div>`,
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
        const num = (id) => {
          const v = document.getElementById(id);
          return v && v.value !== "" ? Number(v.value) : null;
        };
        const upd = {};
        if (p.category === "equipment") {
          if (num("f_hour") != null) upd.price_per_hour = num("f_hour");
          if (num("f_min") != null) upd.min_hours = num("f_min");
          if (num("f_city") != null) upd.city_delivery = num("f_city");
          if (num("f_out") != null) upd.out_of_city_delivery = num("f_out");
        } else {
          if (num("f_base") != null) upd.base_price = num("f_base");
        }
        if (!Object.keys(upd).length) {
          toast("\u041D\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439", "err");
          return true;
        }
        try {
          await adminUpdatePrice(p.id, upd);
          toast("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
          renderPrices();
        } catch (er) {
          toast(er.message, "err");
        }
        return false;
      } }]
    });
  }
  async function renderSettings() {
    const body = document.getElementById("aSettingsBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    let s = {}, admins = [];
    try {
      s = await adminGetSettings();
    } catch (e) {
    }
    try {
      admins = await adminListAdmins();
    } catch (e) {
    }
    const row = (k, l, v) => `<div class="ar-row" data-setting="${k}" data-label="${l}" style="cursor:pointer;"><div style="flex:1;font-size:13.5px;font-weight:700;">${l}</div><span class="ar-mono" style="font-size:13.5px;color:var(--ink-2);">${v}</span><i class="fa-solid fa-chevron-right ar-chev" style="margin-left:10px;"></i></div>`;
    const adminRows = (admins || []).map((a) => `<div class="ar-row">
    <div class="ar-ava" style="width:36px;height:36px;font-size:13px;">${a.is_main ? "\u2605" : (a.name || "\u0410")[0]}</div>
    <div style="flex:1;"><div style="font-size:13.5px;font-weight:700;">${a.name || (a.is_main ? "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0430\u0434\u043C\u0438\u043D" : "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440")}</div><div class="ar-rsub ar-mono">${formatPhone(a.phone)}</div></div>
    ${a.is_main ? `<span class="ar-pill is-new" style="font-size:10px;"><i class="fa-solid fa-crown" style="font-size:8px;"></i>\u0433\u043B\u0430\u0432\u043D\u044B\u0439</span>` : `<span class="ar-pill is-work" style="font-size:10px;cursor:pointer;" data-revoke="${a.id}">\u0441\u043D\u044F\u0442\u044C</span>`}</div>`).join("");
    body.innerHTML = `
    <div class="ar-flabel">\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</div>
    <div class="ar-card" style="padding:0;">${row("distance_surcharge_km", "\u0420\u0430\u0434\u0438\u0443\u0441 \xAB\u0433\u043E\u0440\u043E\u0434\u0430\xBB, \u043A\u043C", s.distance_surcharge_km || "10")}</div>
    <div class="ar-sub" style="font-size:11.5px;margin:6px 2px 0;">\u0414\u0430\u043B\u044C\u0448\u0435 \u044D\u0442\u043E\u0433\u043E \u0440\u0430\u0434\u0438\u0443\u0441\u0430 \u043E\u0442 \u0446\u0435\u043D\u0442\u0440\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \xAB\u0437\u0430 \u0433\u043E\u0440\u043E\u0434\xBB (\u043F\u043E\u0432\u044B\u0448\u0435\u043D\u043D\u0430\u044F \u043F\u043E\u0434\u0430\u0447\u0430).</div>
    <div class="ar-flabel" style="margin-top:14px;">\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432</div>
    <div class="ar-card" style="padding:0;"><div class="ar-row" id="aTariffs" style="cursor:pointer;"><div class="ar-ric"><i class="fa-solid fa-truck-pickup"></i></div><div style="flex:1;font-size:13.5px;font-weight:700;">\u0422\u0430\u0440\u0438\u0444\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0430</div><i class="fa-solid fa-chevron-right ar-chev"></i></div></div>
    <div class="ar-flabel">\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u044B</div>
    <div class="ar-card" style="padding:0;">${adminRows || `<div class="ar-sub" style="padding:14px;">\u0422\u043E\u043B\u044C\u043A\u043E \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0430\u0434\u043C\u0438\u043D \u043C\u043E\u0436\u0435\u0442 \u0432\u0438\u0434\u0435\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A</div>`}</div>
    <div style="padding:14px 0 32px;"><button class="ar-btn ar-ghost" id="aAddAdmin"><i class="fa-solid fa-plus"></i>\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430</button></div>`;
  }
  var bcAud = "both";
  async function renderBroadcast() {
    const body = document.getElementById("aBroadcastBody");
    body.innerHTML = `<div class="ar-sub" style="padding:18px 0;">\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026</div>`;
    let hist = [];
    try {
      hist = await adminListBroadcasts();
    } catch (e) {
    }
    const audName = { all: "\u0412\u0441\u0435\u043C", both: "\u0412\u0441\u0435\u043C", partner: "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C", executor: "\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C", customer: "\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C" };
    const list = (hist || []).length ? hist.map((b) => {
      var _a;
      return `<div class="ar-row"><div class="ar-ric"><i class="fa-solid fa-bullhorn"></i></div><div style="flex:1;"><div style="font-size:13px;font-weight:700;">${b.title}</div><div class="ar-rsub">${audName[b.target_role] || b.target_role} \xB7 ${new Date(b.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}</div></div><span class="ar-mono" style="font-size:12px;color:var(--green);">${(_a = b.sent_count) != null ? _a : 0}</span></div>`;
    }).join("") : `<div class="ar-sub" style="padding:14px;">\u0420\u0430\u0441\u0441\u044B\u043B\u043E\u043A \u043D\u0435 \u0431\u044B\u043B\u043E</div>`;
    body.innerHTML = `
    <div class="ar-card" style="padding:16px;display:flex;flex-direction:column;gap:13px;">
      <div style="font-size:14.5px;font-weight:800;">\u041D\u043E\u0432\u0430\u044F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430</div>
      <div><div class="ar-flabel" style="margin-bottom:7px;">\u041A\u043E\u043C\u0443</div><div class="ar-seg" id="bcSeg">
        <div class="${bcAud === "both" ? "is-on" : ""}" data-aud="both">\u0412\u0441\u0435\u043C</div>
        <div class="${bcAud === "partner" ? "is-on" : ""}" data-aud="partner">\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C</div>
        <div class="${bcAud === "customer" ? "is-on" : ""}" data-aud="customer">\u0417\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C</div></div></div>
      <div><div class="ar-flabel">\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A</div><div class="ar-field"><input id="bcTitle" type="text" placeholder="\u041D\u0430\u043F\u0440. \u041D\u043E\u0432\u044B\u0435 \u0442\u0430\u0440\u0438\u0444\u044B"></div></div>
      <div><div class="ar-flabel">\u0422\u0435\u043A\u0441\u0442</div><div class="ar-field"><input id="bcBody" type="text" placeholder="\u0422\u0435\u043A\u0441\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F"></div></div>
      <button class="ar-btn" id="bcSend"><i class="fa-solid fa-bullhorn"></i>\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C push</button></div>
    <div class="ar-flabel">\u0418\u0441\u0442\u043E\u0440\u0438\u044F</div><div class="ar-card" style="padding:0;">${list}</div><div style="height:12px;"></div>`;
  }
  function initAdmin() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    fillAdminNav();
    initImageViewer();
    onShow("a-dash", renderDash);
    onShow("a-orders", renderOrders);
    onShow("a-partners", renderPartners);
    onShow("a-transport", renderTransportAdmin);
    onShow("a-users", renderUsers);
    onShow("a-chats", renderAdminChats);
    onShow("a-chat", renderAdminChatDialog);
    onShow("a-prices", renderPrices);
    onShow("a-settings", renderSettings);
    onShow("a-broadcast", renderBroadcast);
    (_a = document.getElementById("aDashBody")) == null ? void 0 : _a.addEventListener("click", (e) => {
      var _a2, _b2;
      const d = e.target.closest("[data-dperiod]");
      if (d) {
        aDashPeriod = d.getAttribute("data-dperiod");
        renderDash();
        return;
      }
      if (e.target.closest("#aDashApply")) {
        aDashFrom = ((_a2 = document.getElementById("aDashFrom")) == null ? void 0 : _a2.value) || "";
        aDashTo = ((_b2 = document.getElementById("aDashTo")) == null ? void 0 : _b2.value) || "";
        if (!aDashFrom) {
          toast("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \xAB\u0421\xBB", "err");
          return;
        }
        renderDash();
        return;
      }
      const st = e.target.closest("[data-stat]");
      if (st) openDashList(st.getAttribute("data-stat"));
    });
    (_b = document.getElementById("aOrdersBody")) == null ? void 0 : _b.addEventListener("input", (e) => {
      if (e.target.id === "aOrdersSearch") {
        aOQuery = e.target.value;
        drawOrders();
      }
    });
    (_c = document.getElementById("aOrdersBody")) == null ? void 0 : _c.addEventListener("click", async (e) => {
      const pf = e.target.closest("[data-operiod]");
      if (pf) {
        aOPeriod = pf.getAttribute("data-operiod");
        document.querySelectorAll("#aOrdersPeriod [data-operiod]").forEach((d) => d.classList.toggle("is-on", d === pf));
        drawOrders();
        return;
      }
      const f = e.target.closest("[data-of]");
      if (f) {
        aOF = f.getAttribute("data-of");
        document.querySelectorAll("#aOrdersBody [data-of]").forEach((d) => d.classList.toggle("is-on", d === f));
        drawOrders();
        return;
      }
      const card2 = e.target.closest("[data-order]");
      if (card2) openAdminOrderDetail(card2.getAttribute("data-order"));
    });
    (_d = document.getElementById("aPartnersBody")) == null ? void 0 : _d.addEventListener("input", (e) => {
      if (e.target.id === "aPartnersSearch") {
        aPQuery = e.target.value;
        drawPartners();
      }
    });
    (_e = document.getElementById("aPartnersBody")) == null ? void 0 : _e.addEventListener("click", async (e) => {
      const ap2 = e.target.closest("[data-approve]");
      if (ap2) {
        ap2.disabled = true;
        try {
          await adminApproveApplication(ap2.getAttribute("data-approve"));
          toast("\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043E\u0434\u043E\u0431\u0440\u0435\u043D");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const rj = e.target.closest("[data-reject]");
      if (rj) {
        rj.disabled = true;
        try {
          await adminRejectApplication(rj.getAttribute("data-reject"));
          toast("\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const tg = e.target.closest("[data-ptoggle]");
      if (tg) {
        e.stopPropagation();
        const next = tg.getAttribute("data-cur") === "active" ? "blocked" : "active";
        try {
          await adminSetPartnerStatus(tg.getAttribute("data-ptoggle"), next);
          toast(next === "active" ? "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D" : "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      if (e.target.closest("#aAddPartner")) {
        openAddPartner();
        return;
      }
      const va = e.target.closest("[data-vapprove]");
      if (va) {
        e.stopPropagation();
        va.disabled = true;
        try {
          await adminSetVehicleStatus(va.getAttribute("data-vapprove"), "approved");
          toast("\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const vr = e.target.closest("[data-vreject]");
      if (vr) {
        e.stopPropagation();
        vr.disabled = true;
        try {
          await adminSetVehicleStatus(vr.getAttribute("data-vreject"), "rejected");
          toast("\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u043E");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const vd = e.target.closest("[data-vehdetail]");
      if (vd) {
        openVehicleDetail(vd.getAttribute("data-vehdetail"));
        return;
      }
      const ad = e.target.closest("[data-appdetail]");
      if (ad) {
        openApplicationDetail(ad.getAttribute("data-appdetail"));
        return;
      }
      const pd = e.target.closest("[data-pdetail]");
      if (pd) openPartnerDetail(pd.getAttribute("data-pdetail"));
    });
    (_f = document.getElementById("aTransportBody")) == null ? void 0 : _f.addEventListener("input", (e) => {
      if (e.target.id === "atSearch") {
        atQuery = e.target.value;
        drawTransportAdmin();
      }
    });
    (_g = document.getElementById("aTransportBody")) == null ? void 0 : _g.addEventListener("click", async (e) => {
      const f = e.target.closest("[data-atf]");
      if (f) {
        atFilter = f.getAttribute("data-atf");
        document.querySelectorAll("#aTransportBody [data-atf]").forEach((d) => d.classList.toggle("is-on", d === f));
        drawTransportAdmin();
        return;
      }
      const va = e.target.closest("[data-vapprove]");
      if (va) {
        e.stopPropagation();
        try {
          await adminSetVehicleStatus(va.getAttribute("data-vapprove"), "approved");
          toast("\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D");
          renderTransportAdmin();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const vr = e.target.closest("[data-vreject]");
      if (vr) {
        e.stopPropagation();
        try {
          await adminSetVehicleStatus(vr.getAttribute("data-vreject"), "rejected");
          toast("\u041E\u0442\u043A\u043B\u043E\u043D\u0451\u043D");
          renderTransportAdmin();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const vb = e.target.closest("[data-vblock]");
      if (vb) {
        e.stopPropagation();
        if (!confirm("\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442? \u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043D\u0435 \u0441\u043C\u043E\u0436\u0435\u0442 \u0431\u0440\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0435\u0433\u043E.")) return;
        try {
          await adminSetVehicleStatus(vb.getAttribute("data-vblock"), "rejected");
          toast("\u041E\u0442\u043A\u043B\u044E\u0447\u0451\u043D");
          renderTransportAdmin();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const vd = e.target.closest("[data-atveh]");
      if (vd && !e.target.closest("button") && !e.target.closest(".ar-pill")) openVehicleDetail(vd.getAttribute("data-atveh"));
    });
    (_h = document.getElementById("aUsersBody")) == null ? void 0 : _h.addEventListener("input", (e) => {
      if (e.target.id === "aUsersSearch") {
        aUQuery = e.target.value;
        drawUsers();
      }
    });
    (_i = document.getElementById("aUsersBody")) == null ? void 0 : _i.addEventListener("click", (e) => {
      const rl = e.target.closest("[data-urole]");
      if (rl) {
        aURole = rl.getAttribute("data-urole");
        document.querySelectorAll("#aUsersRole [data-urole]").forEach((d) => d.classList.toggle("is-on", d === rl));
        drawUsers();
        return;
      }
      const f = e.target.closest("[data-uf]");
      if (f) {
        aUF = f.getAttribute("data-uf");
        aUQuery = "";
        renderUsers();
        return;
      }
      const u = e.target.closest("[data-user]");
      if (u) openUserDetail(u.getAttribute("data-user"));
    });
    (_j = document.getElementById("aChatsList")) == null ? void 0 : _j.addEventListener("click", (e) => {
      if (e.target.closest("#aNewChat")) {
        openNewSupportChat();
        return;
      }
      const cf = e.target.closest("[data-cf]");
      if (cf) {
        aChatsFilter = cf.getAttribute("data-cf");
        drawAdminChats();
      }
    });
    (_k = document.getElementById("aChatSend")) == null ? void 0 : _k.addEventListener("click", sendAdminMsg);
    (_l = document.getElementById("aChatInput")) == null ? void 0 : _l.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendAdminMsg();
    });
    (_m = document.getElementById("aChatAttach")) == null ? void 0 : _m.addEventListener("click", () => {
      var _a2;
      return (_a2 = document.getElementById("aChatFile")) == null ? void 0 : _a2.click();
    });
    (_n = document.getElementById("aChatFile")) == null ? void 0 : _n.addEventListener("change", (e) => {
      const fs = [...e.target.files || []];
      e.target.value = "";
      if (fs.length) sendAdminPhotos(fs);
    });
    (_o = document.getElementById("aPricesBody")) == null ? void 0 : _o.addEventListener("click", async (e) => {
      const tg = e.target.closest("[data-priceid]");
      if (tg) {
        e.stopPropagation();
        const next = tg.getAttribute("data-cur") !== "true";
        try {
          await adminTogglePrice(Number(tg.getAttribute("data-priceid")), next);
          renderPrices();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      const row = e.target.closest("[data-edit]");
      if (row) {
        const items = document.getElementById("aPricesBody")._items || [];
        const p = items.find((x) => String(x.id) === row.getAttribute("data-edit"));
        if (p) openPriceEditor(p);
      }
    });
    (_p = document.getElementById("aSettingsBody")) == null ? void 0 : _p.addEventListener("click", async (e) => {
      if (e.target.closest("#aTariffs")) {
        openTariffs();
        return;
      }
      const st = e.target.closest("[data-setting]");
      if (st) {
        const key = st.getAttribute("data-setting");
        const label = st.getAttribute("data-label");
        openModal({
          title: label,
          bodyHTML: `<div class="ar-field"><input id="sv" type="text"></div>`,
          actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C", primary: true, onClick: async () => {
            const v = document.getElementById("sv").value.trim();
            if (!v) {
              toast("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", "err");
              return true;
            }
            try {
              await adminSetSetting(key, v);
              toast("\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E");
              renderSettings();
            } catch (er) {
              toast(er.message, "err");
            }
            return false;
          } }]
        });
        return;
      }
      const rv = e.target.closest("[data-revoke]");
      if (rv) {
        if (!confirm("\u0421\u043D\u044F\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430?")) return;
        try {
          await adminRevoke(rv.getAttribute("data-revoke"));
          toast("\u041F\u0440\u0430\u0432\u0430 \u0441\u043D\u044F\u0442\u044B");
          renderSettings();
        } catch (er) {
          toast(er.message, "err");
        }
        return;
      }
      if (e.target.closest("#aAddAdmin")) openModal({
        title: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430",
        bodyHTML: `<div class="ar-flabel">\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div><div class="ar-field"><i class="fa-solid fa-phone"></i><input id="adp" type="tel" placeholder="+7 (XXX) XXX-XX-XX"></div><div class="ar-sub" style="font-size:11.5px;margin-top:8px;">\u041D\u0430\u0437\u043D\u0430\u0447\u0430\u0442\u044C \u043C\u043E\u0436\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u0430\u0434\u043C\u0438\u043D.</div>`,
        actions: [{ label: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C", primary: true, onClick: async () => {
          const p = document.getElementById("adp").value.replace(/\D/g, "");
          if (p.length < 11) {
            toast("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440", "err");
            return true;
          }
          try {
            await adminGrantByPhone(p);
            toast("\u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D");
            renderSettings();
          } catch (er) {
            toast(er.message, "err");
          }
          return false;
        } }]
      });
    });
    (_q = document.getElementById("aBroadcastBody")) == null ? void 0 : _q.addEventListener("click", async (e) => {
      const a = e.target.closest("[data-aud]");
      if (a) {
        bcAud = a.getAttribute("data-aud");
        document.querySelectorAll("#bcSeg [data-aud]").forEach((d) => d.classList.toggle("is-on", d === a));
        return;
      }
      if (e.target.closest("#bcSend")) {
        const t = document.getElementById("bcTitle").value.trim();
        const b = document.getElementById("bcBody").value.trim();
        if (!t || !b) {
          toast("\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u043E\u043B\u044F", "err");
          return;
        }
        try {
          await adminSendBroadcast({ title: t, body: b, audience: bcAud });
          toast("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E");
          renderBroadcast();
        } catch (er) {
          toast(er.message, "err");
        }
      }
    });
  }
  function openAddPartner() {
    let legal2 = "self_employed";
    let passPhoto = null;
    const fld = (id, label, ph) => `<div><div class="ar-flabel">${label}</div><div class="ar-field"><input id="${id}" type="text" placeholder="${ph}"></div></div>`;
    openModal({
      title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430",
      bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div><div class="ar-flabel">\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div><div class="ar-field"><i class="fa-solid fa-phone"></i><input id="apPhone" type="tel" placeholder="+7 (XXX) XXX-XX-XX"></div></div>
        <div><div class="ar-flabel">\u042E\u0440. \u0444\u043E\u0440\u043C\u0430</div>
          <div class="ar-seg" id="ap_legal">
            <div class="is-on" data-ls="self_employed">\u0424\u0438\u0437 \u043B\u0438\u0446\u043E</div>
            <div data-ls="ip">\u0418\u041F</div>
            <div data-ls="ooo">\u041E\u041E\u041E</div></div></div>
        ${fld("apLegalName", "\u042E\u0440. \u0438\u043C\u044F (\u0434\u043B\u044F \u0418\u041F/\u041E\u041E\u041E)", "\u041D\u0430\u043F\u0440. \u041E\u041E\u041E \xAB\u0421\u0442\u0440\u043E\u0439\u043A\u0430\xBB")}
        ${fld("apPassport", "\u041F\u0430\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", "\u0421\u0435\u0440\u0438\u044F, \u043D\u043E\u043C\u0435\u0440, \u043A\u0435\u043C \u0432\u044B\u0434\u0430\u043D")}
        <button type="button" class="ar-btn ar-ghost ar-sm" id="apPassBtn"><i class="fa-solid fa-camera"></i> \u0424\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430</button>
        <div id="apPassPrev"></div>
        <div class="ar-sub" style="font-size:11.5px;">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D. \u0422\u0435\u0445\u043D\u0438\u043A\u0443 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 \u0434\u043E\u0431\u0430\u0432\u0438\u0442 \u0441\u0430\u043C \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435.</div>
      </div>`,
      onMount: (el) => {
        el.querySelectorAll("#ap_legal [data-ls]").forEach((d) => d.addEventListener("click", () => {
          legal2 = d.getAttribute("data-ls");
          el.querySelectorAll("#ap_legal [data-ls]").forEach((x) => x.classList.toggle("is-on", x === d));
        }));
        wireDocPhoto(el, "#apPassBtn", "#apPassPrev", (u) => {
          passPhoto = u;
        });
      },
      actions: [{ label: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430", primary: true, onClick: async () => {
        const v = (id) => {
          const e = document.getElementById(id);
          return e ? e.value.trim() : "";
        };
        const phone = v("apPhone").replace(/\D/g, "");
        if (phone.length < 11) {
          toast("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440", "err");
          return true;
        }
        if (!v("apPassport")) {
          toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", "err");
          return true;
        }
        if (!passPhoto) {
          toast("\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430", "err");
          return true;
        }
        try {
          const uid = await adminFindUserByPhone(phone);
          if (!uid) {
            toast("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", "err");
            return true;
          }
          await adminAddPartner(uid, {
            legal_status: legal2,
            legal_name: legal2 === "self_employed" ? null : v("apLegalName"),
            passport: v("apPassport"),
            passport_photo: passPhoto
          });
          toast("\u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D");
          renderPartners();
        } catch (er) {
          toast(er.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  async function openTariffs() {
    let tariffs = [], catalog = [];
    try {
      [tariffs, catalog] = await Promise.all([adminListTariffs(), adminListCatalog()]);
    } catch (e) {
      toast(e.message, "err");
    }
    const tByName = {};
    tariffs.filter((t) => t.is_active).forEach((t) => {
      tByName[t.name] = t;
    });
    const types = [];
    const seen = /* @__PURE__ */ new Set();
    (catalog || []).forEach((p) => {
      if (!["equipment", "service"].includes(p.category)) return;
      if (seen.has(p.product_name)) return;
      seen.add(p.product_name);
      types.push({ name: p.product_name, category: p.category });
    });
    Object.keys(tByName).forEach((name) => {
      if (!seen.has(name)) {
        seen.add(name);
        types.push({ name, category: tByName[name].requires_vehicle === false ? "service" : "equipment" });
      }
    });
    const rowFor = (x) => {
      const t = tByName[x.name];
      const priceTxt = t ? money(t.monthly_fee) + "/\u043C\u0435\u0441" : "\u0446\u0435\u043D\u0430 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u0430";
      return `<div class="ar-taprow" data-tname="${x.name.replace(/"/g, "&quot;")}" data-tcat="${x.category}">
      <div style="flex:1;font-weight:700;font-size:13.5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${x.name}</div>
      <span class="ar-mono" style="font-size:13px;flex-shrink:0;${t ? "" : "color:var(--pink);"}">${priceTxt}</span>
      <i class="fa-solid fa-chevron-right ar-chev"></i></div>`;
    };
    const group = (title, cat) => {
      const arr = types.filter((x) => x.category === cat);
      if (!arr.length) return "";
      return `<div class="ar-flabel">${title}</div><div class="ar-taplist" style="margin-bottom:14px;">${arr.map(rowFor).join("")}</div>`;
    };
    openModal({
      title: "\u0422\u0430\u0440\u0438\u0444\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
      bodyHTML: `
      <div class="ar-sub" style="font-size:12px;margin-bottom:12px;">\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u0442\u0435\u0436\u0430 \u0437\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0442\u0438\u043F, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0446\u0435\u043D\u0443.</div>
      ${group("\u0422\u0435\u0445\u043D\u0438\u043A\u0430", "equipment")}${group("\u0423\u0441\u043B\u0443\u0433\u0438", "service")}
      ${!types.length ? `<div class="ar-sub" style="padding:12px;">\u0412 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0435 \u043D\u0435\u0442 \u0442\u0435\u0445\u043D\u0438\u043A\u0438 \u0438 \u0443\u0441\u043B\u0443\u0433.</div>` : ""}`,
      onMount: (el) => {
        el.querySelectorAll("[data-tname]").forEach((r) => r.addEventListener("click", () => {
          const name = r.getAttribute("data-tname");
          const cat = r.getAttribute("data-tcat");
          const t = tByName[name];
          openTariffPrice({ name, category: cat, id: t ? t.id : null, monthly_fee: t ? t.monthly_fee : "" });
        }));
      },
      actions: []
    });
  }
  function openTariffPrice(t) {
    var _a;
    openModal({
      title: t.name,
      bodyHTML: `<div style="display:flex;flex-direction:column;gap:10px;">
      <div><div class="ar-flabel">\u041F\u043B\u0430\u0442\u0451\u0436 \u0437\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435, \u20BD/\u043C\u0435\u0441</div>
        <div class="ar-field"><i class="fa-solid fa-ruble-sign"></i><input id="tp_fee" type="number" inputmode="numeric" value="${(_a = t.monthly_fee) != null ? _a : ""}" placeholder="\u043D\u0430\u043F\u0440. 3000"></div></div>
      <div class="ar-sub" style="font-size:11.5px;">${t.category === "service" ? "\u0423\u0441\u043B\u0443\u0433\u0430 \u2014 \u0433\u043E\u0441. \u043D\u043E\u043C\u0435\u0440 \u0438 \u041F\u0422\u0421 \u0443 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u043D\u0435 \u0437\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442\u0441\u044F." : "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u2014 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0433\u043E\u0441. \u043D\u043E\u043C\u0435\u0440 \u0438 \u041F\u0422\u0421."}</div>
    </div>`,
      actions: [{ label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0446\u0435\u043D\u0443", primary: true, onClick: async () => {
        const fee = Number(document.getElementById("tp_fee").value) || 0;
        if (fee <= 0) {
          toast("\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0446\u0435\u043D\u0443", "err");
          return true;
        }
        try {
          await adminUpsertTariff(t.id, t.name, fee, t.category !== "service");
          toast("\u0426\u0435\u043D\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430");
          openTariffs();
        } catch (e) {
          toast(e.message, "err");
          return true;
        }
        return false;
      } }]
    });
  }
  function openNewSupportChat() {
    openModal({
      title: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E",
      bodyHTML: `<div class="ar-field"><i class="fa-solid fa-magnifying-glass"></i><input id="suQ" type="text" placeholder="\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 \u0438\u043C\u044F"></div><div id="suRes" style="margin-top:10px;display:flex;flex-direction:column;gap:8px;"></div>`,
      onMount: (el) => {
        const inp = el.querySelector("#suQ");
        const res = el.querySelector("#suRes");
        let t = null;
        inp.addEventListener("input", () => {
          clearTimeout(t);
          const q = inp.value.trim();
          if (q.length < 2) {
            res.innerHTML = "";
            return;
          }
          t = setTimeout(async () => {
            let users = [];
            try {
              users = await adminSearchUsers(q);
            } catch (e) {
            }
            res.innerHTML = users.map((u) => `<div class="ar-row" data-uid="${u.id}" style="cursor:pointer;border:1px solid var(--line);border-radius:12px;"><div class="ar-ava" style="width:34px;height:34px;font-size:12px;">${esc((u.name || "?")[0])}</div><div style="flex:1;"><div style="font-size:13px;font-weight:700;">${esc(u.name || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438")}</div><div class="ar-rsub">${formatPhone(u.phone)}</div></div></div>`).join("") || `<div class="ar-sub" style="padding:8px;">\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>`;
            res.querySelectorAll("[data-uid]").forEach((r) => r.addEventListener("click", async () => {
              var _a;
              try {
                const chatId = await adminCreateSupportChat(r.getAttribute("data-uid"));
                aChat = { id: chatId, customer_id: r.getAttribute("data-uid"), customer_phone: "", customer_name: (_a = r.querySelector(".ar-chat-name, div")) == null ? void 0 : _a.textContent };
                document.querySelector(".ar-modal-host").style.display = "none";
                go("a-chat");
              } catch (er) {
                toast(er.message, "err");
              }
            }));
          }, 400);
        });
      },
      actions: []
    });
  }
  async function adminDeliver(text, images) {
    const imageVal = packImages(images);
    if (!text && !imageVal || !aChat) return;
    await adminSendSupport(aChat.id, text, imageVal);
    if (aChat.customer_id) sendPush("new_message", { chat_id: aChat.id, recipient_id: aChat.customer_id, sender_name: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 AlmaniRent", message: text || "\u{1F4F7} \u0424\u043E\u0442\u043E" });
    renderAdminChatDialog();
  }
  async function sendAdminMsg() {
    const inp = document.getElementById("aChatInput");
    const text = inp.value.trim();
    if (!text || !aChat) return;
    inp.value = "";
    try {
      await adminDeliver(text, null);
    } catch (e) {
      toast(e.message, "err");
      inp.value = text;
    }
  }
  async function sendAdminPhotos(files) {
    if (!files.length || !aChat) return;
    try {
      const settled = await Promise.all(files.map((f) => uploadImage("chat", f).catch(() => null)));
      const urls = settled.filter(Boolean);
      if (!urls.length) return;
      openSendPhotos(urls, async (imgs, caption) => {
        try {
          await adminDeliver(caption, imgs);
        } catch (e) {
          toast(e.message, "err");
        }
      });
    } catch (e) {
      toast(e.message || "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E", "err");
    }
  }

  // app/legal.js
  var COMPANY = "AlmaniRent";
  var LEGAL_DOCS = {
    offer: {
      title: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u0430\u044F \u043E\u0444\u0435\u0440\u0442\u0430",
      html: `
      <p><b>1. \u041E\u0431\u0449\u0438\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F</b></p>
      <p>\u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u043E\u0444\u0435\u0440\u0442\u0430 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u043C \u0441\u0435\u0440\u0432\u0438\u0441\u0430 ${COMPANY} (\u0434\u0430\u043B\u0435\u0435 \u2014 \xAB\u0421\u0435\u0440\u0432\u0438\u0441\xBB) \u0437\u0430\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440 \u043D\u0430 \u043E\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433 \u043F\u043E \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044E \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u0430\u0440\u0435\u043D\u0434\u044B \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0442\u0435\u0445\u043D\u0438\u043A\u0438, \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u0443\u0441\u043B\u0443\u0433 \u043D\u0430 \u0438\u0437\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u043D\u0438\u0436\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u0445.</p>
      <p>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C \u0438 \u043F\u043E\u043B\u044C\u0437\u0443\u044F\u0441\u044C \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u043C, \u0432\u044B (\u0434\u0430\u043B\u0435\u0435 \u2014 \xAB\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\xBB) \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u043F\u043E\u043B\u043D\u043E\u0435 \u0438 \u0431\u0435\u0437\u043E\u0433\u043E\u0432\u043E\u0440\u043E\u0447\u043D\u043E\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u043E\u0444\u0435\u0440\u0442\u044B.</p>
      <p><b>2. \u041F\u0440\u0435\u0434\u043C\u0435\u0442</b></p>
      <p>\u0421\u0435\u0440\u0432\u0438\u0441 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u0434\u043B\u044F \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u0438\u0441\u043A\u0430 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043D\u0430 \u0430\u0440\u0435\u043D\u0434\u0443 \u0442\u0435\u0445\u043D\u0438\u043A\u0438, \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0443 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438 \u043E\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433. \u0421\u0435\u0440\u0432\u0438\u0441 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u043E\u0439 \u0441\u0434\u0435\u043B\u043E\u043A \u043C\u0435\u0436\u0434\u0443 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C\u0438 \u0438 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F\u043C\u0438 (\u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C\u0438), \u0430 \u043B\u0438\u0448\u044C \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u0438\u0445 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435.</p>
      <p><b>3. \u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0434\u043B\u044F \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432</b></p>
      <p>\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u044E\u0442\u0441\u044F \u043A \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 \u043D\u0430 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u0445 \u0435\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E\u0439 \u0430\u0431\u043E\u043D\u0435\u043D\u0442\u0441\u043A\u043E\u0439 \u043F\u043B\u0430\u0442\u044B \u0437\u0430 \u043A\u0430\u0436\u0434\u0443\u044E \u0435\u0434\u0438\u043D\u0438\u0446\u0443 \u0442\u0435\u0445\u043D\u0438\u043A\u0438/\u0443\u0441\u043B\u0443\u0433\u0438. \u041F\u0430\u0440\u0442\u043D\u0451\u0440 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043E\u043F\u043B\u0430\u0442\u0443 \u0437\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043E\u0442 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430; \u0421\u0435\u0440\u0432\u0438\u0441 \u043D\u0435 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u044E \u0441 \u0441\u0443\u043C\u043C\u044B \u0437\u0430\u043A\u0430\u0437\u0430.</p>
      <p><b>4. \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C</b></p>
      <p>\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0438 \u0441\u0440\u043E\u043A\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0432\u0430\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C. \u0421\u0435\u0440\u0432\u0438\u0441 \u043D\u0435 \u043D\u0435\u0441\u0451\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441\u0442\u043E\u0440\u043E\u043D \u0441\u0434\u0435\u043B\u043A\u0438, \u043D\u043E \u0441\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044E \u0441\u043F\u043E\u0440\u043D\u044B\u0445 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0439 \u0447\u0435\u0440\u0435\u0437 \u0441\u043B\u0443\u0436\u0431\u0443 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438.</p>
      <p><b>5. \u0417\u0430\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F</b></p>
      <p>\u0421\u0435\u0440\u0432\u0438\u0441 \u0432\u043F\u0440\u0430\u0432\u0435 \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u0444\u0435\u0440\u0442\u044B. \u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0440\u0435\u0434\u0430\u043A\u0446\u0438\u044F \u0432\u0441\u0435\u0433\u0434\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0421\u0435\u0440\u0432\u0438\u0441\u0430 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0441 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u043C\u0438.</p>`
    },
    privacy: {
      title: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445",
      html: `
      <p><b>1. \u041A\u0430\u043A\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C</b></p>
      <p>\u0418\u043C\u044F, \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0430\u0434\u0440\u0435\u0441\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0438 \u0433\u0435\u043E\u043F\u043E\u0437\u0438\u0446\u0438\u044E (\u0441 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F), \u0430 \u0442\u0430\u043A\u0436\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0437\u0430\u043A\u0430\u0437\u0430\u0445 \u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0435 \u0432 \u0447\u0430\u0442\u0430\u0445.</p>
      <p><b>2. \u0426\u0435\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438</b></p>
      <p>\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432, \u0441\u0432\u044F\u0437\u0438 \u043C\u0435\u0436\u0434\u0443 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u043E\u043C \u0438 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u043C, \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u043B\u0443\u0436\u0431\u044B \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439.</p>
      <p><b>3. \u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C</b></p>
      <p>\u0414\u0430\u043D\u043D\u044B\u0435, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430 (\u0438\u043C\u044F, \u0442\u0435\u043B\u0435\u0444\u043E\u043D, \u0430\u0434\u0440\u0435\u0441), \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044E, \u043F\u0440\u0438\u043D\u044F\u0432\u0448\u0435\u043C\u0443 \u0437\u0430\u043A\u0430\u0437. \u0418\u043D\u044B\u043C \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442\u0441\u044F, \u043A\u0440\u043E\u043C\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u043C.</p>
      <p><b>4. \u0425\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0438 \u0437\u0430\u0449\u0438\u0442\u0430</b></p>
      <p>\u0414\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u043D\u0430 \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u044B\u0445 \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u0445 \u0441 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0446\u0435\u043B\u044F\u0445. \u041C\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u0435\u0440\u044B \u0437\u0430\u0449\u0438\u0442\u044B.</p>
      <p><b>5. \u0412\u0430\u0448\u0438 \u043F\u0440\u0430\u0432\u0430</b></p>
      <p>\u0412\u044B \u0432\u043F\u0440\u0430\u0432\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u0432\u043E\u0438\u043C \u0434\u0430\u043D\u043D\u044B\u043C, \u0438\u0445 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443, \u043E\u0431\u0440\u0430\u0442\u0438\u0432\u0448\u0438\u0441\u044C \u0432 \u0441\u043B\u0443\u0436\u0431\u0443 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438.</p>`
    },
    consent: {
      title: "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445",
      html: `
      <p>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C \u0432 ${COMPANY}, \u044F \u0434\u0430\u044E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043C\u043E\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 (\u0438\u043C\u044F, \u0442\u0435\u043B\u0435\u0444\u043E\u043D, e-mail, \u0430\u0434\u0440\u0435\u0441\u0430, \u0433\u0435\u043E\u043F\u043E\u0437\u0438\u0446\u0438\u044F) \u0432 \u0446\u0435\u043B\u044F\u0445 \u0440\u0430\u0431\u043E\u0442\u044B \u0421\u0435\u0440\u0432\u0438\u0441\u0430.</p>
      <p>\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u0441\u0431\u043E\u0440, \u0437\u0430\u043F\u0438\u0441\u044C, \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044E, \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F\u043C \u0432 \u043E\u0431\u044A\u0451\u043C\u0435, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u043C \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430.</p>
      <p>\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043E \u0435\u0433\u043E \u043E\u0442\u0437\u044B\u0432\u0430. \u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u0441\u043B\u0443\u0436\u0431\u0443 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438.</p>`
    }
  };
  function openLegal(initial = "offer") {
    const keys = Object.keys(LEGAL_DOCS);
    let current2 = LEGAL_DOCS[initial] ? initial : keys[0];
    const render4 = () => {
      const tabs = keys.map(
        (k) => `<button class="ar-legal-tab${k === current2 ? " on" : ""}" data-doc="${k}">${LEGAL_DOCS[k].title}</button>`
      ).join("");
      return `
      <div class="ar-legal-tabs">${tabs}</div>
      <div class="ar-legal-body" id="legalBody">${LEGAL_DOCS[current2].html}</div>`;
    };
    openModal({
      title: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B",
      bodyHTML: render4(),
      onMount: (el) => {
        const bind = () => el.querySelectorAll("[data-doc]").forEach((b) => b.addEventListener("click", () => {
          current2 = b.getAttribute("data-doc");
          el.innerHTML = render4();
          bind();
          const body = el.querySelector("#legalBody");
          if (body) body.scrollTop = 0;
        }));
        bind();
      },
      actions: []
    });
  }

  // app/main.js
  function start() {
    var _a, _b, _c, _d;
    initRouter();
    initNav();
    initPartnerNav();
    initImageViewer();
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-legal]");
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();
      openLegal(link.getAttribute("data-legal"));
    });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (e) => {
        const url = e.data && e.data.type === "push-open" ? e.data.url : null;
        if (!url) return;
        try {
          const q = new URLSearchParams(url.split("?")[1] || "");
          if (q.get("open_admin_support")) go(isAdmin() ? "a-chats" : "home");
          else if (q.get("open_chat")) go(state.role === "partner" ? "p-chats" : "chats");
          else if (q.get("open_order")) go(state.role === "partner" ? "p-orders" : "orders");
        } catch (e2) {
        }
      });
    }
    initAuth();
    initHome();
    initCatalog();
    initOrder();
    initOrders();
    initOrderDetail();
    initConfirm();
    initChat();
    initBecomePartner();
    initPartner();
    initAdmin();
    initProfile();
    (_a = document.getElementById("adminExit")) == null ? void 0 : _a.addEventListener("click", () => go("profile"));
    (_b = document.getElementById("pendingRefresh")) == null ? void 0 : _b.addEventListener("click", async () => {
      await refreshUser();
      if (canUsePlatform()) {
        toast("\u0414\u043E\u0441\u0442\u0443\u043F \u043E\u0442\u043A\u0440\u044B\u0442!");
        go("home", { replace: true });
      } else toast("\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0435\u0449\u0451 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435");
    });
    (_c = document.getElementById("pendingLogout")) == null ? void 0 : _c.addEventListener("click", () => {
      clearSession();
      go("login", { replace: true });
    });
    (_d = document.getElementById("bannedLogout")) == null ? void 0 : _d.addEventListener("click", () => {
      clearSession();
      go("login", { replace: true });
    });
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        clearSession();
        toast("\u0412\u044B \u0432\u044B\u0448\u043B\u0438");
        go("login", { replace: true });
      });
    }
    routeStart();
  }
  function routeStart() {
    const user = loadSession();
    try {
      state.role = localStorage.getItem("almanirent_role") || "customer";
    } catch (e) {
    }
    if (!user) {
      go("login", { replace: true });
      return;
    }
    startPresence();
    routeByStatus();
    refreshUser().then(() => routeByStatus({ background: true })).catch(() => {
    });
  }
  function routeByStatus({ background = false } = {}) {
    if (isBanned()) {
      go("banned", { replace: true });
      return;
    }
    if (!canUsePlatform()) {
      go("pending", { replace: true });
      return;
    }
    if (background) {
      const cur = currentScreen();
      if (cur && cur !== "banned" && cur !== "pending") return;
    } else {
      initPush();
      if (location.search.includes("paid=1")) {
        handlePaymentReturn();
        return;
      }
      if (handlePushDeepLink()) return;
      const hash = (location.hash || "").replace(/^#/, "");
      if (hash && document.querySelector(`.ar-screen[data-screen="${hash}"]`)) {
        go(hash, { replace: true });
        return;
      }
    }
    go(state.role === "partner" ? "cabinet" : "home", { replace: true });
  }
  function handlePushDeepLink() {
    const q = new URLSearchParams(location.search);
    const openOrder2 = q.get("open_order");
    const openChat = q.get("open_chat");
    const openAdmin = q.get("open_admin_support");
    if (!openOrder2 && !openChat && !openAdmin) return false;
    try {
      history.replaceState(null, "", location.pathname);
    } catch (e) {
    }
    if (openAdmin) {
      go(isAdmin() ? "a-chats" : "home", { replace: true });
      return true;
    }
    if (openChat) {
      go(state.role === "partner" ? "p-chats" : "chats", { replace: true });
      return true;
    }
    if (openOrder2) {
      go(state.role === "partner" ? "p-orders" : "orders", { replace: true });
      return true;
    }
    return false;
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
