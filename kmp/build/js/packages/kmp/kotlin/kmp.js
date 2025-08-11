(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation.js', './kotlin-kotlin-stdlib.js', './ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js', './ktor-ktor-client-ktor-client-core.js', './ktor-ktor-http.js', './ktor-ktor-utils.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation.js'), require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'), require('./ktor-ktor-client-ktor-client-core.js'), require('./ktor-ktor-http.js'), require('./ktor-ktor-utils.js'));
  else {
    if (typeof this['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation' was not found. Please, check whether 'ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation' is loaded prior to 'kmp'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kmp'.");
    }
    if (typeof this['ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json' was not found. Please, check whether 'ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json' is loaded prior to 'kmp'.");
    }
    if (typeof this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'kmp'.");
    }
    if (typeof this['ktor-ktor-client-ktor-client-core'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'ktor-ktor-client-ktor-client-core' was not found. Please, check whether 'ktor-ktor-client-ktor-client-core' is loaded prior to 'kmp'.");
    }
    if (typeof this['ktor-ktor-http'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'ktor-ktor-http' was not found. Please, check whether 'ktor-ktor-http' is loaded prior to 'kmp'.");
    }
    if (typeof this['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'kmp'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'kmp'.");
    }
    root.kmp = factory(typeof kmp === 'undefined' ? {} : kmp, this['ktor-ktor-client-ktor-client-plugins-ktor-client-content-negotiation'], this['kotlin-kotlin-stdlib'], this['ktor-ktor-shared-ktor-serialization-ktor-serialization-kotlinx-ktor-serialization-kotlinx-json'], this['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'], this['ktor-ktor-client-ktor-client-core'], this['ktor-ktor-http'], this['ktor-ktor-utils']);
  }
}(this, function (_, kotlin_io_ktor_ktor_client_content_negotiation, kotlin_kotlin, kotlin_io_ktor_ktor_serialization_kotlinx_json, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_io_ktor_ktor_client_core, kotlin_io_ktor_ktor_http, kotlin_io_ktor_ktor_utils) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Plugin_getInstance = kotlin_io_ktor_ktor_client_content_negotiation.$_$.a;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var json = kotlin_io_ktor_ktor_serialization_kotlinx_json.$_$.a;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var protoOf = kotlin_kotlin.$_$.r9;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var isInterface = kotlin_kotlin.$_$.h9;
  var HttpRequestBuilder = kotlin_io_ktor_ktor_client_core.$_$.e;
  var url = kotlin_io_ktor_ktor_client_core.$_$.g;
  var Companion_getInstance = kotlin_io_ktor_ktor_http.$_$.f;
  var HttpStatement = kotlin_io_ktor_ktor_client_core.$_$.i;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var JsType_instance = kotlin_io_ktor_ktor_utils.$_$.b;
  var List = kotlin_kotlin.$_$.y4;
  var getKClass = kotlin_kotlin.$_$.e;
  var arrayOf = kotlin_kotlin.$_$.zc;
  var createKType = kotlin_kotlin.$_$.b;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.a;
  var typeInfoImpl = kotlin_io_ktor_ktor_utils.$_$.k;
  var classMeta = kotlin_kotlin.$_$.o8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var VOID = kotlin_kotlin.$_$.f;
  var HttpClient = kotlin_io_ktor_ktor_client_core.$_$.j;
  var GlobalScope_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var promise = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h1;
  var emptyList = kotlin_kotlin.$_$.v5;
  var getStringHashCode = kotlin_kotlin.$_$.w8;
  var hashCode = kotlin_kotlin.$_$.x8;
  var equals = kotlin_kotlin.$_$.r8;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ApiClient$getLearningHubs$slambda, 'ApiClient$getLearningHubs$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ApiClient, 'ApiClient', classMeta, VOID, VOID, ApiClient);
  setMetadataFor(Category, 'Category', classMeta);
  //endregion
  function ApiClient$client$lambda($this$HttpClient) {
    var tmp = Plugin_getInstance();
    $this$HttpClient.y24(tmp, ApiClient$client$lambda$lambda);
    return Unit_instance;
  }
  function ApiClient$client$lambda$lambda($this$install) {
    json($this$install);
    return Unit_instance;
  }
  function ApiClient$getLearningHubs$slambda(this$0, resultContinuation) {
    this.n40_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ApiClient$getLearningHubs$slambda).x40 = function ($this$promise, $completion) {
    var tmp = this.h19($this$promise, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(ApiClient$getLearningHubs$slambda).eb = function (p1, $completion) {
    return this.x40((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ApiClient$getLearningHubs$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            var tmp_0 = this;
            tmp_0.p40_1 = this.n40_1.z40_1;
            var tmp_1 = this;
            tmp_1.q40_1 = this.n40_1.y40_1 + '/asLearningHubs/';
            var tmp_2 = this;
            tmp_2.r40_1 = this.p40_1;
            var tmp_3 = this;
            tmp_3.s40_1 = this.r40_1;
            var tmp_4 = this;
            var this_0 = new HttpRequestBuilder();
            url(this_0, this.q40_1);
            tmp_4.t40_1 = this_0;
            this.t40_1.s23_1 = Companion_getInstance().h1s_1;
            var tmp_5 = this;
            tmp_5.u40_1 = this.s40_1;
            var tmp_6 = this;
            tmp_6.v40_1 = this.t40_1;
            this.ea_1 = 1;
            suspendResult = (new HttpStatement(this.v40_1, this.u40_1)).c2u(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.w40_1 = suspendResult;
            this.ea_1 = 2;
            var tmp_7 = this.w40_1.a27();
            var tmp_8 = JsType_instance;
            var tmp_9 = getKClass(List);
            var tmp_10;
            try {
              tmp_10 = createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(Category), arrayOf([]), false))]), false);
            } catch ($p) {
              var tmp_11;
              if ($p instanceof Error) {
                var cause = $p;
                tmp_11 = null;
              } else {
                throw $p;
              }
              tmp_10 = tmp_11;
            }

            suspendResult = tmp_7.d26(typeInfoImpl(tmp_8, tmp_9, tmp_10), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return (!(suspendResult == null) ? isInterface(suspendResult, List) : false) ? suspendResult : THROW_CCE();
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
  protoOf(ApiClient$getLearningHubs$slambda).h19 = function ($this$promise, completion) {
    var i = new ApiClient$getLearningHubs$slambda(this.n40_1, completion);
    i.o40_1 = $this$promise;
    return i;
  };
  function ApiClient$getLearningHubs$slambda_0(this$0, resultContinuation) {
    var i = new ApiClient$getLearningHubs$slambda(this$0, resultContinuation);
    var l = function ($this$promise, $completion) {
      return i.x40($this$promise, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ApiClient(baseUrl) {
    baseUrl = baseUrl === VOID ? 'http://localhost:8000' : baseUrl;
    this.y40_1 = baseUrl;
    var tmp = this;
    tmp.z40_1 = HttpClient(ApiClient$client$lambda);
  }
  protoOf(ApiClient).getLearningHubs = function () {
    var tmp = GlobalScope_instance;
    return promise(tmp, VOID, VOID, ApiClient$getLearningHubs$slambda_0(this, null));
  };
  function Category(id, name, backgroundLink, children) {
    children = children === VOID ? emptyList() : children;
    this.a41_1 = id;
    this.b41_1 = name;
    this.c41_1 = backgroundLink;
    this.d41_1 = children;
  }
  protoOf(Category).toString = function () {
    return 'Category(id=' + this.a41_1 + ', name=' + this.b41_1 + ', backgroundLink=' + this.c41_1 + ', children=' + this.d41_1 + ')';
  };
  protoOf(Category).hashCode = function () {
    var result = this.a41_1;
    result = imul(result, 31) + getStringHashCode(this.b41_1) | 0;
    result = imul(result, 31) + getStringHashCode(this.c41_1) | 0;
    result = imul(result, 31) + hashCode(this.d41_1) | 0;
    return result;
  };
  protoOf(Category).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Category))
      return false;
    var tmp0_other_with_cast = other instanceof Category ? other : THROW_CCE();
    if (!(this.a41_1 === tmp0_other_with_cast.a41_1))
      return false;
    if (!(this.b41_1 === tmp0_other_with_cast.b41_1))
      return false;
    if (!(this.c41_1 === tmp0_other_with_cast.c41_1))
      return false;
    if (!equals(this.d41_1, tmp0_other_with_cast.d41_1))
      return false;
    return true;
  };
  //region block: exports
  function $jsExportAll$(_) {
    _.ApiClient = ApiClient;
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));

//# sourceMappingURL=kmp.js.map
