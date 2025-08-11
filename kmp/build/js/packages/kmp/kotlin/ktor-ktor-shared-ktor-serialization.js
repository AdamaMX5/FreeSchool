(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-io.js', './ktor-ktor-http.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-http.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof this['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof this['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'ktor-ktor-shared-ktor-serialization'.");
    }
    root['ktor-ktor-shared-ktor-serialization'] = factory(typeof this['ktor-ktor-shared-ktor-serialization'] === 'undefined' ? {} : this['ktor-ktor-shared-ktor-serialization'], this['kotlin-kotlin-stdlib'], this['ktor-ktor-io'], this['ktor-ktor-http'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir']);
  }
}(this, function (_, kotlin_kotlin, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_http, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var Exception = kotlin_kotlin.$_$.ec;
  var VOID = kotlin_kotlin.$_$.f;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.h1;
  var captureStack = kotlin_kotlin.$_$.i8;
  var protoOf = kotlin_kotlin.$_$.r9;
  var classMeta = kotlin_kotlin.$_$.o8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var ensureNotNull = kotlin_kotlin.$_$.cd;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.f;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.e;
  var parseAndSortHeader = kotlin_io_ktor_ktor_http.$_$.d1;
  var Companion_instance = kotlin_io_ktor_ktor_io.$_$.e;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var isInterface = kotlin_kotlin.$_$.h9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var asFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var firstOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var NullBody_instance = kotlin_io_ktor_ktor_http.$_$.a;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ContentConvertException, 'ContentConvertException', classMeta, Exception);
  setMetadataFor(JsonConvertException, 'JsonConvertException', classMeta, ContentConvertException);
  function register$default(contentType, converter, configuration, $super) {
    var tmp;
    if (configuration === VOID) {
      tmp = Configuration$register$lambda;
    } else {
      tmp = configuration;
    }
    configuration = tmp;
    var tmp_0;
    if ($super === VOID) {
      this.y1y(contentType, converter, configuration);
      tmp_0 = Unit_instance;
    } else {
      tmp_0 = $super.y1y.call(this, contentType, converter, configuration);
    }
    return tmp_0;
  }
  setMetadataFor(Configuration, 'Configuration', interfaceMeta);
  function serialize(contentType, charset, typeInfo, value, $completion) {
    return this.b1z(contentType, charset, typeInfo, value, $completion);
  }
  function serializeNullable(contentType, charset, typeInfo, value, $completion) {
    return this.a1z(contentType, charset, typeInfo, ensureNotNull(value), $completion);
  }
  setMetadataFor(ContentConverter, 'ContentConverter', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [4, 3]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(deserialize$o$collect$slambda, 'deserialize$o$collect$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($collectCOROUTINE$1, '$collectCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(deserialize$slambda, 'deserialize$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($deserializeCOROUTINE$0, '$deserializeCOROUTINE$0', classMeta, CoroutineImpl);
  //endregion
  function ContentConvertException(message, cause) {
    cause = cause === VOID ? null : cause;
    Exception_init_$Init$(message, cause, this);
    captureStack(this, ContentConvertException);
  }
  function JsonConvertException(message, cause) {
    cause = cause === VOID ? null : cause;
    ContentConvertException.call(this, message, cause);
    captureStack(this, JsonConvertException);
  }
  function Configuration$register$lambda($this$null) {
    return Unit_instance;
  }
  function Configuration() {
  }
  function ContentConverter() {
  }
  function deserialize(_this__u8e3s4, body, typeInfo, charset, $completion) {
    var tmp = new $deserializeCOROUTINE$0(_this__u8e3s4, body, typeInfo, charset, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  }
  function suitableCharset(_this__u8e3s4, defaultCharset) {
    defaultCharset = defaultCharset === VOID ? Charsets_getInstance().w1c_1 : defaultCharset;
    var tmp0_elvis_lhs = suitableCharsetOrNull(_this__u8e3s4, defaultCharset);
    return tmp0_elvis_lhs == null ? defaultCharset : tmp0_elvis_lhs;
  }
  function suitableCharsetOrNull(_this__u8e3s4, defaultCharset) {
    defaultCharset = defaultCharset === VOID ? Charsets_getInstance().w1c_1 : defaultCharset;
    var tmp0_iterator = parseAndSortHeader(_this__u8e3s4.k1h(HttpHeaders_getInstance().e1o_1)).u();
    while (tmp0_iterator.v()) {
      var charset = tmp0_iterator.w().oc();
      if (charset === '*')
        return defaultCharset;
      else if (Companion_instance.z1f(charset))
        return Companion_instance.y1f(charset);
    }
    return null;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.p1z_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).vx = function (value, $completion) {
    return this.p1z_1(value, $completion);
  };
  function deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation) {
    this.y1z_1 = $$this$unsafeFlow;
    this.z1z_1 = $charset;
    this.a20_1 = $typeInfo;
    this.b20_1 = $body;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(deserialize$o$collect$slambda).h20 = function (value, $completion) {
    var tmp = this.i20(value, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(deserialize$o$collect$slambda).eb = function (p1, $completion) {
    return this.h20((!(p1 == null) ? isInterface(p1, ContentConverter) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(deserialize$o$collect$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            var tmp_0 = this;
            tmp_0.d20_1 = this.y1z_1;
            var tmp_1 = this;
            tmp_1.e20_1 = this.c20_1;
            var tmp_2 = this;
            tmp_2.f20_1 = this.e20_1;
            this.ea_1 = 1;
            suspendResult = this.f20_1.c1z(this.z1z_1, this.a20_1, this.b20_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.g20_1 = suspendResult;
            this.ea_1 = 2;
            suspendResult = this.d20_1.vx(this.g20_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 3) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  protoOf(deserialize$o$collect$slambda).i20 = function (value, completion) {
    var i = new deserialize$o$collect$slambda(this.y1z_1, this.z1z_1, this.a20_1, this.b20_1, completion);
    i.c20_1 = value;
    return i;
  };
  function deserialize$o$collect$slambda_0($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation) {
    var i = new deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $body, resultContinuation);
    var l = function (value, $completion) {
      return i.h20(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$1(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.r20_1 = _this__u8e3s4;
    this.s20_1 = collector;
  }
  protoOf($collectCOROUTINE$1).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            var tmp_0 = this;
            tmp_0.t20_1 = this.s20_1;
            this.ea_1 = 1;
            var tmp_1 = deserialize$o$collect$slambda_0(this.t20_1, this.r20_1.v20_1, this.r20_1.w20_1, this.r20_1.x20_1, null);
            suspendResult = this.r20_1.u20_1.wx(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
          case 2:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 2) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  function _no_name_provided__qut3iv($this, $charset, $typeInfo, $body) {
    this.u20_1 = $this;
    this.v20_1 = $charset;
    this.w20_1 = $typeInfo;
    this.x20_1 = $body;
  }
  protoOf(_no_name_provided__qut3iv).y20 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$1(this, collector, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(_no_name_provided__qut3iv).wx = function (collector, $completion) {
    return this.y20(collector, $completion);
  };
  function deserialize$slambda($body, resultContinuation) {
    this.h21_1 = $body;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(deserialize$slambda).j21 = function (it, $completion) {
    var tmp = this.k21(it, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(deserialize$slambda).eb = function (p1, $completion) {
    return this.j21((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(deserialize$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        if (tmp === 0) {
          this.fa_1 = 1;
          return !(this.i21_1 == null) ? true : this.h21_1.z12();
        } else if (tmp === 1) {
          throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(deserialize$slambda).k21 = function (it, completion) {
    var i = new deserialize$slambda(this.h21_1, completion);
    i.i21_1 = it;
    return i;
  };
  function deserialize$slambda_0($body, resultContinuation) {
    var i = new deserialize$slambda($body, resultContinuation);
    var l = function (it, $completion) {
      return i.j21(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $deserializeCOROUTINE$0(_this__u8e3s4, body, typeInfo, charset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.l1z_1 = _this__u8e3s4;
    this.m1z_1 = body;
    this.n1z_1 = typeInfo;
    this.o1z_1 = charset;
  }
  protoOf($deserializeCOROUTINE$0).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            this.ea_1 = 1;
            var this_0 = asFlow(this.l1z_1);
            var tmp_0 = new _no_name_provided__qut3iv(this_0, this.o1z_1, this.n1z_1, this.m1z_1);
            suspendResult = firstOrNull(tmp_0, deserialize$slambda_0(this.m1z_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            var tmp_1;
            if (!(result == null)) {
              tmp_1 = result;
            } else {
              if (!this.m1z_1.z12()) {
                tmp_1 = this.m1z_1;
              } else {
                var tmp0_safe_receiver = this.n1z_1.b1m_1;
                if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p6()) === true) {
                  tmp_1 = NullBody_instance;
                } else {
                  throw new ContentConvertException('No suitable converter found for ' + this.n1z_1);
                }
              }
            }

            return tmp_1;
          case 2:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 2) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = deserialize;
  _.$_$.b = register$default;
  _.$_$.c = Configuration;
  _.$_$.d = ContentConverter;
  _.$_$.e = JsonConvertException;
  _.$_$.f = suitableCharset;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-shared-ktor-serialization.js.map
