(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-utils.js', './ktor-ktor-client-ktor-client-core.js', './ktor-ktor-http.js', './ktor-ktor-shared-ktor-serialization.js', './ktor-ktor-io.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-utils.js'), require('./ktor-ktor-client-ktor-client-core.js'), require('./ktor-ktor-http.js'), require('./ktor-ktor-shared-ktor-serialization.js'), require('./ktor-ktor-io.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof this['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof this['ktor-ktor-client-ktor-client-core'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-client-ktor-client-core' was not found. Please, check whether 'ktor-ktor-client-ktor-client-core' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof this['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof this['ktor-ktor-shared-ktor-serialization'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-shared-ktor-serialization' was not found. Please, check whether 'ktor-ktor-shared-ktor-serialization' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    if (typeof this['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'.");
    }
    root['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'] = factory(typeof this['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'] === 'undefined' ? {} : this['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'], this['kotlin-kotlin-stdlib'], this['ktor-ktor-utils'], this['ktor-ktor-client-ktor-client-core'], this['ktor-ktor-http'], this['ktor-ktor-shared-ktor-serialization'], this['ktor-ktor-io']);
  }
}(this, function (_, kotlin_kotlin, kotlin_io_ktor_ktor_utils, kotlin_io_ktor_ktor_client_core, kotlin_io_ktor_ktor_http, kotlin_io_ktor_ktor_serialization, kotlin_io_ktor_ktor_io) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.r9;
  var classMeta = kotlin_kotlin.$_$.o8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var VOID = kotlin_kotlin.$_$.f;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var PipelineContext = kotlin_io_ktor_ktor_utils.$_$.g;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var HttpResponseContainer = kotlin_io_ktor_ktor_client_core.$_$.h;
  var contentType = kotlin_io_ktor_ktor_http.$_$.a1;
  var suitableCharset = kotlin_io_ktor_ktor_serialization.$_$.f;
  var plus = kotlin_kotlin.$_$.r6;
  var toMutableSet = kotlin_kotlin.$_$.j7;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.k;
  var Application_getInstance = kotlin_io_ktor_ktor_http.$_$.b;
  var register$default = kotlin_io_ktor_ktor_serialization.$_$.b;
  var Configuration = kotlin_io_ktor_ktor_serialization.$_$.c;
  var AttributeKey = kotlin_io_ktor_ktor_utils.$_$.l;
  var Phases_getInstance = kotlin_io_ktor_ktor_client_core.$_$.a;
  var Phases_getInstance_0 = kotlin_io_ktor_ktor_client_core.$_$.b;
  var HttpClientPlugin = kotlin_io_ktor_ktor_client_core.$_$.d;
  var objectMeta = kotlin_kotlin.$_$.q9;
  var toString = kotlin_kotlin.$_$.w9;
  var accept = kotlin_io_ktor_ktor_client_core.$_$.f;
  var Collection = kotlin_kotlin.$_$.t4;
  var isInterface = kotlin_kotlin.$_$.h9;
  var OutgoingContent = kotlin_io_ktor_ktor_http.$_$.o;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var contentType_0 = kotlin_io_ktor_ktor_http.$_$.z;
  var HttpHeaders_getInstance = kotlin_io_ktor_ktor_http.$_$.e;
  var EmptyContent_getInstance = kotlin_io_ktor_ktor_client_core.$_$.c;
  var Unit = kotlin_kotlin.$_$.wc;
  var charset = kotlin_io_ktor_ktor_http.$_$.x;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.f;
  var ensureNotNull = kotlin_kotlin.$_$.cd;
  var NullBody_instance = kotlin_io_ktor_ktor_http.$_$.a;
  var equals = kotlin_kotlin.$_$.r8;
  var joinToString = kotlin_kotlin.$_$.f6;
  var ByteReadChannel = kotlin_io_ktor_ktor_io.$_$.d1;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.h5;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.j;
  var deserialize = kotlin_io_ktor_ktor_serialization.$_$.a;
  var Exception = kotlin_kotlin.$_$.ec;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.g1;
  var captureStack = kotlin_kotlin.$_$.i8;
  var KtorSimpleLogger = kotlin_io_ktor_ktor_utils.$_$.f;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.i4;
  var HttpStatusCode = kotlin_io_ktor_ktor_http.$_$.r;
  var getKClass = kotlin_kotlin.$_$.e;
  var setOf = kotlin_kotlin.$_$.z6;
  var endsWith = kotlin_kotlin.$_$.na;
  var startsWith = kotlin_kotlin.$_$.fb;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.v;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ConverterRegistration, 'ConverterRegistration', classMeta);
  setMetadataFor(ContentNegotiation$Config$defaultMatcher$1, VOID, classMeta);
  setMetadataFor(ContentNegotiation$Plugin$install$slambda, 'ContentNegotiation$Plugin$install$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(ContentNegotiation$Plugin$install$slambda_1, 'ContentNegotiation$Plugin$install$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(Config, 'Config', classMeta, VOID, [Configuration], Config);
  setMetadataFor(Plugin, 'Plugin', objectMeta, VOID, [HttpClientPlugin]);
  setMetadataFor($convertRequestCOROUTINE$0, '$convertRequestCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor($convertResponseCOROUTINE$1, '$convertResponseCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor(ContentNegotiation, 'ContentNegotiation', classMeta, VOID, VOID, VOID, VOID, VOID, [2, 5]);
  setMetadataFor(ContentConverterException, 'ContentConverterException', classMeta, Exception);
  setMetadataFor(JsonContentTypeMatcher, 'JsonContentTypeMatcher', objectMeta);
  //endregion
  function get_LOGGER() {
    _init_properties_ContentNegotiation_kt__o183go();
    return LOGGER;
  }
  var LOGGER;
  function get_DefaultCommonIgnoredTypes() {
    _init_properties_ContentNegotiation_kt__o183go();
    return DefaultCommonIgnoredTypes;
  }
  var DefaultCommonIgnoredTypes;
  function ConverterRegistration(converter, contentTypeToSend, contentTypeMatcher) {
    this.l2z_1 = converter;
    this.m2z_1 = contentTypeToSend;
    this.n2z_1 = contentTypeMatcher;
  }
  function defaultMatcher($this, pattern) {
    return new ContentNegotiation$Config$defaultMatcher$1(pattern);
  }
  function ContentNegotiation$Config$defaultMatcher$1($pattern) {
    this.o2z_1 = $pattern;
  }
  protoOf(ContentNegotiation$Config$defaultMatcher$1).p2z = function (contentType) {
    return contentType.y1n(this.o2z_1);
  };
  function ContentNegotiation$Plugin$install$slambda($plugin, resultContinuation) {
    this.y2z_1 = $plugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentNegotiation$Plugin$install$slambda).l22 = function ($this$intercept, it, $completion) {
    var tmp = this.m22($this$intercept, it, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(ContentNegotiation$Plugin$install$slambda).df = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.l22(tmp, !(p2 == null) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ContentNegotiation$Plugin$install$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            this.ea_1 = 1;
            suspendResult = this.y2z_1.f30(this.z2z_1.i1l_1, this.z2z_1.l1k(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.b30_1 = suspendResult;
            var tmp_0 = this;
            var tmp_1;
            if (this.b30_1 == null) {
              return Unit_instance;
            } else {
              tmp_1 = this.b30_1;
            }

            tmp_0.c30_1 = tmp_1;
            this.ea_1 = 2;
            suspendResult = this.z2z_1.m1k(this.c30_1, this);
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
  protoOf(ContentNegotiation$Plugin$install$slambda).m22 = function ($this$intercept, it, completion) {
    var i = new ContentNegotiation$Plugin$install$slambda(this.y2z_1, completion);
    i.z2z_1 = $this$intercept;
    i.a30_1 = it;
    return i;
  };
  function ContentNegotiation$Plugin$install$slambda_0($plugin, resultContinuation) {
    var i = new ContentNegotiation$Plugin$install$slambda($plugin, resultContinuation);
    var l = function ($this$intercept, it, $completion) {
      return i.l22($this$intercept, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ContentNegotiation$Plugin$install$slambda_1($plugin, resultContinuation) {
    this.o30_1 = $plugin;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentNegotiation$Plugin$install$slambda_1).f23 = function ($this$intercept, _name_for_destructuring_parameter_0__wldtmu, $completion) {
    var tmp = this.g23($this$intercept, _name_for_destructuring_parameter_0__wldtmu, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(ContentNegotiation$Plugin$install$slambda_1).df = function (p1, p2, $completion) {
    var tmp = p1 instanceof PipelineContext ? p1 : THROW_CCE();
    return this.f23(tmp, p2 instanceof HttpResponseContainer ? p2 : THROW_CCE(), $completion);
  };
  protoOf(ContentNegotiation$Plugin$install$slambda_1).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            this.r30_1 = this.q30_1.oc();
            this.s30_1 = this.q30_1.pc();
            var tmp_0 = this;
            var tmp0_elvis_lhs = contentType(this.p30_1.i1l_1.s22());
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              this.p30_1;
              get_LOGGER().d1m('Response doesn\'t have "Content-Type" header, skipping ContentNegotiation plugin');
              return Unit_instance;
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }

            tmp_0.t30_1 = tmp_1;
            this.u30_1 = suitableCharset(this.p30_1.i1l_1.b26().g1s());
            this.ea_1 = 1;
            suspendResult = this.o30_1.y30(this.p30_1.i1l_1.b26().e26(), this.r30_1, this.s30_1, this.t30_1, this.u30_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.v30_1 = suspendResult;
            var tmp_2 = this;
            var tmp_3;
            if (this.v30_1 == null) {
              return Unit_instance;
            } else {
              tmp_3 = this.v30_1;
            }

            tmp_2.w30_1 = tmp_3;
            this.x30_1 = new HttpResponseContainer(this.r30_1, this.w30_1);
            this.ea_1 = 2;
            suspendResult = this.p30_1.m1k(this.x30_1, this);
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
  protoOf(ContentNegotiation$Plugin$install$slambda_1).g23 = function ($this$intercept, _name_for_destructuring_parameter_0__wldtmu, completion) {
    var i = new ContentNegotiation$Plugin$install$slambda_1(this.o30_1, completion);
    i.p30_1 = $this$intercept;
    i.q30_1 = _name_for_destructuring_parameter_0__wldtmu;
    return i;
  };
  function ContentNegotiation$Plugin$install$slambda_2($plugin, resultContinuation) {
    var i = new ContentNegotiation$Plugin$install$slambda_1($plugin, resultContinuation);
    var l = function ($this$intercept, _name_for_destructuring_parameter_0__wldtmu, $completion) {
      return i.f23($this$intercept, _name_for_destructuring_parameter_0__wldtmu, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function Config() {
    this.z30_1 = toMutableSet(plus(get_DefaultIgnoredTypes(), get_DefaultCommonIgnoredTypes()));
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.a31_1 = ArrayList_init_$Create$();
  }
  protoOf(Config).y1y = function (contentType, converter, configuration) {
    var matcher = contentType.equals(Application_getInstance().r1m_1) ? JsonContentTypeMatcher_instance : defaultMatcher(this, contentType);
    this.b31(contentType, converter, matcher, configuration);
  };
  protoOf(Config).b31 = function (contentTypeToSend, converter, contentTypeMatcher, configuration) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    configuration(converter);
    var registration = new ConverterRegistration(converter, contentTypeToSend, contentTypeMatcher);
    this.a31_1.r(registration);
  };
  function Plugin() {
    Plugin_instance = this;
    this.c31_1 = new AttributeKey('ContentNegotiation');
  }
  protoOf(Plugin).e2 = function () {
    return this.c31_1;
  };
  protoOf(Plugin).d31 = function (block) {
    // Inline function 'kotlin.apply' call
    var this_0 = new Config();
    // Inline function 'kotlin.contracts.contract' call
    block(this_0);
    var config = this_0;
    return new ContentNegotiation(config.a31_1, config.z30_1);
  };
  protoOf(Plugin).w24 = function (block) {
    return this.d31(block);
  };
  protoOf(Plugin).e31 = function (plugin, scope) {
    var tmp = Phases_getInstance().r2a_1;
    scope.r21_1.m1l(tmp, ContentNegotiation$Plugin$install$slambda_0(plugin, null));
    var tmp_0 = Phases_getInstance_0().r24_1;
    scope.s21_1.m1l(tmp_0, ContentNegotiation$Plugin$install$slambda_2(plugin, null));
  };
  protoOf(Plugin).x24 = function (plugin, scope) {
    return this.e31(plugin instanceof ContentNegotiation ? plugin : THROW_CCE(), scope);
  };
  var Plugin_instance;
  function Plugin_getInstance() {
    if (Plugin_instance == null)
      new Plugin();
    return Plugin_instance;
  }
  function ContentNegotiation$convertRequest$lambda(it) {
    return toString(it.l2z_1);
  }
  function $convertRequestCOROUTINE$0(_this__u8e3s4, request, body, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.n31_1 = _this__u8e3s4;
    this.o31_1 = request;
    this.p31_1 = body;
  }
  protoOf($convertRequestCOROUTINE$0).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 7;
            var tmp0_iterator = this.n31_1.d30_1.u();
            while (tmp0_iterator.v()) {
              var element = tmp0_iterator.w();
              get_LOGGER().d1m('Adding Accept=' + element.m2z_1.u1n_1 + ' header for ' + this.o31_1.r23_1);
              accept(this.o31_1, element.m2z_1);
            }

            var tmp_0;
            var tmp_1 = this.p31_1;
            if (tmp_1 instanceof OutgoingContent) {
              tmp_0 = true;
            } else {
              var tmp$ret$0;
              l$ret$1: do {
                var this_0 = this.n31_1.e30_1;
                var tmp_2;
                if (isInterface(this_0, Collection)) {
                  tmp_2 = this_0.b1();
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  tmp$ret$0 = false;
                  break l$ret$1;
                }
                var tmp0_iterator_0 = this_0.u();
                while (tmp0_iterator_0.v()) {
                  var element_0 = tmp0_iterator_0.w();
                  if (element_0.a6(this.p31_1)) {
                    tmp$ret$0 = true;
                    break l$ret$1;
                  }
                }
                tmp$ret$0 = false;
              }
               while (false);
              tmp_0 = tmp$ret$0;
            }

            if (tmp_0) {
              get_LOGGER().d1m('Body type ' + getKClassFromExpression(this.p31_1) + ' is in ignored types. ' + ('Skipping ContentNegotiation for ' + this.o31_1.r23_1 + '.'));
              return null;
            }

            var tmp_3 = this;
            var tmp0_elvis_lhs = contentType_0(this.o31_1);
            var tmp_4;
            if (tmp0_elvis_lhs == null) {
              this.n31_1;
              get_LOGGER().d1m("Request doesn't have Content-Type header. Skipping ContentNegotiation for " + this.o31_1.r23_1 + '.');
              return null;
            } else {
              tmp_4 = tmp0_elvis_lhs;
            }

            tmp_3.q31_1 = tmp_4;
            var tmp_5 = this.p31_1;
            if (tmp_5 instanceof Unit) {
              get_LOGGER().d1m('Sending empty body for ' + this.o31_1.r23_1);
              this.o31_1.t23_1.w1i(HttpHeaders_getInstance().v1o_1);
              return EmptyContent_getInstance();
            }

            var tmp_6 = this;
            var this_1 = this.n31_1.d30_1;
            var destination = ArrayList_init_$Create$();
            var tmp0_iterator_1 = this_1.u();
            while (tmp0_iterator_1.v()) {
              var element_1 = tmp0_iterator_1.w();
              if (element_1.n2z_1.p2z(this.q31_1)) {
                destination.r(element_1);
              }
            }

            var tmp_7;
            if (!destination.b1()) {
              tmp_7 = destination;
            } else {
              tmp_7 = null;
            }

            var tmp1_elvis_lhs = tmp_7;
            var tmp_8;
            if (tmp1_elvis_lhs == null) {
              this.n31_1;
              get_LOGGER().d1m('None of the registered converters match request Content-Type=' + this.q31_1 + '. ' + ('Skipping ContentNegotiation for ' + this.o31_1.r23_1 + '.'));
              return null;
            } else {
              tmp_8 = tmp1_elvis_lhs;
            }

            tmp_6.r31_1 = tmp_8;
            if (this.o31_1.w2p() == null) {
              get_LOGGER().d1m('Request has unknown body type. Skipping ContentNegotiation for ' + this.o31_1.r23_1 + '.');
              return null;
            }

            this.o31_1.t23_1.w1i(HttpHeaders_getInstance().v1o_1);
            this.ea_1 = 1;
            continue $sm;
          case 1:
            var tmp_9 = this;
            tmp_9.t31_1 = this.r31_1;
            this.u31_1 = this.t31_1.u();
            this.ea_1 = 2;
            continue $sm;
          case 2:
            if (!this.u31_1.v()) {
              this.ea_1 = 5;
              continue $sm;
            }

            this.v31_1 = this.u31_1.w();
            var tmp_10 = this;
            tmp_10.w31_1 = this.v31_1;
            this.ea_1 = 3;
            var tmp0_elvis_lhs_0 = charset(this.q31_1);
            var tmp_11 = tmp0_elvis_lhs_0 == null ? Charsets_getInstance().w1c_1 : tmp0_elvis_lhs_0;
            var tmp_12 = ensureNotNull(this.o31_1.w2p());
            var this_2 = this.p31_1;
            var tmp_13;
            if (!equals(this_2, NullBody_instance)) {
              tmp_13 = this_2;
            } else {
              tmp_13 = null;
            }

            suspendResult = this.w31_1.l2z_1.b1z(this.q31_1, tmp_11, tmp_12, tmp_13, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var result = suspendResult;
            if (!(result == null)) {
              get_LOGGER().d1m('Converted request body using ' + this.w31_1.l2z_1 + ' for ' + this.o31_1.r23_1);
            }

            var result_0 = result;
            if (!(result_0 == null)) {
              this.s31_1 = result_0;
              this.ea_1 = 6;
              continue $sm;
            } else {
              this.ea_1 = 4;
              continue $sm;
            }

          case 4:
            this.ea_1 = 2;
            continue $sm;
          case 5:
            this.s31_1 = null;
            if (false) {
              this.ea_1 = 1;
              continue $sm;
            }

            this.ea_1 = 6;
            continue $sm;
          case 6:
            var tmp2_elvis_lhs = this.s31_1;
            var tmp_14;
            if (tmp2_elvis_lhs == null) {
              var tmp_15 = "Can't convert " + toString(this.p31_1) + ' with contentType ' + this.q31_1 + ' using converters ';
              throw new ContentConverterException(tmp_15 + joinToString(this.r31_1, VOID, VOID, VOID, VOID, VOID, ContentNegotiation$convertRequest$lambda));
            } else {
              tmp_14 = tmp2_elvis_lhs;
            }

            var serializedContent = tmp_14;
            return serializedContent;
          case 7:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 7) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  function $convertResponseCOROUTINE$1(_this__u8e3s4, requestUrl, info, body, responseContentType, charset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f32_1 = _this__u8e3s4;
    this.g32_1 = requestUrl;
    this.h32_1 = info;
    this.i32_1 = body;
    this.j32_1 = responseContentType;
    this.k32_1 = charset;
  }
  protoOf($convertResponseCOROUTINE$1).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            var tmp_0 = this.i32_1;
            if (!isInterface(tmp_0, ByteReadChannel)) {
              get_LOGGER().d1m('Response body is already transformed. Skipping ContentNegotiation for ' + this.g32_1 + '.');
              return null;
            }

            if (this.f32_1.e30_1.z(this.h32_1.z1l_1)) {
              get_LOGGER().d1m('Response body type ' + this.h32_1.z1l_1 + ' is in ignored types. ' + ('Skipping ContentNegotiation for ' + this.g32_1 + '.'));
              return null;
            }

            var tmp_1 = this;
            var this_0 = this.f32_1.d30_1;
            var destination = ArrayList_init_$Create$();
            var tmp0_iterator = this_0.u();
            while (tmp0_iterator.v()) {
              var element = tmp0_iterator.w();
              if (element.n2z_1.p2z(this.j32_1)) {
                destination.r(element);
              }
            }

            var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
            var tmp0_iterator_0 = destination.u();
            while (tmp0_iterator_0.v()) {
              var item = tmp0_iterator_0.w();
              destination_0.r(item.l2z_1);
            }

            var tmp_2;
            if (!destination_0.b1()) {
              tmp_2 = destination_0;
            } else {
              tmp_2 = null;
            }

            var tmp0_elvis_lhs = tmp_2;
            var tmp_3;
            if (tmp0_elvis_lhs == null) {
              this.f32_1;
              get_LOGGER().d1m('None of the registered converters match response with Content-Type=' + this.j32_1 + '. ' + ('Skipping ContentNegotiation for ' + this.g32_1 + '.'));
              return null;
            } else {
              tmp_3 = tmp0_elvis_lhs;
            }

            tmp_1.l32_1 = tmp_3;
            this.ea_1 = 1;
            suspendResult = deserialize(this.l32_1, this.i32_1, this.h32_1, this.k32_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var result = suspendResult;
            if (!isInterface(result, ByteReadChannel)) {
              get_LOGGER().d1m('Response body was converted to ' + getKClassFromExpression(result) + ' for ' + this.g32_1 + '.');
            }

            return result;
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
  function ContentNegotiation(registrations, ignoredTypes) {
    Plugin_getInstance();
    this.d30_1 = registrations;
    this.e30_1 = ignoredTypes;
  }
  protoOf(ContentNegotiation).f30 = function (request, body, $completion) {
    var tmp = new $convertRequestCOROUTINE$0(this, request, body, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(ContentNegotiation).y30 = function (requestUrl, info, body, responseContentType, charset, $completion) {
    var tmp = new $convertResponseCOROUTINE$1(this, requestUrl, info, body, responseContentType, charset, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  function ContentConverterException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, ContentConverterException);
  }
  var properties_initialized_ContentNegotiation_kt_1ayduy;
  function _init_properties_ContentNegotiation_kt__o183go() {
    if (!properties_initialized_ContentNegotiation_kt_1ayduy) {
      properties_initialized_ContentNegotiation_kt_1ayduy = true;
      LOGGER = KtorSimpleLogger('io.ktor.client.plugins.contentnegotiation.ContentNegotiation');
      DefaultCommonIgnoredTypes = setOf([PrimitiveClasses_getInstance().e7(), PrimitiveClasses_getInstance().a7(), getKClass(HttpStatusCode), getKClass(ByteReadChannel), getKClass(OutgoingContent)]);
    }
  }
  function JsonContentTypeMatcher() {
  }
  protoOf(JsonContentTypeMatcher).p2z = function (contentType) {
    if (contentType.y1n(Application_getInstance().r1m_1)) {
      return true;
    }
    var value = contentType.x1n().toString();
    return startsWith(value, 'application/') ? endsWith(value, '+json') : false;
  };
  var JsonContentTypeMatcher_instance;
  function JsonContentTypeMatcher_getInstance() {
    return JsonContentTypeMatcher_instance;
  }
  function get_DefaultIgnoredTypes() {
    _init_properties_DefaultIgnoredTypesJs_kt__rjtdk1();
    return DefaultIgnoredTypes;
  }
  var DefaultIgnoredTypes;
  var properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt;
  function _init_properties_DefaultIgnoredTypesJs_kt__rjtdk1() {
    if (!properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt) {
      properties_initialized_DefaultIgnoredTypesJs_kt_65g2xt = true;
      // Inline function 'kotlin.collections.mutableSetOf' call
      DefaultIgnoredTypes = LinkedHashSet_init_$Create$();
    }
  }
  //region block: post-declaration
  protoOf(Config).z1y = register$default;
  //endregion
  //region block: init
  JsonContentTypeMatcher_instance = new JsonContentTypeMatcher();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Plugin_getInstance;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation.js.map
