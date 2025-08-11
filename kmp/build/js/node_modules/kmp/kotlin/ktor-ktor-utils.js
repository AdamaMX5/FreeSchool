(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-io.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js', './88b0986a7186d029-atomicfu-js-ir.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-io.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'), require('./88b0986a7186d029-atomicfu-js-ir.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof this['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'ktor-ktor-utils'.");
    }
    if (typeof this['88b0986a7186d029-atomicfu-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-utils'. Its dependency '88b0986a7186d029-atomicfu-js-ir' was not found. Please, check whether '88b0986a7186d029-atomicfu-js-ir' is loaded prior to 'ktor-ktor-utils'.");
    }
    root['ktor-ktor-utils'] = factory(typeof this['ktor-ktor-utils'] === 'undefined' ? {} : this['ktor-ktor-utils'], this['kotlin-kotlin-stdlib'], this['ktor-ktor-io'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'], this['88b0986a7186d029-atomicfu-js-ir']);
  }
}(this, function (_, kotlin_kotlin, kotlin_io_ktor_ktor_io, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlinx_atomicfu) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var charSequenceLength = kotlin_kotlin.$_$.m8;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p1;
  var protoOf = kotlin_kotlin.$_$.r9;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var getStringHashCode = kotlin_kotlin.$_$.w8;
  var classMeta = kotlin_kotlin.$_$.o8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var VOID = kotlin_kotlin.$_$.f;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var readBytes = kotlin_io_ktor_ktor_io.$_$.u;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.t;
  var equals = kotlin_kotlin.$_$.r8;
  var hashCode = kotlin_kotlin.$_$.x8;
  var MutableMap = kotlin_kotlin.$_$.c5;
  var ensureNotNull = kotlin_kotlin.$_$.cd;
  var Entry = kotlin_kotlin.$_$.z4;
  var isInterface = kotlin_kotlin.$_$.h9;
  var charArray = kotlin_kotlin.$_$.k8;
  var charSequenceGet = kotlin_kotlin.$_$.l8;
  var toString = kotlin_kotlin.$_$.k2;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.s7;
  var Key_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h;
  var Element = kotlin_kotlin.$_$.b8;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.h5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j;
  var Set = kotlin_kotlin.$_$.e5;
  var toString_0 = kotlin_kotlin.$_$.w9;
  var MutableSet = kotlin_kotlin.$_$.d5;
  var Enum = kotlin_kotlin.$_$.cc;
  var objectMeta = kotlin_kotlin.$_$.q9;
  var firstOrNull = kotlin_kotlin.$_$.z5;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.k;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.s;
  var emptyMap = kotlin_kotlin.$_$.w5;
  var getBooleanHashCode = kotlin_kotlin.$_$.u8;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.b1;
  var get_lastIndex = kotlin_kotlin.$_$.za;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.d2;
  var Char__plus_impl_qi7pgj = kotlin_kotlin.$_$.h2;
  var equals_0 = kotlin_kotlin.$_$.oa;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var Long = kotlin_kotlin.$_$.hc;
  var Comparable = kotlin_kotlin.$_$.zb;
  var isSuspendFunction = kotlin_kotlin.$_$.k9;
  var MutableList = kotlin_kotlin.$_$.b5;
  var objectCreate = kotlin_kotlin.$_$.p9;
  var ArrayList = kotlin_kotlin.$_$.s4;
  var emptyList = kotlin_kotlin.$_$.v5;
  var get_lastIndex_0 = kotlin_kotlin.$_$.i6;
  var last = kotlin_kotlin.$_$.l6;
  var mutableListOf = kotlin_kotlin.$_$.q6;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var extendThrowable = kotlin_kotlin.$_$.s8;
  var captureStack = kotlin_kotlin.$_$.i8;
  var recoverStackTrace = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p;
  var Companion_instance = kotlin_kotlin.$_$.m4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.l2;
  var createFailure = kotlin_kotlin.$_$.bd;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.m2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.n2;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.f4;
  var Continuation = kotlin_kotlin.$_$.x7;
  var fillArrayVal = kotlin_kotlin.$_$.t8;
  var intercepted = kotlin_kotlin.$_$.r7;
  var toList = kotlin_kotlin.$_$.f7;
  var isNaN_0 = kotlin_kotlin.$_$.gd;
  var numberToLong = kotlin_kotlin.$_$.o9;
  var IllegalStateException = kotlin_kotlin.$_$.gc;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.o1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(AttributeKey, 'AttributeKey', classMeta);
  function get(key) {
    var tmp0_elvis_lhs = this.r1g(key);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('No instance for key ' + key);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  setMetadataFor(Attributes, 'Attributes', interfaceMeta);
  setMetadataFor($toByteArrayCOROUTINE$0, '$toByteArrayCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(CaseInsensitiveMap, 'CaseInsensitiveMap', classMeta, VOID, [MutableMap], CaseInsensitiveMap);
  setMetadataFor(Entry_0, 'Entry', classMeta, VOID, [Entry]);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, Element]);
  setMetadataFor(DelegatingMutableSet$iterator$1, VOID, classMeta);
  setMetadataFor(DelegatingMutableSet, 'DelegatingMutableSet', classMeta, VOID, [MutableSet]);
  setMetadataFor(Platform, 'Platform', classMeta, Enum);
  setMetadataFor(PlatformUtils, 'PlatformUtils', objectMeta);
  function get_0(name) {
    var tmp0_safe_receiver = this.k1i(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  }
  function forEach(body) {
    var tmp0_iterator = this.m1i().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.StringValues.forEach.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var k = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var v = element.f2();
      body(k, v);
    }
    return Unit_instance;
  }
  setMetadataFor(StringValues, 'StringValues', interfaceMeta);
  setMetadataFor(StringValuesBuilderImpl, 'StringValuesBuilderImpl', classMeta, VOID, VOID, StringValuesBuilderImpl);
  setMetadataFor(StringValuesImpl, 'StringValuesImpl', classMeta, VOID, [StringValues], StringValuesImpl);
  setMetadataFor(CaseInsensitiveString, 'CaseInsensitiveString', classMeta);
  setMetadataFor(CopyOnWriteHashMap, 'CopyOnWriteHashMap', classMeta, VOID, VOID, CopyOnWriteHashMap);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(GMTDate, 'GMTDate', classMeta, VOID, [Comparable]);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(WeekDay, 'WeekDay', classMeta, Enum);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(Month, 'Month', classMeta, Enum);
  setMetadataFor($proceedLoopCOROUTINE$1, '$proceedLoopCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor(PipelineContext, 'PipelineContext', classMeta, VOID, [CoroutineScope], VOID, VOID, VOID, [1, 0]);
  setMetadataFor(DebugPipelineContext, 'DebugPipelineContext', classMeta, PipelineContext, VOID, VOID, VOID, VOID, [1, 0]);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(PhaseContent, 'PhaseContent', classMeta);
  setMetadataFor(Pipeline, 'Pipeline', classMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(PipelinePhase, 'PipelinePhase', classMeta);
  setMetadataFor(InvalidPhaseException, 'InvalidPhaseException', classMeta, Error);
  setMetadataFor(PipelinePhaseRelation, 'PipelinePhaseRelation', classMeta);
  setMetadataFor(After, 'After', classMeta, PipelinePhaseRelation);
  setMetadataFor(Before, 'Before', classMeta, PipelinePhaseRelation);
  setMetadataFor(Last, 'Last', objectMeta, PipelinePhaseRelation);
  setMetadataFor(SuspendFunctionGun$continuation$1, VOID, classMeta, VOID, [Continuation]);
  setMetadataFor(SuspendFunctionGun, 'SuspendFunctionGun', classMeta, PipelineContext, VOID, VOID, VOID, VOID, [0, 1]);
  setMetadataFor(TypeInfo, 'TypeInfo', classMeta);
  setMetadataFor(AttributesJs, 'AttributesJs', classMeta, VOID, [Attributes], AttributesJs);
  setMetadataFor(InvalidTimestampException, 'InvalidTimestampException', classMeta, IllegalStateException);
  setMetadataFor(KtorSimpleLogger$1, VOID, classMeta);
  setMetadataFor(JsType, 'JsType', objectMeta);
  //endregion
  function AttributeKey(name) {
    this.p1g_1 = name;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this.p1g_1;
    if (charSequenceLength(this_0) === 0) {
      throw IllegalStateException_init_$Create$("Name can't be blank");
    }
  }
  protoOf(AttributeKey).toString = function () {
    return 'AttributeKey: ' + this.p1g_1;
  };
  protoOf(AttributeKey).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof AttributeKey))
      THROW_CCE();
    if (!(this.p1g_1 === other.p1g_1))
      return false;
    return true;
  };
  protoOf(AttributeKey).hashCode = function () {
    return getStringHashCode(this.p1g_1);
  };
  function Attributes() {
  }
  function putAll(_this__u8e3s4, other) {
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = other.w1g().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.putAll.<anonymous>' call
      _this__u8e3s4.t1g(element instanceof AttributeKey ? element : THROW_CCE(), other.q1g(element));
    }
  }
  function toByteArray(_this__u8e3s4, $completion) {
    var tmp = new $toByteArrayCOROUTINE$0(_this__u8e3s4, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  }
  function $toByteArrayCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f1h_1 = _this__u8e3s4;
  }
  protoOf($toByteArrayCOROUTINE$0).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 2;
            this.ea_1 = 1;
            suspendResult = this.f1h_1.f18(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            return readBytes(ARGUMENT);
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
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj($this$$receiver) {
    return $this$$receiver.g1h_1;
  }
  function CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0($this$$receiver) {
    return caseInsensitive($this$$receiver);
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19($this$$receiver) {
    return new Entry_0($this$$receiver.e2().g1h_1, $this$$receiver.f2());
  }
  function CaseInsensitiveMap$_get_entries_$lambda_r32w19_0($this$$receiver) {
    return new Entry_0(caseInsensitive($this$$receiver.e2()), $this$$receiver.f2());
  }
  function CaseInsensitiveMap() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.i1h_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(CaseInsensitiveMap).n = function () {
    return this.i1h_1.n();
  };
  protoOf(CaseInsensitiveMap).j1h = function (key) {
    return this.i1h_1.j2(new CaseInsensitiveString(key));
  };
  protoOf(CaseInsensitiveMap).j2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.j1h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).k1h = function (key) {
    return this.i1h_1.m2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).m2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.k1h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).b1 = function () {
    return this.i1h_1.b1();
  };
  protoOf(CaseInsensitiveMap).x = function () {
    this.i1h_1.x();
  };
  protoOf(CaseInsensitiveMap).l1h = function (key, value) {
    return this.i1h_1.c2(caseInsensitive(key), value);
  };
  protoOf(CaseInsensitiveMap).c2 = function (key, value) {
    var tmp = (!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE();
    return this.l1h(tmp, !(value == null) ? value : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).m1h = function (from) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = from.b2().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.CaseInsensitiveMap.putAll.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var value = element.f2();
      this.l1h(key, value);
    }
  };
  protoOf(CaseInsensitiveMap).d2 = function (from) {
    return this.m1h(from);
  };
  protoOf(CaseInsensitiveMap).n1h = function (key) {
    return this.i1h_1.g2(caseInsensitive(key));
  };
  protoOf(CaseInsensitiveMap).g2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.n1h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(CaseInsensitiveMap).z1 = function () {
    var tmp = this.i1h_1.z1();
    var tmp_0 = CaseInsensitiveMap$_get_keys_$lambda_ptzlqj;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_keys_$lambda_ptzlqj_0);
  };
  protoOf(CaseInsensitiveMap).b2 = function () {
    var tmp = this.i1h_1.b2();
    var tmp_0 = CaseInsensitiveMap$_get_entries_$lambda_r32w19;
    return new DelegatingMutableSet(tmp, tmp_0, CaseInsensitiveMap$_get_entries_$lambda_r32w19_0);
  };
  protoOf(CaseInsensitiveMap).a2 = function () {
    return this.i1h_1.a2();
  };
  protoOf(CaseInsensitiveMap).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(other instanceof CaseInsensitiveMap);
    }
    if (tmp)
      return false;
    return equals(other.i1h_1, this.i1h_1);
  };
  protoOf(CaseInsensitiveMap).hashCode = function () {
    return hashCode(this.i1h_1);
  };
  function Entry_0(key, value) {
    this.o1h_1 = key;
    this.p1h_1 = value;
  }
  protoOf(Entry_0).e2 = function () {
    return this.o1h_1;
  };
  protoOf(Entry_0).f2 = function () {
    return this.p1h_1;
  };
  protoOf(Entry_0).hashCode = function () {
    return (527 + hashCode(ensureNotNull(this.o1h_1)) | 0) + hashCode(ensureNotNull(this.p1h_1)) | 0;
  };
  protoOf(Entry_0).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(!(other == null) ? isInterface(other, Entry) : false);
    }
    if (tmp)
      return false;
    return equals(other.e2(), this.o1h_1) ? equals(other.f2(), this.p1h_1) : false;
  };
  protoOf(Entry_0).toString = function () {
    return '' + this.o1h_1 + '=' + this.p1h_1;
  };
  function toCharArray(_this__u8e3s4) {
    var tmp = 0;
    var tmp_0 = _this__u8e3s4.length;
    var tmp_1 = charArray(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = charSequenceGet(_this__u8e3s4, tmp_2);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function isLowerCase(_this__u8e3s4) {
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = toString(_this__u8e3s4).toLowerCase();
    return charSequenceGet(tmp$ret$2, 0) === _this__u8e3s4;
  }
  function caseInsensitiveMap() {
    return new CaseInsensitiveMap();
  }
  function SilentSupervisor(parent) {
    parent = parent === VOID ? null : parent;
    var tmp = SupervisorJob(parent);
    // Inline function 'kotlinx.coroutines.CoroutineExceptionHandler' call
    var tmp$ret$0 = new _no_name_provided__qut3iv();
    return tmp.ed(tmp$ret$0);
  }
  function _no_name_provided__qut3iv() {
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(_no_name_provided__qut3iv).vn = function (context, exception) {
    // Inline function 'io.ktor.util.SilentSupervisor.<anonymous>' call
    return Unit_instance;
  };
  function DelegatingMutableSet$iterator$1(this$0) {
    this.s1h_1 = this$0;
    this.r1h_1 = this$0.t1h_1.u();
  }
  protoOf(DelegatingMutableSet$iterator$1).v = function () {
    return this.r1h_1.v();
  };
  protoOf(DelegatingMutableSet$iterator$1).w = function () {
    return this.s1h_1.u1h_1(this.r1h_1.w());
  };
  protoOf(DelegatingMutableSet$iterator$1).y = function () {
    return this.r1h_1.y();
  };
  function DelegatingMutableSet(delegate, convertTo, convert) {
    this.t1h_1 = delegate;
    this.u1h_1 = convertTo;
    this.v1h_1 = convert;
    this.w1h_1 = this.t1h_1.n();
  }
  protoOf(DelegatingMutableSet).x1h = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var tmp0_iterator = _this__u8e3s4.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.util.DelegatingMutableSet.convert.<anonymous>' call
      var tmp$ret$0 = this.v1h_1(item);
      destination.r(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).y1h = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(_this__u8e3s4, 10));
    var tmp0_iterator = _this__u8e3s4.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.util.DelegatingMutableSet.convertTo.<anonymous>' call
      var tmp$ret$0 = this.u1h_1(item);
      destination.r(tmp$ret$0);
    }
    return destination;
  };
  protoOf(DelegatingMutableSet).n = function () {
    return this.w1h_1;
  };
  protoOf(DelegatingMutableSet).z1h = function (element) {
    return this.t1h_1.r(this.v1h_1(element));
  };
  protoOf(DelegatingMutableSet).r = function (element) {
    return this.z1h((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).a1i = function (elements) {
    return this.t1h_1.s(this.x1h(elements));
  };
  protoOf(DelegatingMutableSet).s = function (elements) {
    return this.a1i(elements);
  };
  protoOf(DelegatingMutableSet).x = function () {
    this.t1h_1.x();
  };
  protoOf(DelegatingMutableSet).b1i = function (element) {
    return this.t1h_1.z(this.v1h_1(element));
  };
  protoOf(DelegatingMutableSet).z = function (element) {
    if (!(element == null ? true : !(element == null)))
      return false;
    return this.b1i((element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(DelegatingMutableSet).c1i = function (elements) {
    return this.t1h_1.a1(this.x1h(elements));
  };
  protoOf(DelegatingMutableSet).a1 = function (elements) {
    return this.c1i(elements);
  };
  protoOf(DelegatingMutableSet).b1 = function () {
    return this.t1h_1.b1();
  };
  protoOf(DelegatingMutableSet).u = function () {
    return new DelegatingMutableSet$iterator$1(this);
  };
  protoOf(DelegatingMutableSet).hashCode = function () {
    return hashCode(this.t1h_1);
  };
  protoOf(DelegatingMutableSet).equals = function (other) {
    var tmp;
    if (other == null) {
      tmp = true;
    } else {
      tmp = !(!(other == null) ? isInterface(other, Set) : false);
    }
    if (tmp)
      return false;
    var elements = this.y1h(this.t1h_1);
    var tmp_0;
    if (other.a1(elements)) {
      // Inline function 'kotlin.collections.containsAll' call
      tmp_0 = elements.a1(other);
    } else {
      tmp_0 = false;
    }
    return tmp_0;
  };
  protoOf(DelegatingMutableSet).toString = function () {
    return toString_0(this.y1h(this.t1h_1));
  };
  var Platform_Jvm_instance;
  var Platform_Native_instance;
  var Platform_Browser_instance;
  var Platform_Node_instance;
  var Platform_entriesInitialized;
  function Platform_initEntries() {
    if (Platform_entriesInitialized)
      return Unit_instance;
    Platform_entriesInitialized = true;
    Platform_Jvm_instance = new Platform('Jvm', 0);
    Platform_Native_instance = new Platform('Native', 1);
    Platform_Browser_instance = new Platform('Browser', 2);
    Platform_Node_instance = new Platform('Node', 3);
  }
  function Platform(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PlatformUtils() {
    PlatformUtils_instance = this;
    this.d1i_1 = get_platform(this).equals(Platform_Browser_getInstance());
    this.e1i_1 = get_platform(this).equals(Platform_Node_getInstance());
    this.f1i_1 = get_platform(this).equals(Platform_Jvm_getInstance());
    this.g1i_1 = get_platform(this).equals(Platform_Native_getInstance());
    this.h1i_1 = get_isDevelopmentMode(this);
    this.i1i_1 = get_isNewMemoryModel(this);
  }
  var PlatformUtils_instance;
  function PlatformUtils_getInstance() {
    if (PlatformUtils_instance == null)
      new PlatformUtils();
    return PlatformUtils_instance;
  }
  function Platform_Jvm_getInstance() {
    Platform_initEntries();
    return Platform_Jvm_instance;
  }
  function Platform_Native_getInstance() {
    Platform_initEntries();
    return Platform_Native_instance;
  }
  function Platform_Browser_getInstance() {
    Platform_initEntries();
    return Platform_Browser_instance;
  }
  function Platform_Node_getInstance() {
    Platform_initEntries();
    return Platform_Node_instance;
  }
  function StringValues() {
  }
  function ensureListForKey($this, name) {
    var tmp0_elvis_lhs = $this.p1i_1.m2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.collections.mutableListOf' call
      var this_0 = ArrayList_init_$Create$_0();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.util.StringValuesBuilderImpl.ensureListForKey.<anonymous>' call
      $this.q1i(name);
      // Inline function 'kotlin.collections.set' call
      $this.p1i_1.c2(name, this_0);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function StringValuesBuilderImpl$appendAll$lambda(this$0) {
    return function (name, values) {
      this$0.r1i(name, values);
      return Unit_instance;
    };
  }
  function StringValuesBuilderImpl(caseInsensitiveName, size) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    size = size === VOID ? 8 : size;
    this.o1i_1 = caseInsensitiveName;
    this.p1i_1 = this.o1i_1 ? caseInsensitiveMap() : LinkedHashMap_init_$Create$_0(size);
  }
  protoOf(StringValuesBuilderImpl).j1i = function () {
    return this.o1i_1;
  };
  protoOf(StringValuesBuilderImpl).k1i = function (name) {
    return this.p1i_1.m2(name);
  };
  protoOf(StringValuesBuilderImpl).l1i = function () {
    return this.p1i_1.z1();
  };
  protoOf(StringValuesBuilderImpl).b1 = function () {
    return this.p1i_1.b1();
  };
  protoOf(StringValuesBuilderImpl).m1i = function () {
    return unmodifiable(this.p1i_1.b2());
  };
  protoOf(StringValuesBuilderImpl).s1i = function (name, value) {
    this.t1i(value);
    var list = ensureListForKey(this, name);
    list.x();
    list.r(value);
  };
  protoOf(StringValuesBuilderImpl).k1h = function (name) {
    var tmp0_safe_receiver = this.k1i(name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesBuilderImpl).u1i = function (name, value) {
    this.t1i(value);
    ensureListForKey(this, name).r(value);
  };
  protoOf(StringValuesBuilderImpl).v1i = function (stringValues) {
    stringValues.n1i(StringValuesBuilderImpl$appendAll$lambda(this));
  };
  protoOf(StringValuesBuilderImpl).r1i = function (name, values) {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    var list = ensureListForKey(this, name);
    var tmp0_iterator = values.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.StringValuesBuilderImpl.appendAll.<anonymous>.<anonymous>' call
      this.t1i(element);
      list.r(element);
    }
  };
  protoOf(StringValuesBuilderImpl).w1i = function (name) {
    this.p1i_1.g2(name);
  };
  protoOf(StringValuesBuilderImpl).x = function () {
    this.p1i_1.x();
  };
  protoOf(StringValuesBuilderImpl).q1i = function (name) {
  };
  protoOf(StringValuesBuilderImpl).t1i = function (value) {
  };
  function listForKey($this, name) {
    return $this.y1i_1.m2(name);
  }
  function StringValuesImpl(caseInsensitiveName, values) {
    caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
    values = values === VOID ? emptyMap() : values;
    this.x1i_1 = caseInsensitiveName;
    var tmp;
    if (this.x1i_1) {
      tmp = caseInsensitiveMap();
    } else {
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp = LinkedHashMap_init_$Create$();
    }
    var newMap = tmp;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = values.b2().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.StringValuesImpl.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var value = element.f2();
      // Inline function 'kotlin.collections.set' call
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var size = value.n();
      var list = ArrayList_init_$Create$(size);
      // Inline function 'kotlin.repeat' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      if (inductionVariable < size)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.collections.MutableList.<anonymous>' call
          // Inline function 'io.ktor.util.StringValuesImpl.<anonymous>.<anonymous>' call
          var tmp$ret$4 = value.f1(index);
          list.r(tmp$ret$4);
        }
         while (inductionVariable < size);
      newMap.c2(key, list);
    }
    this.y1i_1 = newMap;
  }
  protoOf(StringValuesImpl).j1i = function () {
    return this.x1i_1;
  };
  protoOf(StringValuesImpl).k1h = function (name) {
    var tmp0_safe_receiver = listForKey(this, name);
    return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
  };
  protoOf(StringValuesImpl).k1i = function (name) {
    return listForKey(this, name);
  };
  protoOf(StringValuesImpl).l1i = function () {
    return unmodifiable(this.y1i_1.z1());
  };
  protoOf(StringValuesImpl).b1 = function () {
    return this.y1i_1.b1();
  };
  protoOf(StringValuesImpl).m1i = function () {
    return unmodifiable(this.y1i_1.b2());
  };
  protoOf(StringValuesImpl).n1i = function (body) {
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.y1i_1.b2().u();
    while (tmp0_iterator.v()) {
      var tmp1_loop_parameter = tmp0_iterator.w();
      // Inline function 'kotlin.collections.component1' call
      var key = tmp1_loop_parameter.e2();
      // Inline function 'kotlin.collections.component2' call
      var value = tmp1_loop_parameter.f2();
      body(key, value);
    }
  };
  protoOf(StringValuesImpl).toString = function () {
    return 'StringValues(case=' + !this.x1i_1 + ') ' + this.m1i();
  };
  protoOf(StringValuesImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(!(other == null) ? isInterface(other, StringValues) : false))
      return false;
    if (!(this.x1i_1 === other.j1i()))
      return false;
    return entriesEquals(this.m1i(), other.m1i());
  };
  protoOf(StringValuesImpl).hashCode = function () {
    return entriesHashCode(this.m1i(), imul(31, getBooleanHashCode(this.x1i_1)));
  };
  function appendAll(_this__u8e3s4, builder) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.util.appendAll.<anonymous>' call
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = builder.m1i().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.util.appendAll.<anonymous>.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var name = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var values = element.f2();
      _this__u8e3s4.r1i(name, values);
    }
    return _this__u8e3s4;
  }
  function entriesEquals(a, b) {
    return equals(a, b);
  }
  function entriesHashCode(entries, seed) {
    return imul(seed, 31) + hashCode(entries) | 0;
  }
  function toLowerCasePreservingASCIIRules(_this__u8e3s4) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.indexOfFirst' call
      var inductionVariable = 0;
      var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'io.ktor.util.toLowerCasePreservingASCIIRules.<anonymous>' call
          var it = charSequenceGet(_this__u8e3s4, index);
          if (!(toLowerCasePreservingASCII(it) === it)) {
            tmp$ret$1 = index;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = -1;
    }
    var firstIndex = tmp$ret$1;
    if (firstIndex === -1) {
      return _this__u8e3s4;
    }
    var original = _this__u8e3s4;
    // Inline function 'kotlin.text.buildString' call
    var capacity = _this__u8e3s4.length;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$(capacity);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.util.toLowerCasePreservingASCIIRules.<anonymous>' call
    this_0.l7(original, 0, firstIndex);
    var inductionVariable_0 = firstIndex;
    var last_0 = get_lastIndex(original);
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        this_0.j5(toLowerCasePreservingASCII(charSequenceGet(original, index_0)));
      }
       while (!(index_0 === last_0));
    return this_0.toString();
  }
  function toLowerCasePreservingASCII(ch) {
    var tmp;
    if (_Char___init__impl__6a9atx(65) <= ch ? ch <= _Char___init__impl__6a9atx(90) : false) {
      tmp = Char__plus_impl_qi7pgj(ch, 32);
    } else if (_Char___init__impl__6a9atx(0) <= ch ? ch <= _Char___init__impl__6a9atx(127) : false) {
      tmp = ch;
    } else {
      // Inline function 'kotlin.text.lowercaseChar' call
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$2 = toString(ch).toLowerCase();
      tmp = charSequenceGet(tmp$ret$2, 0);
    }
    return tmp;
  }
  function CaseInsensitiveString(content) {
    this.g1h_1 = content;
    var tmp = this;
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = this.g1h_1.toLowerCase();
    tmp.h1h_1 = getStringHashCode(tmp$ret$1);
  }
  protoOf(CaseInsensitiveString).equals = function (other) {
    var tmp0_safe_receiver = other instanceof CaseInsensitiveString ? other : null;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g1h_1;
    return (tmp1_safe_receiver == null ? null : equals_0(tmp1_safe_receiver, this.g1h_1, true)) === true;
  };
  protoOf(CaseInsensitiveString).hashCode = function () {
    return this.h1h_1;
  };
  protoOf(CaseInsensitiveString).toString = function () {
    return this.g1h_1;
  };
  function caseInsensitive(_this__u8e3s4) {
    return new CaseInsensitiveString(_this__u8e3s4);
  }
  function CopyOnWriteHashMap() {
    this.z1i_1 = atomic$ref$1(emptyMap());
  }
  protoOf(CopyOnWriteHashMap).a1j = function (key) {
    return this.z1i_1.kotlinx$atomicfu$value.m2(key);
  };
  function Companion() {
    Companion_instance_0 = this;
    this.b1j_1 = GMTDate_0(new Long(0, 0));
  }
  var Companion_instance_0;
  function Companion_getInstance() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function GMTDate(seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp) {
    Companion_getInstance();
    this.c1j_1 = seconds;
    this.d1j_1 = minutes;
    this.e1j_1 = hours;
    this.f1j_1 = dayOfWeek;
    this.g1j_1 = dayOfMonth;
    this.h1j_1 = dayOfYear;
    this.i1j_1 = month;
    this.j1j_1 = year;
    this.k1j_1 = timestamp;
  }
  protoOf(GMTDate).l1j = function (other) {
    return this.k1j_1.i8(other.k1j_1);
  };
  protoOf(GMTDate).d = function (other) {
    return this.l1j(other instanceof GMTDate ? other : THROW_CCE());
  };
  protoOf(GMTDate).toString = function () {
    return 'GMTDate(seconds=' + this.c1j_1 + ', minutes=' + this.d1j_1 + ', hours=' + this.e1j_1 + ', dayOfWeek=' + this.f1j_1 + ', dayOfMonth=' + this.g1j_1 + ', dayOfYear=' + this.h1j_1 + ', month=' + this.i1j_1 + ', year=' + this.j1j_1 + ', timestamp=' + this.k1j_1.toString() + ')';
  };
  protoOf(GMTDate).hashCode = function () {
    var result = this.c1j_1;
    result = imul(result, 31) + this.d1j_1 | 0;
    result = imul(result, 31) + this.e1j_1 | 0;
    result = imul(result, 31) + this.f1j_1.hashCode() | 0;
    result = imul(result, 31) + this.g1j_1 | 0;
    result = imul(result, 31) + this.h1j_1 | 0;
    result = imul(result, 31) + this.i1j_1.hashCode() | 0;
    result = imul(result, 31) + this.j1j_1 | 0;
    result = imul(result, 31) + this.k1j_1.hashCode() | 0;
    return result;
  };
  protoOf(GMTDate).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof GMTDate))
      return false;
    var tmp0_other_with_cast = other instanceof GMTDate ? other : THROW_CCE();
    if (!(this.c1j_1 === tmp0_other_with_cast.c1j_1))
      return false;
    if (!(this.d1j_1 === tmp0_other_with_cast.d1j_1))
      return false;
    if (!(this.e1j_1 === tmp0_other_with_cast.e1j_1))
      return false;
    if (!this.f1j_1.equals(tmp0_other_with_cast.f1j_1))
      return false;
    if (!(this.g1j_1 === tmp0_other_with_cast.g1j_1))
      return false;
    if (!(this.h1j_1 === tmp0_other_with_cast.h1j_1))
      return false;
    if (!this.i1j_1.equals(tmp0_other_with_cast.i1j_1))
      return false;
    if (!(this.j1j_1 === tmp0_other_with_cast.j1j_1))
      return false;
    if (!this.k1j_1.equals(tmp0_other_with_cast.k1j_1))
      return false;
    return true;
  };
  var WeekDay_MONDAY_instance;
  var WeekDay_TUESDAY_instance;
  var WeekDay_WEDNESDAY_instance;
  var WeekDay_THURSDAY_instance;
  var WeekDay_FRIDAY_instance;
  var WeekDay_SATURDAY_instance;
  var WeekDay_SUNDAY_instance;
  function Companion_0() {
  }
  protoOf(Companion_0).m1j = function (ordinal) {
    return values()[ordinal];
  };
  var Companion_instance_1;
  function Companion_getInstance_0() {
    return Companion_instance_1;
  }
  function values() {
    return [WeekDay_MONDAY_getInstance(), WeekDay_TUESDAY_getInstance(), WeekDay_WEDNESDAY_getInstance(), WeekDay_THURSDAY_getInstance(), WeekDay_FRIDAY_getInstance(), WeekDay_SATURDAY_getInstance(), WeekDay_SUNDAY_getInstance()];
  }
  var WeekDay_entriesInitialized;
  function WeekDay_initEntries() {
    if (WeekDay_entriesInitialized)
      return Unit_instance;
    WeekDay_entriesInitialized = true;
    WeekDay_MONDAY_instance = new WeekDay('MONDAY', 0, 'Mon');
    WeekDay_TUESDAY_instance = new WeekDay('TUESDAY', 1, 'Tue');
    WeekDay_WEDNESDAY_instance = new WeekDay('WEDNESDAY', 2, 'Wed');
    WeekDay_THURSDAY_instance = new WeekDay('THURSDAY', 3, 'Thu');
    WeekDay_FRIDAY_instance = new WeekDay('FRIDAY', 4, 'Fri');
    WeekDay_SATURDAY_instance = new WeekDay('SATURDAY', 5, 'Sat');
    WeekDay_SUNDAY_instance = new WeekDay('SUNDAY', 6, 'Sun');
  }
  function WeekDay(name, ordinal, value) {
    Enum.call(this, name, ordinal);
    this.p1j_1 = value;
  }
  var Month_JANUARY_instance;
  var Month_FEBRUARY_instance;
  var Month_MARCH_instance;
  var Month_APRIL_instance;
  var Month_MAY_instance;
  var Month_JUNE_instance;
  var Month_JULY_instance;
  var Month_AUGUST_instance;
  var Month_SEPTEMBER_instance;
  var Month_OCTOBER_instance;
  var Month_NOVEMBER_instance;
  var Month_DECEMBER_instance;
  function Companion_1() {
  }
  protoOf(Companion_1).m1j = function (ordinal) {
    return values_0()[ordinal];
  };
  var Companion_instance_2;
  function Companion_getInstance_1() {
    return Companion_instance_2;
  }
  function values_0() {
    return [Month_JANUARY_getInstance(), Month_FEBRUARY_getInstance(), Month_MARCH_getInstance(), Month_APRIL_getInstance(), Month_MAY_getInstance(), Month_JUNE_getInstance(), Month_JULY_getInstance(), Month_AUGUST_getInstance(), Month_SEPTEMBER_getInstance(), Month_OCTOBER_getInstance(), Month_NOVEMBER_getInstance(), Month_DECEMBER_getInstance()];
  }
  var Month_entriesInitialized;
  function Month_initEntries() {
    if (Month_entriesInitialized)
      return Unit_instance;
    Month_entriesInitialized = true;
    Month_JANUARY_instance = new Month('JANUARY', 0, 'Jan');
    Month_FEBRUARY_instance = new Month('FEBRUARY', 1, 'Feb');
    Month_MARCH_instance = new Month('MARCH', 2, 'Mar');
    Month_APRIL_instance = new Month('APRIL', 3, 'Apr');
    Month_MAY_instance = new Month('MAY', 4, 'May');
    Month_JUNE_instance = new Month('JUNE', 5, 'Jun');
    Month_JULY_instance = new Month('JULY', 6, 'Jul');
    Month_AUGUST_instance = new Month('AUGUST', 7, 'Aug');
    Month_SEPTEMBER_instance = new Month('SEPTEMBER', 8, 'Sep');
    Month_OCTOBER_instance = new Month('OCTOBER', 9, 'Oct');
    Month_NOVEMBER_instance = new Month('NOVEMBER', 10, 'Nov');
    Month_DECEMBER_instance = new Month('DECEMBER', 11, 'Dec');
  }
  function Month(name, ordinal, value) {
    Enum.call(this, name, ordinal);
    this.s1j_1 = value;
  }
  function WeekDay_MONDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_MONDAY_instance;
  }
  function WeekDay_TUESDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_TUESDAY_instance;
  }
  function WeekDay_WEDNESDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_WEDNESDAY_instance;
  }
  function WeekDay_THURSDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_THURSDAY_instance;
  }
  function WeekDay_FRIDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_FRIDAY_instance;
  }
  function WeekDay_SATURDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_SATURDAY_instance;
  }
  function WeekDay_SUNDAY_getInstance() {
    WeekDay_initEntries();
    return WeekDay_SUNDAY_instance;
  }
  function Month_JANUARY_getInstance() {
    Month_initEntries();
    return Month_JANUARY_instance;
  }
  function Month_FEBRUARY_getInstance() {
    Month_initEntries();
    return Month_FEBRUARY_instance;
  }
  function Month_MARCH_getInstance() {
    Month_initEntries();
    return Month_MARCH_instance;
  }
  function Month_APRIL_getInstance() {
    Month_initEntries();
    return Month_APRIL_instance;
  }
  function Month_MAY_getInstance() {
    Month_initEntries();
    return Month_MAY_instance;
  }
  function Month_JUNE_getInstance() {
    Month_initEntries();
    return Month_JUNE_instance;
  }
  function Month_JULY_getInstance() {
    Month_initEntries();
    return Month_JULY_instance;
  }
  function Month_AUGUST_getInstance() {
    Month_initEntries();
    return Month_AUGUST_instance;
  }
  function Month_SEPTEMBER_getInstance() {
    Month_initEntries();
    return Month_SEPTEMBER_instance;
  }
  function Month_OCTOBER_getInstance() {
    Month_initEntries();
    return Month_OCTOBER_instance;
  }
  function Month_NOVEMBER_getInstance() {
    Month_initEntries();
    return Month_NOVEMBER_instance;
  }
  function Month_DECEMBER_getInstance() {
    Month_initEntries();
    return Month_DECEMBER_instance;
  }
  function proceedLoop($this, $completion) {
    var tmp = new $proceedLoopCOROUTINE$1($this, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  }
  function $proceedLoopCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.b1k_1 = _this__u8e3s4;
  }
  protoOf($proceedLoopCOROUTINE$1).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 6;
            this.ea_1 = 1;
            continue $sm;
          case 1:
            this.c1k_1 = this.b1k_1.j1k_1;
            if (this.c1k_1 === -1) {
              this.ea_1 = 5;
              continue $sm;
            } else {
              this.ea_1 = 2;
              continue $sm;
            }

          case 2:
            this.d1k_1 = this.b1k_1.g1k_1;
            if (this.c1k_1 >= this.d1k_1.n()) {
              this.b1k_1.k1k();
              this.ea_1 = 5;
              continue $sm;
            } else {
              this.ea_1 = 3;
              continue $sm;
            }

          case 3:
            this.e1k_1 = this.d1k_1.f1(this.c1k_1);
            this.b1k_1.j1k_1 = this.c1k_1 + 1 | 0;
            this.ea_1 = 4;
            var tmp_0 = this.e1k_1;
            suspendResult = (isSuspendFunction(tmp_0, 2) ? tmp_0 : THROW_CCE())(this.b1k_1, this.b1k_1.i1k_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.ea_1 = 1;
            continue $sm;
          case 5:
            return this.b1k_1.i1k_1;
          case 6:
            throw this.ha_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.fa_1 === 6) {
          throw e;
        } else {
          this.ea_1 = this.fa_1;
          this.ha_1 = e;
        }
      }
     while (true);
  };
  function DebugPipelineContext(context, interceptors, subject, coroutineContext) {
    PipelineContext.call(this, context);
    this.g1k_1 = interceptors;
    this.h1k_1 = coroutineContext;
    this.i1k_1 = subject;
    this.j1k_1 = 0;
  }
  protoOf(DebugPipelineContext).rh = function () {
    return this.h1k_1;
  };
  protoOf(DebugPipelineContext).l1k = function () {
    return this.i1k_1;
  };
  protoOf(DebugPipelineContext).k1k = function () {
    this.j1k_1 = -1;
  };
  protoOf(DebugPipelineContext).m1k = function (subject, $completion) {
    this.i1k_1 = subject;
    return this.n1k($completion);
  };
  protoOf(DebugPipelineContext).n1k = function ($completion) {
    var index = this.j1k_1;
    if (index < 0)
      return this.i1k_1;
    if (index >= this.g1k_1.n()) {
      this.k1k();
      return this.i1k_1;
    }
    return proceedLoop(this, $completion);
  };
  protoOf(DebugPipelineContext).o1k = function (initial, $completion) {
    this.j1k_1 = 0;
    this.i1k_1 = initial;
    return this.n1k($completion);
  };
  function PhaseContent_init_$Init$(phase, relation, $this) {
    var tmp = Companion_getInstance_2().p1k_1;
    PhaseContent.call($this, phase, relation, isInterface(tmp, MutableList) ? tmp : THROW_CCE());
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!Companion_getInstance_2().p1k_1.b1()) {
      // Inline function 'io.ktor.util.pipeline.PhaseContent.<init>.<anonymous>' call
      var message = 'The shared empty array list has been modified';
      throw IllegalStateException_init_$Create$(toString_0(message));
    }
    return $this;
  }
  function PhaseContent_init_$Create$(phase, relation) {
    return PhaseContent_init_$Init$(phase, relation, objectCreate(protoOf(PhaseContent)));
  }
  function copyInterceptors($this) {
    $this.s1k_1 = $this.u1k();
    $this.t1k_1 = false;
  }
  function Companion_2() {
    Companion_instance_3 = this;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.p1k_1 = ArrayList_init_$Create$_0();
  }
  var Companion_instance_3;
  function Companion_getInstance_2() {
    if (Companion_instance_3 == null)
      new Companion_2();
    return Companion_instance_3;
  }
  function PhaseContent(phase, relation, interceptors) {
    Companion_getInstance_2();
    this.q1k_1 = phase;
    this.r1k_1 = relation;
    this.s1k_1 = interceptors;
    this.t1k_1 = true;
  }
  protoOf(PhaseContent).y11 = function () {
    return this.s1k_1.b1();
  };
  protoOf(PhaseContent).n = function () {
    return this.s1k_1.n();
  };
  protoOf(PhaseContent).v1k = function (interceptor) {
    if (this.t1k_1) {
      copyInterceptors(this);
    }
    this.s1k_1.r(interceptor);
  };
  protoOf(PhaseContent).w1k = function (destination) {
    var interceptors = this.s1k_1;
    if (destination instanceof ArrayList) {
      destination.u2(destination.n() + interceptors.n() | 0);
    }
    var inductionVariable = 0;
    var last = interceptors.n();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        destination.r(interceptors.f1(index));
      }
       while (inductionVariable < last);
  };
  protoOf(PhaseContent).x1k = function () {
    this.t1k_1 = true;
    return this.s1k_1;
  };
  protoOf(PhaseContent).u1k = function () {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.collections.mutableListOf' call
    var this_0 = ArrayList_init_$Create$_0();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.util.pipeline.PhaseContent.copiedInterceptors.<anonymous>' call
    this_0.s(this.s1k_1);
    return this_0;
  };
  protoOf(PhaseContent).toString = function () {
    return 'Phase `' + this.q1k_1.y1k_1 + '`, ' + this.n() + ' handlers';
  };
  function _set_interceptors__wod97b($this, value) {
    $this.d1l_1.kotlinx$atomicfu$value = value;
  }
  function _get_interceptors__h4min7($this) {
    return $this.d1l_1.kotlinx$atomicfu$value;
  }
  function createContext($this, context, subject, coroutineContext) {
    return pipelineContextFor(context, sharedInterceptorsList($this), subject, coroutineContext, $this.g1l());
  }
  function findPhase($this, phase) {
    var phasesList = $this.b1l_1;
    var inductionVariable = 0;
    var last = phasesList.n();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.f1(index);
        if (current === phase) {
          var content = PhaseContent_init_$Create$(phase, Last_getInstance());
          phasesList.o(index, content);
          return content;
        }
        var tmp;
        if (current instanceof PhaseContent) {
          tmp = current.q1k_1 === phase;
        } else {
          tmp = false;
        }
        if (tmp) {
          return current instanceof PhaseContent ? current : THROW_CCE();
        }
      }
       while (inductionVariable < last);
    return null;
  }
  function findPhaseIndex($this, phase) {
    var phasesList = $this.b1l_1;
    var inductionVariable = 0;
    var last = phasesList.n();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.f1(index);
        var tmp;
        if (current === phase) {
          tmp = true;
        } else {
          var tmp_0;
          if (current instanceof PhaseContent) {
            tmp_0 = current.q1k_1 === phase;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        if (tmp) {
          return index;
        }
      }
       while (inductionVariable < last);
    return -1;
  }
  function hasPhase($this, phase) {
    var phasesList = $this.b1l_1;
    var inductionVariable = 0;
    var last = phasesList.n();
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var current = phasesList.f1(index);
        var tmp;
        if (current === phase) {
          tmp = true;
        } else {
          var tmp_0;
          if (current instanceof PhaseContent) {
            tmp_0 = current.q1k_1 === phase;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        if (tmp) {
          return true;
        }
      }
       while (inductionVariable < last);
    return false;
  }
  function cacheInterceptors($this) {
    var interceptorsQuantity = $this.c1l_1;
    if (interceptorsQuantity === 0) {
      notSharedInterceptorsList($this, emptyList());
      return emptyList();
    }
    var phases = $this.b1l_1;
    if (interceptorsQuantity === 1) {
      var inductionVariable = 0;
      var last = get_lastIndex_0(phases);
      if (inductionVariable <= last)
        $l$loop_0: do {
          var phaseIndex = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp = phases.f1(phaseIndex);
          var tmp1_elvis_lhs = tmp instanceof PhaseContent ? tmp : null;
          var tmp_0;
          if (tmp1_elvis_lhs == null) {
            continue $l$loop_0;
          } else {
            tmp_0 = tmp1_elvis_lhs;
          }
          var phaseContent = tmp_0;
          if (phaseContent.y11())
            continue $l$loop_0;
          var interceptors = phaseContent.x1k();
          setInterceptorsListFromPhase($this, phaseContent);
          return interceptors;
        }
         while (!(phaseIndex === last));
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var destination = ArrayList_init_$Create$_0();
    var inductionVariable_0 = 0;
    var last_0 = get_lastIndex_0(phases);
    if (inductionVariable_0 <= last_0)
      $l$loop_1: do {
        var phaseIndex_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var tmp_1 = phases.f1(phaseIndex_0);
        var tmp3_elvis_lhs = tmp_1 instanceof PhaseContent ? tmp_1 : null;
        var tmp_2;
        if (tmp3_elvis_lhs == null) {
          continue $l$loop_1;
        } else {
          tmp_2 = tmp3_elvis_lhs;
        }
        var phase = tmp_2;
        phase.w1k(destination);
      }
       while (!(phaseIndex_0 === last_0));
    notSharedInterceptorsList($this, destination);
    return destination;
  }
  function sharedInterceptorsList($this) {
    if (_get_interceptors__h4min7($this) == null) {
      cacheInterceptors($this);
    }
    $this.e1l_1 = true;
    return ensureNotNull(_get_interceptors__h4min7($this));
  }
  function resetInterceptorsList($this) {
    _set_interceptors__wod97b($this, null);
    $this.e1l_1 = false;
    $this.f1l_1 = null;
  }
  function notSharedInterceptorsList($this, list) {
    _set_interceptors__wod97b($this, list);
    $this.e1l_1 = false;
    $this.f1l_1 = null;
  }
  function setInterceptorsListFromPhase($this, phaseContent) {
    _set_interceptors__wod97b($this, phaseContent.x1k());
    $this.e1l_1 = false;
    $this.f1l_1 = phaseContent.q1k_1;
  }
  function tryAddToPhaseFastPath($this, phase, block) {
    var currentInterceptors = _get_interceptors__h4min7($this);
    if ($this.b1l_1.b1() ? true : currentInterceptors == null) {
      return false;
    }
    var tmp;
    if ($this.e1l_1) {
      tmp = true;
    } else {
      tmp = !(!(currentInterceptors == null) ? isInterface(currentInterceptors, MutableList) : false);
    }
    if (tmp) {
      return false;
    }
    if (equals($this.f1l_1, phase)) {
      currentInterceptors.r(block);
      return true;
    }
    if (equals(phase, last($this.b1l_1)) ? true : findPhaseIndex($this, phase) === get_lastIndex_0($this.b1l_1)) {
      ensureNotNull(findPhase($this, phase)).v1k(block);
      currentInterceptors.r(block);
      return true;
    }
    return false;
  }
  function Pipeline(phases) {
    this.z1k_1 = AttributesJsFn(true);
    this.a1l_1 = false;
    this.b1l_1 = mutableListOf(phases.slice());
    this.c1l_1 = 0;
    this.d1l_1 = atomic$ref$1(null);
    this.e1l_1 = false;
    this.f1l_1 = null;
  }
  protoOf(Pipeline).g1l = function () {
    return this.a1l_1;
  };
  protoOf(Pipeline).h1l = function (context, subject, $completion) {
    // Inline function 'kotlin.js.getCoroutineContext' call
    var tmp$ret$0 = $completion.la();
    return createContext(this, context, subject, tmp$ret$0).o1k(subject, $completion);
  };
  protoOf(Pipeline).j1l = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference + ' was not registered for this pipeline');
    }
    var lastRelatedPhaseIndex = index;
    var inductionVariable = index + 1 | 0;
    var last = get_lastIndex_0(this.b1l_1);
    if (inductionVariable <= last)
      $l$loop_0: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = this.b1l_1.f1(i);
        var tmp1_safe_receiver = tmp instanceof PhaseContent ? tmp : null;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.r1k_1;
        var tmp_0;
        if (tmp2_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_0 = tmp2_elvis_lhs;
        }
        var relation = tmp_0;
        var tmp3_safe_receiver = relation instanceof After ? relation : null;
        var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.k1l_1;
        var tmp_1;
        if (tmp4_elvis_lhs == null) {
          continue $l$loop_0;
        } else {
          tmp_1 = tmp4_elvis_lhs;
        }
        var relatedTo = tmp_1;
        lastRelatedPhaseIndex = equals(relatedTo, reference) ? i : lastRelatedPhaseIndex;
      }
       while (!(i === last));
    this.b1l_1.n1(lastRelatedPhaseIndex + 1 | 0, PhaseContent_init_$Create$(phase, new After(reference)));
  };
  protoOf(Pipeline).l1l = function (reference, phase) {
    if (hasPhase(this, phase))
      return Unit_instance;
    var index = findPhaseIndex(this, reference);
    if (index === -1) {
      throw new InvalidPhaseException('Phase ' + reference + ' was not registered for this pipeline');
    }
    this.b1l_1.n1(index, PhaseContent_init_$Create$(phase, new Before(reference)));
  };
  protoOf(Pipeline).m1l = function (phase, block) {
    var tmp0_elvis_lhs = findPhase(this, phase);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw new InvalidPhaseException('Phase ' + phase + ' was not registered for this pipeline');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var phaseContent = tmp;
    if (typeof block !== 'function')
      THROW_CCE();
    if (tryAddToPhaseFastPath(this, phase, block)) {
      this.c1l_1 = this.c1l_1 + 1 | 0;
      return Unit_instance;
    }
    phaseContent.v1k(block);
    this.c1l_1 = this.c1l_1 + 1 | 0;
    resetInterceptorsList(this);
    this.n1l();
  };
  protoOf(Pipeline).n1l = function () {
  };
  function PipelineContext(context) {
    this.i1l_1 = context;
  }
  function pipelineContextFor(context, interceptors, subject, coroutineContext, debugMode) {
    debugMode = debugMode === VOID ? false : debugMode;
    var tmp;
    if (get_DISABLE_SFG() ? true : debugMode) {
      tmp = new DebugPipelineContext(context, interceptors, subject, coroutineContext);
    } else {
      tmp = new SuspendFunctionGun(subject, context, interceptors);
    }
    return tmp;
  }
  function PipelinePhase(name) {
    this.y1k_1 = name;
  }
  protoOf(PipelinePhase).toString = function () {
    return "Phase('" + this.y1k_1 + "')";
  };
  function InvalidPhaseException(message) {
    extendThrowable(this, message);
    captureStack(this, InvalidPhaseException);
  }
  function After(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.k1l_1 = relativeTo;
  }
  function Before(relativeTo) {
    PipelinePhaseRelation.call(this);
    this.o1l_1 = relativeTo;
  }
  function Last() {
    Last_instance = this;
    PipelinePhaseRelation.call(this);
  }
  var Last_instance;
  function Last_getInstance() {
    if (Last_instance == null)
      new Last();
    return Last_instance;
  }
  function PipelinePhaseRelation() {
  }
  function recoverStackTraceBridge(exception, continuation) {
    var tmp;
    try {
      tmp = withCause(recoverStackTrace(exception, continuation), exception.cause);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var _ = $p;
        tmp_0 = exception;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function loop($this, direct) {
    do {
      var currentIndex = $this.v1l_1;
      if (currentIndex === $this.q1l_1.n()) {
        if (!direct) {
          // Inline function 'kotlin.Companion.success' call
          var value = $this.s1l_1;
          var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
          resumeRootWith($this, tmp$ret$0);
          return false;
        }
        return true;
      }
      $this.v1l_1 = currentIndex + 1 | 0;
      var next = $this.q1l_1.f1(currentIndex);
      try {
        var result = next($this, $this.s1l_1, $this.r1l_1);
        if (result === get_COROUTINE_SUSPENDED())
          return false;
      } catch ($p) {
        if ($p instanceof Error) {
          var cause = $p;
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(cause));
          resumeRootWith($this, tmp$ret$1);
          return false;
        } else {
          throw $p;
        }
      }
    }
     while (true);
  }
  function resumeRootWith($this, result) {
    if ($this.u1l_1 < 0) {
      // Inline function 'kotlin.error' call
      var message = 'No more continuations to resume';
      throw IllegalStateException_init_$Create$(toString_0(message));
    }
    var next = ensureNotNull($this.t1l_1[$this.u1l_1]);
    var tmp1 = $this.u1l_1;
    $this.u1l_1 = tmp1 - 1 | 0;
    $this.t1l_1[tmp1] = null;
    if (!_Result___get_isFailure__impl__jpiriv(result)) {
      next.sa(result);
    } else {
      var exception = recoverStackTraceBridge(ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result)), next);
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      next.sa(tmp$ret$0);
    }
  }
  function discardLastRootContinuation($this) {
    if ($this.u1l_1 < 0)
      throw IllegalStateException_init_$Create$('No more continuations to resume');
    var tmp1 = $this.u1l_1;
    $this.u1l_1 = tmp1 - 1 | 0;
    $this.t1l_1[tmp1] = null;
  }
  function addContinuation($this, continuation) {
    $this.u1l_1 = $this.u1l_1 + 1 | 0;
    $this.t1l_1[$this.u1l_1] = continuation;
  }
  function SuspendFunctionGun$continuation$1(this$0) {
    this.x1l_1 = this$0;
    this.w1l_1 = IntCompanionObject_instance.MIN_VALUE;
  }
  protoOf(SuspendFunctionGun$continuation$1).la = function () {
    var tmp0_safe_receiver = this.x1l_1.t1l_1[this.x1l_1.u1l_1];
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.la();
    var tmp;
    if (tmp1_elvis_lhs == null) {
      var message = 'Not started';
      throw IllegalStateException_init_$Create$(toString_0(message));
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  };
  protoOf(SuspendFunctionGun$continuation$1).y1l = function (result) {
    if (_Result___get_isFailure__impl__jpiriv(result)) {
      // Inline function 'kotlin.Companion.failure' call
      var exception = ensureNotNull(Result__exceptionOrNull_impl_p6xea9(result));
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      resumeRootWith(this.x1l_1, tmp$ret$0);
      return Unit_instance;
    }
    loop(this.x1l_1, false);
  };
  protoOf(SuspendFunctionGun$continuation$1).sa = function (result) {
    return this.y1l(result);
  };
  function SuspendFunctionGun(initial, context, blocks) {
    PipelineContext.call(this, context);
    this.q1l_1 = blocks;
    var tmp = this;
    tmp.r1l_1 = new SuspendFunctionGun$continuation$1(this);
    this.s1l_1 = initial;
    var tmp_0 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.q1l_1.n();
    tmp_0.t1l_1 = fillArrayVal(Array(size), null);
    this.u1l_1 = -1;
    this.v1l_1 = 0;
  }
  protoOf(SuspendFunctionGun).rh = function () {
    return this.r1l_1.la();
  };
  protoOf(SuspendFunctionGun).l1k = function () {
    return this.s1l_1;
  };
  protoOf(SuspendFunctionGun).n1k = function ($completion) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'io.ktor.util.pipeline.SuspendFunctionGun.proceed.<anonymous>' call
      if (this.v1l_1 === this.q1l_1.n()) {
        tmp$ret$0 = this.s1l_1;
        break $l$block_0;
      }
      addContinuation(this, intercepted($completion));
      if (loop(this, true)) {
        discardLastRootContinuation(this);
        tmp$ret$0 = this.s1l_1;
        break $l$block_0;
      }
      tmp$ret$0 = get_COROUTINE_SUSPENDED();
    }
    return tmp$ret$0;
  };
  protoOf(SuspendFunctionGun).m1k = function (subject, $completion) {
    this.s1l_1 = subject;
    return this.n1k($completion);
  };
  protoOf(SuspendFunctionGun).o1k = function (initial, $completion) {
    this.v1l_1 = 0;
    if (this.v1l_1 === this.q1l_1.n())
      return initial;
    this.s1l_1 = initial;
    if (this.u1l_1 >= 0)
      throw IllegalStateException_init_$Create$('Already started');
    return this.n1k($completion);
  };
  function TypeInfo(type, reifiedType, kotlinType) {
    kotlinType = kotlinType === VOID ? null : kotlinType;
    this.z1l_1 = type;
    this.a1m_1 = reifiedType;
    this.b1m_1 = kotlinType;
  }
  protoOf(TypeInfo).toString = function () {
    return 'TypeInfo(type=' + this.z1l_1 + ', reifiedType=' + this.a1m_1 + ', kotlinType=' + this.b1m_1 + ')';
  };
  protoOf(TypeInfo).hashCode = function () {
    var result = this.z1l_1.hashCode();
    result = imul(result, 31) + hashCode(this.a1m_1) | 0;
    result = imul(result, 31) + (this.b1m_1 == null ? 0 : hashCode(this.b1m_1)) | 0;
    return result;
  };
  protoOf(TypeInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypeInfo))
      return false;
    var tmp0_other_with_cast = other instanceof TypeInfo ? other : THROW_CCE();
    if (!this.z1l_1.equals(tmp0_other_with_cast.z1l_1))
      return false;
    if (!equals(this.a1m_1, tmp0_other_with_cast.a1m_1))
      return false;
    if (!equals(this.b1m_1, tmp0_other_with_cast.b1m_1))
      return false;
    return true;
  };
  function AttributesJsFn(concurrent) {
    concurrent = concurrent === VOID ? false : concurrent;
    return new AttributesJs();
  }
  function AttributesJs() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.c1m_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(AttributesJs).r1g = function (key) {
    var tmp = this.c1m_1.m2(key);
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(AttributesJs).s1g = function (key) {
    return this.c1m_1.j2(key);
  };
  protoOf(AttributesJs).t1g = function (key, value) {
    // Inline function 'kotlin.collections.set' call
    this.c1m_1.c2(key, value);
  };
  protoOf(AttributesJs).u1g = function (key) {
    this.c1m_1.g2(key);
  };
  protoOf(AttributesJs).v1g = function (key, block) {
    var tmp0_safe_receiver = this.c1m_1.m2(key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return !(tmp0_safe_receiver == null) ? tmp0_safe_receiver : THROW_CCE();
    }
    // Inline function 'kotlin.also' call
    var this_0 = block();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.util.AttributesJs.computeIfAbsent.<anonymous>' call
    // Inline function 'kotlin.collections.set' call
    this.c1m_1.c2(key, this_0);
    return this_0;
  };
  protoOf(AttributesJs).w1g = function () {
    return toList(this.c1m_1.z1());
  };
  function unmodifiable(_this__u8e3s4) {
    return _this__u8e3s4;
  }
  function get_platform(_this__u8e3s4) {
    var tmp = typeof process !== 'undefined' && process.versions != null && process.versions.node != null || (typeof window !== 'undefined' && typeof window.process !== 'undefined' && window.process.versions != null && window.process.versions.node != null);
    var hasNodeApi = (!(tmp == null) ? typeof tmp === 'boolean' : false) ? tmp : THROW_CCE();
    return hasNodeApi ? Platform_Node_getInstance() : Platform_Browser_getInstance();
  }
  function get_isDevelopmentMode(_this__u8e3s4) {
    return false;
  }
  function get_isNewMemoryModel(_this__u8e3s4) {
    return true;
  }
  function GMTDate_0(timestamp) {
    timestamp = timestamp === VOID ? null : timestamp;
    var tmp1_safe_receiver = timestamp == null ? null : timestamp.w5();
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.util.date.GMTDate.<anonymous>' call
      tmp = new Date(tmp1_safe_receiver);
    }
    var tmp2_elvis_lhs = tmp;
    var date = tmp2_elvis_lhs == null ? new Date() : tmp2_elvis_lhs;
    if (isNaN_0(date.getTime()))
      throw new InvalidTimestampException(ensureNotNull(timestamp));
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var dayOfWeek = Companion_instance_1.m1j((date.getUTCDay() + 6 | 0) % 7 | 0);
    var month = Companion_instance_2.m1j(date.getUTCMonth());
    return new GMTDate(date.getUTCSeconds(), date.getUTCMinutes(), date.getUTCHours(), dayOfWeek, date.getUTCDate(), date.getUTCFullYear(), month, date.getUTCFullYear(), numberToLong(date.getTime()));
  }
  function InvalidTimestampException(timestamp) {
    IllegalStateException_init_$Init$('Invalid date timestamp exception: ' + timestamp.toString(), this);
    captureStack(this, InvalidTimestampException);
  }
  function KtorSimpleLogger(name) {
    return new KtorSimpleLogger$1();
  }
  function KtorSimpleLogger$1() {
  }
  protoOf(KtorSimpleLogger$1).d1m = function (message) {
    console.debug('TRACE: ' + message);
  };
  function get_DISABLE_SFG() {
    return DISABLE_SFG;
  }
  var DISABLE_SFG;
  function withCause(_this__u8e3s4, cause) {
    return _this__u8e3s4;
  }
  function instanceOf(_this__u8e3s4, type) {
    return type.a6(_this__u8e3s4);
  }
  function typeInfoImpl(reifiedType, kClass, kType) {
    return new TypeInfo(kClass, reifiedType, kType);
  }
  function JsType() {
  }
  var JsType_instance;
  function JsType_getInstance() {
    return JsType_instance;
  }
  //region block: post-declaration
  protoOf(AttributesJs).q1g = get;
  //endregion
  //region block: init
  Companion_instance_1 = new Companion_0();
  Companion_instance_2 = new Companion_1();
  DISABLE_SFG = false;
  JsType_instance = new JsType();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = toByteArray;
  _.$_$.b = JsType_instance;
  _.$_$.c = PlatformUtils_getInstance;
  _.$_$.d = CopyOnWriteHashMap;
  _.$_$.e = GMTDate_0;
  _.$_$.f = KtorSimpleLogger;
  _.$_$.g = PipelineContext;
  _.$_$.h = PipelinePhase;
  _.$_$.i = Pipeline;
  _.$_$.j = instanceOf;
  _.$_$.k = typeInfoImpl;
  _.$_$.l = AttributeKey;
  _.$_$.m = AttributesJsFn;
  _.$_$.n = SilentSupervisor;
  _.$_$.o = forEach;
  _.$_$.p = get_0;
  _.$_$.q = StringValuesBuilderImpl;
  _.$_$.r = StringValuesImpl;
  _.$_$.s = StringValues;
  _.$_$.t = appendAll;
  _.$_$.u = isLowerCase;
  _.$_$.v = get_platform;
  _.$_$.w = putAll;
  _.$_$.x = toCharArray;
  _.$_$.y = toLowerCasePreservingASCIIRules;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-utils.js.map
