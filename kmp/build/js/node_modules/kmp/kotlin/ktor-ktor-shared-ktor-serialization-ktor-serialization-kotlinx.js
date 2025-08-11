(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-serialization-kotlinx-serialization-core-js-ir.js', './ktor-ktor-http.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js', './ktor-ktor-io.js', './ktor-ktor-shared-ktor-serialization.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-serialization-kotlinx-serialization-core-js-ir.js'), require('./ktor-ktor-http.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-shared-ktor-serialization.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core-js-ir' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core-js-ir' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    if (typeof this['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    if (typeof this['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    if (typeof this['ktor-ktor-shared-ktor-serialization'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'. Its dependency 'ktor-ktor-shared-ktor-serialization' was not found. Please, check whether 'ktor-ktor-shared-ktor-serialization' is loaded prior to 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'.");
    }
    root['ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'] = factory(typeof this['ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'] === 'undefined' ? {} : this['ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx'], this['kotlin-kotlin-stdlib'], this['kotlinx-serialization-kotlinx-serialization-core-js-ir'], this['ktor-ktor-http'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'], this['ktor-ktor-io'], this['ktor-ktor-shared-ktor-serialization']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_io_ktor_ktor_http, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_serialization) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.r9;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var VOID = kotlin_kotlin.$_$.f;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.k;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var isInterface = kotlin_kotlin.$_$.h9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var classMeta = kotlin_kotlin.$_$.o8;
  var toString = kotlin_kotlin.$_$.w9;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var ByteArrayContent = kotlin_io_ktor_ktor_http.$_$.i;
  var BinaryFormat = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var withCharsetIfNeeded = kotlin_io_ktor_ktor_http.$_$.g1;
  var TextContent = kotlin_io_ktor_ktor_http.$_$.p;
  var StringFormat = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var OutgoingContent = kotlin_io_ktor_ktor_http.$_$.o;
  var asFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var firstOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var discard = kotlin_io_ktor_ktor_io.$_$.t;
  var readBytes = kotlin_io_ktor_ktor_io.$_$.u;
  var readText = kotlin_io_ktor_ktor_io.$_$.w;
  var JsonConvertException = kotlin_io_ktor_ktor_serialization.$_$.e;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.l1;
  var ContentConverter = kotlin_io_ktor_ktor_serialization.$_$.d;
  var serializerOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var Map = kotlin_kotlin.$_$.a5;
  var SetSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var Set = kotlin_kotlin.$_$.e5;
  var firstOrNull_0 = kotlin_kotlin.$_$.a6;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.h4;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var isArray = kotlin_kotlin.$_$.z8;
  var List = kotlin_kotlin.$_$.y4;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var filterNotNull = kotlin_kotlin.$_$.y5;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.h5;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.j;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.q;
  var singleOrNull = kotlin_kotlin.$_$.a7;
  var Collection = kotlin_kotlin.$_$.t4;
  var emptyList = kotlin_kotlin.$_$.v5;
  //endregion
  //region block: pre-declaration
  setMetadataFor(KotlinxSerializationExtension, 'KotlinxSerializationExtension', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [4, 3]);
  setMetadataFor(KotlinxSerializationConverter$serializeNullable$o$collect$slambda, 'KotlinxSerializationConverter$serializeNullable$o$collect$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($collectCOROUTINE$2, '$collectCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor(KotlinxSerializationConverter$deserialize$o$collect$slambda, 'KotlinxSerializationConverter$deserialize$o$collect$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($collectCOROUTINE$3, '$collectCOROUTINE$3', classMeta, CoroutineImpl);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(KotlinxSerializationConverter$serializeNullable$slambda, 'KotlinxSerializationConverter$serializeNullable$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(_no_name_provided__qut3iv_0, VOID, classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(KotlinxSerializationConverter$deserialize$slambda, 'KotlinxSerializationConverter$deserialize$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($serializeNullableCOROUTINE$0, '$serializeNullableCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor($deserializeCOROUTINE$1, '$deserializeCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor(KotlinxSerializationConverter, 'KotlinxSerializationConverter', classMeta, VOID, [ContentConverter], VOID, VOID, VOID, [4, 3]);
  //endregion
  function KotlinxSerializationExtension() {
  }
  function extensions(format) {
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var this_0 = get_providers();
    var destination = ArrayList_init_$Create$();
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'kotlin.collections.mapNotNullTo.<anonymous>' call
      // Inline function 'io.ktor.serialization.kotlinx.extensions.<anonymous>' call
      var tmp0_safe_receiver = element.h3l(format);
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        destination.r(tmp0_safe_receiver);
      }
    }
    return destination;
  }
  function serialization(_this__u8e3s4, contentType, format) {
    _this__u8e3s4.z1y(contentType, new KotlinxSerializationConverter(format));
  }
  function KotlinxSerializationConverter$serializeNullable$o$collect$slambda($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation) {
    this.q3l_1 = $$this$unsafeFlow;
    this.r3l_1 = $contentType;
    this.s3l_1 = $charset;
    this.t3l_1 = $typeInfo;
    this.u3l_1 = $value;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(KotlinxSerializationConverter$serializeNullable$o$collect$slambda).a3m = function (value, $completion) {
    var tmp = this.b3m(value, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(KotlinxSerializationConverter$serializeNullable$o$collect$slambda).eb = function (p1, $completion) {
    return this.a3m((!(p1 == null) ? isInterface(p1, KotlinxSerializationExtension) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(KotlinxSerializationConverter$serializeNullable$o$collect$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            var tmp_0 = this;
            tmp_0.w3l_1 = this.q3l_1;
            var tmp_1 = this;
            tmp_1.x3l_1 = this.v3l_1;
            var tmp_2 = this;
            tmp_2.y3l_1 = this.x3l_1;
            this.ea_1 = 1;
            suspendResult = this.y3l_1.g3l(this.r3l_1, this.s3l_1, this.t3l_1, this.u3l_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.z3l_1 = suspendResult;
            this.ea_1 = 2;
            suspendResult = this.w3l_1.vx(this.z3l_1, this);
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
  protoOf(KotlinxSerializationConverter$serializeNullable$o$collect$slambda).b3m = function (value, completion) {
    var i = new KotlinxSerializationConverter$serializeNullable$o$collect$slambda(this.q3l_1, this.r3l_1, this.s3l_1, this.t3l_1, this.u3l_1, completion);
    i.v3l_1 = value;
    return i;
  };
  function KotlinxSerializationConverter$serializeNullable$o$collect$slambda_0($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation) {
    var i = new KotlinxSerializationConverter$serializeNullable$o$collect$slambda($$this$unsafeFlow, $contentType, $charset, $typeInfo, $value, resultContinuation);
    var l = function (value, $completion) {
      return i.a3m(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$2(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.k3m_1 = _this__u8e3s4;
    this.l3m_1 = collector;
  }
  protoOf($collectCOROUTINE$2).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            var tmp_0 = this;
            tmp_0.m3m_1 = this.l3m_1;
            this.ea_1 = 1;
            var tmp_1 = KotlinxSerializationConverter$serializeNullable$o$collect$slambda_0(this.m3m_1, this.k3m_1.o3m_1, this.k3m_1.p3m_1, this.k3m_1.q3m_1, this.k3m_1.r3m_1, null);
            suspendResult = this.k3m_1.n3m_1.wx(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
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
  function KotlinxSerializationConverter$deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation) {
    this.a3n_1 = $$this$unsafeFlow;
    this.b3n_1 = $charset;
    this.c3n_1 = $typeInfo;
    this.d3n_1 = $content;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(KotlinxSerializationConverter$deserialize$o$collect$slambda).a3m = function (value, $completion) {
    var tmp = this.b3m(value, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(KotlinxSerializationConverter$deserialize$o$collect$slambda).eb = function (p1, $completion) {
    return this.a3m((!(p1 == null) ? isInterface(p1, KotlinxSerializationExtension) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(KotlinxSerializationConverter$deserialize$o$collect$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            var tmp_0 = this;
            tmp_0.f3n_1 = this.a3n_1;
            var tmp_1 = this;
            tmp_1.g3n_1 = this.e3n_1;
            var tmp_2 = this;
            tmp_2.h3n_1 = this.g3n_1;
            this.ea_1 = 1;
            suspendResult = this.h3n_1.c1z(this.b3n_1, this.c3n_1, this.d3n_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.i3n_1 = suspendResult;
            this.ea_1 = 2;
            suspendResult = this.f3n_1.vx(this.i3n_1, this);
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
  protoOf(KotlinxSerializationConverter$deserialize$o$collect$slambda).b3m = function (value, completion) {
    var i = new KotlinxSerializationConverter$deserialize$o$collect$slambda(this.a3n_1, this.b3n_1, this.c3n_1, this.d3n_1, completion);
    i.e3n_1 = value;
    return i;
  };
  function KotlinxSerializationConverter$deserialize$o$collect$slambda_0($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation) {
    var i = new KotlinxSerializationConverter$deserialize$o$collect$slambda($$this$unsafeFlow, $charset, $typeInfo, $content, resultContinuation);
    var l = function (value, $completion) {
      return i.a3m(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$3(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.r3n_1 = _this__u8e3s4;
    this.s3n_1 = collector;
  }
  protoOf($collectCOROUTINE$3).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            var tmp_0 = this;
            tmp_0.t3n_1 = this.s3n_1;
            this.ea_1 = 1;
            var tmp_1 = KotlinxSerializationConverter$deserialize$o$collect$slambda_0(this.t3n_1, this.r3n_1.v3n_1, this.r3n_1.w3n_1, this.r3n_1.x3n_1, null);
            suspendResult = this.r3n_1.u3n_1.wx(new sam$kotlinx_coroutines_flow_FlowCollector$0_0(tmp_1), this);
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
  function serializeContent($this, serializer, format, value, contentType, charset) {
    var tmp;
    if (isInterface(format, StringFormat)) {
      var content = format.f33(isInterface(serializer, KSerializer) ? serializer : THROW_CCE(), value);
      tmp = new TextContent(content, withCharsetIfNeeded(contentType, charset));
    } else {
      if (isInterface(format, BinaryFormat)) {
        var content_0 = format.h33(isInterface(serializer, KSerializer) ? serializer : THROW_CCE(), value);
        tmp = new ByteArrayContent(content_0, contentType);
      } else {
        var message = 'Unsupported format ' + format;
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    return tmp;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.y3n_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).vx = function (value, $completion) {
    return this.y3n_1(value, $completion);
  };
  function sam$kotlinx_coroutines_flow_FlowCollector$0_0(function_0) {
    this.z3n_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).vx = function (value, $completion) {
    return this.z3n_1(value, $completion);
  };
  function _no_name_provided__qut3iv($this, $contentType, $charset, $typeInfo, $value) {
    this.n3m_1 = $this;
    this.o3m_1 = $contentType;
    this.p3m_1 = $charset;
    this.q3m_1 = $typeInfo;
    this.r3m_1 = $value;
  }
  protoOf(_no_name_provided__qut3iv).a3o = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$2(this, collector, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(_no_name_provided__qut3iv).wx = function (collector, $completion) {
    return this.a3o(collector, $completion);
  };
  function KotlinxSerializationConverter$serializeNullable$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(KotlinxSerializationConverter$serializeNullable$slambda).k3o = function (it, $completion) {
    var tmp = this.l3o(it, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(KotlinxSerializationConverter$serializeNullable$slambda).eb = function (p1, $completion) {
    return this.k3o((p1 == null ? true : p1 instanceof OutgoingContent) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(KotlinxSerializationConverter$serializeNullable$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        if (tmp === 0) {
          this.fa_1 = 1;
          return !(this.j3o_1 == null);
        } else if (tmp === 1) {
          throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(KotlinxSerializationConverter$serializeNullable$slambda).l3o = function (it, completion) {
    var i = new KotlinxSerializationConverter$serializeNullable$slambda(completion);
    i.j3o_1 = it;
    return i;
  };
  function KotlinxSerializationConverter$serializeNullable$slambda_0(resultContinuation) {
    var i = new KotlinxSerializationConverter$serializeNullable$slambda(resultContinuation);
    var l = function (it, $completion) {
      return i.k3o(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function _no_name_provided__qut3iv_0($this, $charset, $typeInfo, $content) {
    this.u3n_1 = $this;
    this.v3n_1 = $charset;
    this.w3n_1 = $typeInfo;
    this.x3n_1 = $content;
  }
  protoOf(_no_name_provided__qut3iv_0).y20 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$3(this, collector, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(_no_name_provided__qut3iv_0).wx = function (collector, $completion) {
    return this.y20(collector, $completion);
  };
  function KotlinxSerializationConverter$deserialize$slambda($content, resultContinuation) {
    this.u3o_1 = $content;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(KotlinxSerializationConverter$deserialize$slambda).j21 = function (it, $completion) {
    var tmp = this.k21(it, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(KotlinxSerializationConverter$deserialize$slambda).eb = function (p1, $completion) {
    return this.j21((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(KotlinxSerializationConverter$deserialize$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        if (tmp === 0) {
          this.fa_1 = 1;
          return !(this.v3o_1 == null) ? true : this.u3o_1.z12();
        } else if (tmp === 1) {
          throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(KotlinxSerializationConverter$deserialize$slambda).k21 = function (it, completion) {
    var i = new KotlinxSerializationConverter$deserialize$slambda(this.u3o_1, completion);
    i.v3o_1 = it;
    return i;
  };
  function KotlinxSerializationConverter$deserialize$slambda_0($content, resultContinuation) {
    var i = new KotlinxSerializationConverter$deserialize$slambda($content, resultContinuation);
    var l = function (it, $completion) {
      return i.j21(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $serializeNullableCOROUTINE$0(_this__u8e3s4, contentType, charset, typeInfo, value, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e3p_1 = _this__u8e3s4;
    this.f3p_1 = contentType;
    this.g3p_1 = charset;
    this.h3p_1 = typeInfo;
    this.i3p_1 = value;
  }
  protoOf($serializeNullableCOROUTINE$0).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            this.ea_1 = 1;
            var this_0 = asFlow(this.e3p_1.k3p_1);
            var tmp_0 = new _no_name_provided__qut3iv(this_0, this.f3p_1, this.g3p_1, this.h3p_1, this.i3p_1);
            suspendResult = firstOrNull(tmp_0, KotlinxSerializationConverter$serializeNullable$slambda_0(null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var fromExtension = suspendResult;
            if (!(fromExtension == null))
              return fromExtension;
            var tmp_1;
            try {
              tmp_1 = serializerForTypeInfo(this.e3p_1.j3p_1.z35(), this.h3p_1);
            } catch ($p) {
              var tmp_2;
              if ($p instanceof SerializationException) {
                var cause = $p;
                tmp_2 = guessSerializer(this.i3p_1, this.e3p_1.j3p_1.z35());
              } else {
                throw $p;
              }
              tmp_1 = tmp_2;
            }

            var serializer = tmp_1;
            return serializeContent(this.e3p_1, serializer, this.e3p_1.j3p_1, this.i3p_1, this.f3p_1, this.g3p_1);
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
  function $deserializeCOROUTINE$1(_this__u8e3s4, charset, typeInfo, content, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.t3p_1 = _this__u8e3s4;
    this.u3p_1 = charset;
    this.v3p_1 = typeInfo;
    this.w3p_1 = content;
  }
  protoOf($deserializeCOROUTINE$1).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 5;
            this.ea_1 = 1;
            var this_0 = asFlow(this.t3p_1.k3p_1);
            var tmp_0 = new _no_name_provided__qut3iv_0(this_0, this.u3p_1, this.v3p_1, this.w3p_1);
            suspendResult = firstOrNull(tmp_0, KotlinxSerializationConverter$deserialize$slambda_0(this.w3p_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.x3p_1 = suspendResult;
            var tmp_1;
            if (!this.t3p_1.k3p_1.b1()) {
              tmp_1 = !(this.x3p_1 == null) ? true : this.w3p_1.z12();
            } else {
              tmp_1 = false;
            }

            if (tmp_1)
              return this.x3p_1;
            this.y3p_1 = serializerForTypeInfo(this.t3p_1.j3p_1.z35(), this.v3p_1);
            this.ea_1 = 2;
            suspendResult = this.w3p_1.f18(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var contentPacket = suspendResult;
            this.fa_1 = 3;
            var tmp0_subject = this.t3p_1.j3p_1;
            var tmp_2;
            if (isInterface(tmp0_subject, StringFormat)) {
              tmp_2 = this.t3p_1.j3p_1.g33(this.y3p_1, readText(contentPacket, this.u3p_1));
            } else {
              if (isInterface(tmp0_subject, BinaryFormat)) {
                tmp_2 = this.t3p_1.j3p_1.i33(this.y3p_1, readBytes(contentPacket));
              } else {
                discard(contentPacket);
                var message = 'Unsupported format ' + this.t3p_1.j3p_1;
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }

            return tmp_2;
          case 3:
            this.fa_1 = 5;
            var tmp_3 = this.ha_1;
            if (tmp_3 instanceof Error) {
              var cause = this.ha_1;
              throw new JsonConvertException('Illegal input: ' + cause.message, cause);
            } else {
              throw this.ha_1;
            }

          case 4:
            this.fa_1 = 5;
            return Unit_instance;
          case 5:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 5) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  function KotlinxSerializationConverter(format) {
    this.j3p_1 = format;
    this.k3p_1 = extensions(this.j3p_1);
    // Inline function 'kotlin.require' call
    var tmp;
    var tmp_0 = this.j3p_1;
    if (isInterface(tmp_0, BinaryFormat)) {
      tmp = true;
    } else {
      var tmp_1 = this.j3p_1;
      tmp = isInterface(tmp_1, StringFormat);
    }
    // Inline function 'kotlin.contracts.contract' call
    if (!tmp) {
      // Inline function 'io.ktor.serialization.kotlinx.KotlinxSerializationConverter.<anonymous>' call
      var message = 'Only binary and string formats are supported, ' + this.j3p_1 + ' is not supported.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(KotlinxSerializationConverter).z3p = function (contentType, charset, typeInfo, value, $completion) {
    return this.a3q(contentType, charset, typeInfo, value, $completion);
  };
  protoOf(KotlinxSerializationConverter).a1z = function (contentType, charset, typeInfo, value, $completion) {
    return this.z3p(contentType, charset, typeInfo, value, $completion);
  };
  protoOf(KotlinxSerializationConverter).a3q = function (contentType, charset, typeInfo, value, $completion) {
    var tmp = new $serializeNullableCOROUTINE$0(this, contentType, charset, typeInfo, value, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(KotlinxSerializationConverter).b1z = function (contentType, charset, typeInfo, value, $completion) {
    return this.a3q(contentType, charset, typeInfo, value, $completion);
  };
  protoOf(KotlinxSerializationConverter).c1z = function (charset, typeInfo, content, $completion) {
    var tmp = new $deserializeCOROUTINE$1(this, charset, typeInfo, content, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  function serializerForTypeInfo(_this__u8e3s4, typeInfo) {
    var module_0 = _this__u8e3s4;
    var tmp0_safe_receiver = typeInfo.b1m_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.serialization.kotlinx.serializerForTypeInfo.<anonymous>' call
      var tmp_0;
      if (tmp0_safe_receiver.o6().b1()) {
        tmp_0 = null;
      } else {
        tmp_0 = serializerOrNull(module_0, tmp0_safe_receiver);
      }
      tmp = tmp_0;
    }
    var tmp2_elvis_lhs = tmp;
    var tmp_1;
    if (tmp2_elvis_lhs == null) {
      var tmp1_safe_receiver = module_0.l33(typeInfo.z1l_1);
      tmp_1 = tmp1_safe_receiver == null ? null : maybeNullable(tmp1_safe_receiver, typeInfo);
    } else {
      tmp_1 = tmp2_elvis_lhs;
    }
    var tmp3_elvis_lhs = tmp_1;
    return tmp3_elvis_lhs == null ? maybeNullable(serializer(typeInfo.z1l_1), typeInfo) : tmp3_elvis_lhs;
  }
  function guessSerializer(value, module_0) {
    var tmp;
    if (value == null) {
      tmp = get_nullable(serializer_0(StringCompanionObject_instance));
    } else {
      if (!(value == null) ? isInterface(value, List) : false) {
        tmp = ListSerializer(elementSerializer(value, module_0));
      } else {
        if (!(value == null) ? isArray(value) : false) {
          var tmp1_safe_receiver = firstOrNull_0(value);
          var tmp_0;
          if (tmp1_safe_receiver == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'io.ktor.serialization.kotlinx.guessSerializer.<anonymous>' call
            tmp_0 = guessSerializer(tmp1_safe_receiver, module_0);
          }
          var tmp2_elvis_lhs = tmp_0;
          tmp = tmp2_elvis_lhs == null ? ListSerializer(serializer_0(StringCompanionObject_instance)) : tmp2_elvis_lhs;
        } else {
          if (!(value == null) ? isInterface(value, Set) : false) {
            tmp = SetSerializer(elementSerializer(value, module_0));
          } else {
            if (!(value == null) ? isInterface(value, Map) : false) {
              var keySerializer = elementSerializer(value.z1(), module_0);
              var valueSerializer = elementSerializer(value.a2(), module_0);
              tmp = MapSerializer(keySerializer, valueSerializer);
            } else {
              var tmp3_elvis_lhs = module_0.l33(getKClassFromExpression(value));
              tmp = tmp3_elvis_lhs == null ? serializer(getKClassFromExpression(value)) : tmp3_elvis_lhs;
            }
          }
        }
      }
    }
    var tmp_1 = tmp;
    return isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
  }
  function maybeNullable(_this__u8e3s4, typeInfo) {
    var tmp;
    var tmp0_safe_receiver = typeInfo.b1m_1;
    if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p6()) === true) {
      tmp = get_nullable(_this__u8e3s4);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function elementSerializer(_this__u8e3s4, module_0) {
    // Inline function 'kotlin.collections.distinctBy' call
    // Inline function 'kotlin.collections.map' call
    var this_0 = filterNotNull(_this__u8e3s4);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.serialization.kotlinx.elementSerializer.<anonymous>' call
      var tmp$ret$0 = guessSerializer(item, module_0);
      destination.r(tmp$ret$0);
    }
    var set = HashSet_init_$Create$();
    var list = ArrayList_init_$Create$();
    var tmp0_iterator_0 = destination.u();
    while (tmp0_iterator_0.v()) {
      var e = tmp0_iterator_0.w();
      // Inline function 'io.ktor.serialization.kotlinx.elementSerializer.<anonymous>' call
      var key = e.m32().s33();
      if (set.r(key)) {
        list.r(e);
      }
    }
    var serializers = list;
    if (serializers.n() > 1) {
      // Inline function 'kotlin.error' call
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(serializers, 10));
      var tmp0_iterator_1 = serializers.u();
      while (tmp0_iterator_1.v()) {
        var item_0 = tmp0_iterator_1.w();
        // Inline function 'io.ktor.serialization.kotlinx.elementSerializer.<anonymous>' call
        var tmp$ret$5 = item_0.m32().s33();
        destination_0.r(tmp$ret$5);
      }
      var message = 'Serializing collections of different element types is not yet supported. ' + ('Selected serializers: ' + destination_0);
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var tmp0_elvis_lhs = singleOrNull(serializers);
    var selected = tmp0_elvis_lhs == null ? serializer_0(StringCompanionObject_instance) : tmp0_elvis_lhs;
    if (selected.m32().o33()) {
      return selected;
    }
    if (!isInterface(selected, KSerializer))
      THROW_CCE();
    var tmp$ret$8;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp;
      if (isInterface(_this__u8e3s4, Collection)) {
        tmp = _this__u8e3s4.b1();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$8 = false;
        break $l$block_0;
      }
      var tmp0_iterator_2 = _this__u8e3s4.u();
      while (tmp0_iterator_2.v()) {
        var element = tmp0_iterator_2.w();
        // Inline function 'io.ktor.serialization.kotlinx.elementSerializer.<anonymous>' call
        if (element == null) {
          tmp$ret$8 = true;
          break $l$block_0;
        }
      }
      tmp$ret$8 = false;
    }
    if (tmp$ret$8) {
      return get_nullable(selected);
    }
    return selected;
  }
  function get_providers() {
    return emptyList();
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = serialization;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx.js.map
