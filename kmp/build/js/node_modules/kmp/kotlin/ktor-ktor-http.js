(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './ktor-ktor-io.js', './ktor-ktor-utils.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./ktor-ktor-io.js'), require('./ktor-ktor-utils.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'ktor-ktor-http'.");
    }
    if (typeof this['ktor-ktor-io'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'ktor-ktor-io' was not found. Please, check whether 'ktor-ktor-io' is loaded prior to 'ktor-ktor-http'.");
    }
    if (typeof this['ktor-ktor-utils'] === 'undefined') {
      throw new Error("Error loading module 'ktor-ktor-http'. Its dependency 'ktor-ktor-utils' was not found. Please, check whether 'ktor-ktor-utils' is loaded prior to 'ktor-ktor-http'.");
    }
    root['ktor-ktor-http'] = factory(typeof this['ktor-ktor-http'] === 'undefined' ? {} : this['ktor-ktor-http'], this['kotlin-kotlin-stdlib'], this['ktor-ktor-io'], this['ktor-ktor-utils']);
  }
}(this, function (_, kotlin_kotlin, kotlin_io_ktor_ktor_io, kotlin_io_ktor_ktor_utils) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.f;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.c1;
  var Charsets_getInstance = kotlin_io_ktor_ktor_io.$_$.f;
  var encode = kotlin_io_ktor_ktor_io.$_$.k;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var prepareReadFirstHead = kotlin_io_ktor_ktor_io.$_$.n;
  var prepareReadNextHead = kotlin_io_ktor_ktor_io.$_$.o;
  var completeReadHead = kotlin_io_ktor_ktor_io.$_$.m;
  var charArray = kotlin_kotlin.$_$.k8;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.d2;
  var concatToString = kotlin_kotlin.$_$.ia;
  var charSequenceGet = kotlin_kotlin.$_$.l8;
  var toString = kotlin_kotlin.$_$.w9;
  var Char = kotlin_kotlin.$_$.yb;
  var isSurrogate = kotlin_kotlin.$_$.xa;
  var Char__plus_impl_qi7pgj = kotlin_kotlin.$_$.h2;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.g2;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.b1;
  var charSequenceLength = kotlin_kotlin.$_$.m8;
  var charSequenceSubSequence = kotlin_kotlin.$_$.n8;
  var toString_0 = kotlin_kotlin.$_$.k2;
  var toByte = kotlin_kotlin.$_$.t9;
  var String_0 = kotlin_io_ktor_ktor_io.$_$.s;
  var Exception = kotlin_kotlin.$_$.ec;
  var Exception_init_$Init$ = kotlin_kotlin.$_$.g1;
  var captureStack = kotlin_kotlin.$_$.i8;
  var protoOf = kotlin_kotlin.$_$.r9;
  var classMeta = kotlin_kotlin.$_$.o8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var Char__minus_impl_a2frrh_0 = kotlin_kotlin.$_$.f2;
  var numberToChar = kotlin_kotlin.$_$.n9;
  var Char__rangeTo_impl_tkncvp = kotlin_kotlin.$_$.i2;
  var plus = kotlin_kotlin.$_$.s6;
  var plus_0 = kotlin_kotlin.$_$.t6;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.h5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.j2;
  var toSet = kotlin_kotlin.$_$.k7;
  var setOf = kotlin_kotlin.$_$.z6;
  var plus_1 = kotlin_kotlin.$_$.r6;
  var listOf = kotlin_kotlin.$_$.n6;
  var emptyList = kotlin_kotlin.$_$.v5;
  var objectCreate = kotlin_kotlin.$_$.p9;
  var equals = kotlin_kotlin.$_$.oa;
  var Collection = kotlin_kotlin.$_$.t4;
  var isInterface = kotlin_kotlin.$_$.h9;
  var isBlank = kotlin_kotlin.$_$.ta;
  var last = kotlin_kotlin.$_$.l6;
  var indexOf = kotlin_kotlin.$_$.sa;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var isCharSequence = kotlin_kotlin.$_$.d9;
  var trim = kotlin_kotlin.$_$.wb;
  var contains = kotlin_kotlin.$_$.ka;
  var objectMeta = kotlin_kotlin.$_$.q9;
  var plus_2 = kotlin_kotlin.$_$.u6;
  var equals_0 = kotlin_kotlin.$_$.r8;
  var getStringHashCode = kotlin_kotlin.$_$.w8;
  var hashCode = kotlin_kotlin.$_$.x8;
  var Companion_instance = kotlin_io_ktor_ktor_io.$_$.e;
  var IllegalArgumentException = kotlin_kotlin.$_$.fc;
  var get_name = kotlin_io_ktor_ktor_io.$_$.l;
  var get_lastIndex = kotlin_kotlin.$_$.i6;
  var last_0 = kotlin_kotlin.$_$.bb;
  var first = kotlin_kotlin.$_$.pa;
  var get_lastIndex_0 = kotlin_kotlin.$_$.za;
  var StringValuesBuilderImpl = kotlin_io_ktor_ktor_utils.$_$.q;
  var emptySet = kotlin_kotlin.$_$.x5;
  var get = kotlin_io_ktor_ktor_utils.$_$.p;
  var forEach = kotlin_io_ktor_ktor_utils.$_$.o;
  var StringValues = kotlin_io_ktor_ktor_utils.$_$.s;
  var StringValuesImpl = kotlin_io_ktor_ktor_utils.$_$.r;
  var emptyMap = kotlin_kotlin.$_$.w5;
  var toDoubleOrNull = kotlin_kotlin.$_$.jb;
  var LazyThreadSafetyMode_NONE_getInstance = kotlin_kotlin.$_$.g;
  var lazy = kotlin_kotlin.$_$.hd;
  var to = kotlin_kotlin.$_$.nd;
  var sortedWith = kotlin_kotlin.$_$.b7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.k;
  var compareValues = kotlin_kotlin.$_$.n7;
  var asList = kotlin_kotlin.$_$.g5;
  var Char__compareTo_impl_ypi4mb = kotlin_kotlin.$_$.e2;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.k1;
  var toLong = kotlin_kotlin.$_$.ob;
  var mapCapacity = kotlin_kotlin.$_$.o6;
  var coerceAtLeast = kotlin_kotlin.$_$.y9;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var Comparable = kotlin_kotlin.$_$.zb;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var isWhitespace = kotlin_kotlin.$_$.ya;
  var startsWith = kotlin_kotlin.$_$.gb;
  var charArrayOf = kotlin_kotlin.$_$.j8;
  var split = kotlin_kotlin.$_$.eb;
  var toMutableList = kotlin_kotlin.$_$.i7;
  var first_0 = kotlin_kotlin.$_$.b6;
  var joinToString = kotlin_kotlin.$_$.f6;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.l1;
  var toCharArray = kotlin_io_ktor_ktor_utils.$_$.x;
  var indexOfAny = kotlin_kotlin.$_$.qa;
  var dropLast = kotlin_kotlin.$_$.u5;
  var IllegalStateException = kotlin_kotlin.$_$.gc;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.q1;
  var indexOf_0 = kotlin_kotlin.$_$.ra;
  var toInt = kotlin_kotlin.$_$.mb;
  var listOf_0 = kotlin_kotlin.$_$.m6;
  var toLowerCasePreservingASCIIRules = kotlin_io_ktor_ktor_utils.$_$.y;
  var isLowerCase = kotlin_io_ktor_ktor_utils.$_$.u;
  var appendAll = kotlin_io_ktor_ktor_utils.$_$.t;
  var startsWith_0 = kotlin_kotlin.$_$.fb;
  var addAll = kotlin_kotlin.$_$.f5;
  var joinTo = kotlin_kotlin.$_$.g6;
  var toString_1 = kotlin_kotlin.$_$.md;
  var lazy_0 = kotlin_kotlin.$_$.id;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var KProperty1 = kotlin_kotlin.$_$.ga;
  var getPropertyCallableRef = kotlin_kotlin.$_$.v8;
  var toLong_0 = kotlin_kotlin.$_$.u9;
  var encodeToByteArray = kotlin_kotlin.$_$.ma;
  var encodeToByteArray_0 = kotlin_io_ktor_ktor_io.$_$.j;
  var take = kotlin_kotlin.$_$.hb;
  var PlatformUtils_getInstance = kotlin_io_ktor_ktor_utils.$_$.c;
  var get_platform = kotlin_io_ktor_ktor_utils.$_$.v;
  //endregion
  //region block: pre-declaration
  setMetadataFor(URLDecodeException, 'URLDecodeException', classMeta, Exception);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(Application, 'Application', objectMeta);
  setMetadataFor(Text, 'Text', objectMeta);
  setMetadataFor(HeaderValueWithParameters, 'HeaderValueWithParameters', classMeta);
  setMetadataFor(ContentType, 'ContentType', classMeta, HeaderValueWithParameters);
  setMetadataFor(BadContentTypeFormatException, 'BadContentTypeFormatException', classMeta, Exception);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(HeadersBuilder, 'HeadersBuilder', classMeta, StringValuesBuilderImpl, VOID, HeadersBuilder);
  setMetadataFor(EmptyHeaders, 'EmptyHeaders', objectMeta, VOID, [StringValues]);
  setMetadataFor(HeadersImpl, 'HeadersImpl', classMeta, StringValuesImpl, [StringValues, StringValuesImpl], HeadersImpl);
  setMetadataFor(HeaderValueParam, 'HeaderValueParam', classMeta);
  setMetadataFor(HeaderValue, 'HeaderValue', classMeta);
  setMetadataFor(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', classMeta);
  setMetadataFor(HttpHeaders, 'HttpHeaders', objectMeta);
  setMetadataFor(IllegalHeaderNameException, 'IllegalHeaderNameException', classMeta, IllegalArgumentException);
  setMetadataFor(IllegalHeaderValueException, 'IllegalHeaderValueException', classMeta, IllegalArgumentException);
  setMetadataFor(UnsafeHeaderException, 'UnsafeHeaderException', classMeta, IllegalArgumentException);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(HttpMethod, 'HttpMethod', classMeta);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(HttpProtocolVersion, 'HttpProtocolVersion', classMeta);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(HttpStatusCode, 'HttpStatusCode', classMeta, VOID, [Comparable]);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(Parameters, 'Parameters', interfaceMeta, VOID, [StringValues]);
  setMetadataFor(EmptyParameters, 'EmptyParameters', objectMeta, VOID, [Parameters]);
  setMetadataFor(ParametersBuilderImpl, 'ParametersBuilderImpl', classMeta, StringValuesBuilderImpl, VOID, ParametersBuilderImpl);
  setMetadataFor(ParametersImpl, 'ParametersImpl', classMeta, StringValuesImpl, [Parameters, StringValuesImpl], ParametersImpl);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  setMetadataFor(URLBuilder, 'URLBuilder', classMeta, VOID, VOID, URLBuilder);
  setMetadataFor(URLParserException, 'URLParserException', classMeta, IllegalStateException);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(URLProtocol, 'URLProtocol', classMeta);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(Url_0, 'Url', classMeta);
  setMetadataFor(UrlDecodedParametersBuilder, 'UrlDecodedParametersBuilder', classMeta);
  setMetadataFor(OutgoingContent, 'OutgoingContent', classMeta);
  setMetadataFor(ByteArrayContent_0, 'ByteArrayContent', classMeta, OutgoingContent);
  setMetadataFor(ByteArrayContent, 'ByteArrayContent', classMeta, ByteArrayContent_0);
  setMetadataFor(NoContent, 'NoContent', classMeta, OutgoingContent);
  setMetadataFor(ReadChannelContent, 'ReadChannelContent', classMeta, OutgoingContent);
  setMetadataFor(WriteChannelContent, 'WriteChannelContent', classMeta, OutgoingContent, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ProtocolUpgrade, 'ProtocolUpgrade', classMeta, OutgoingContent, VOID, VOID, VOID, VOID, [4]);
  setMetadataFor(NullBody, 'NullBody', objectMeta);
  setMetadataFor(TextContent, 'TextContent', classMeta, ByteArrayContent_0);
  //endregion
  function get_URL_ALPHABET() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_ALPHABET;
  }
  var URL_ALPHABET;
  function get_URL_ALPHABET_CHARS() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_ALPHABET_CHARS;
  }
  var URL_ALPHABET_CHARS;
  function get_HEX_ALPHABET() {
    _init_properties_Codecs_kt__fudxxf();
    return HEX_ALPHABET;
  }
  var HEX_ALPHABET;
  function get_URL_PROTOCOL_PART() {
    _init_properties_Codecs_kt__fudxxf();
    return URL_PROTOCOL_PART;
  }
  var URL_PROTOCOL_PART;
  function get_VALID_PATH_PART() {
    _init_properties_Codecs_kt__fudxxf();
    return VALID_PATH_PART;
  }
  var VALID_PATH_PART;
  var ATTRIBUTE_CHARACTERS;
  function get_SPECIAL_SYMBOLS() {
    _init_properties_Codecs_kt__fudxxf();
    return SPECIAL_SYMBOLS;
  }
  var SPECIAL_SYMBOLS;
  function encodeURLParameter(_this__u8e3s4, spaceToPlus) {
    spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.encodeURLParameter.<anonymous>' call
    var content = encode(Charsets_getInstance().w1c_1.a1d(), _this__u8e3s4);
    forEach_0(content, encodeURLParameter$lambda(this_0, spaceToPlus));
    return this_0.toString();
  }
  function decodeURLPart(_this__u8e3s4, start, end, charset) {
    start = start === VOID ? 0 : start;
    end = end === VOID ? _this__u8e3s4.length : end;
    charset = charset === VOID ? Charsets_getInstance().w1c_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    return decodeScan(_this__u8e3s4, start, end, false, charset);
  }
  function encodeURLQueryComponent(_this__u8e3s4, encodeFull, spaceToPlus, charset) {
    encodeFull = encodeFull === VOID ? false : encodeFull;
    spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
    charset = charset === VOID ? Charsets_getInstance().w1c_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.encodeURLQueryComponent.<anonymous>' call
    var content = encode(charset.a1d(), _this__u8e3s4);
    forEach_0(content, encodeURLQueryComponent$lambda(spaceToPlus, this_0, encodeFull));
    return this_0.toString();
  }
  function decodeURLQueryComponent(_this__u8e3s4, start, end, plusIsSpace, charset) {
    start = start === VOID ? 0 : start;
    end = end === VOID ? _this__u8e3s4.length : end;
    plusIsSpace = plusIsSpace === VOID ? false : plusIsSpace;
    charset = charset === VOID ? Charsets_getInstance().w1c_1 : charset;
    _init_properties_Codecs_kt__fudxxf();
    return decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset);
  }
  function encodeURLPathPart(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    return encodeURLPath(_this__u8e3s4, true);
  }
  function forEach_0(_this__u8e3s4, block) {
    _init_properties_Codecs_kt__fudxxf();
    $l$block: {
      // Inline function 'io.ktor.utils.io.core.takeWhile' call
      var release = true;
      var tmp0_elvis_lhs = prepareReadFirstHead(_this__u8e3s4, 1);
      var tmp;
      if (tmp0_elvis_lhs == null) {
        break $l$block;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var current = tmp;
      try {
        $l$loop_1: do {
          // Inline function 'io.ktor.http.forEach.<anonymous>' call
          var buffer = current;
          $l$loop: while (true) {
            // Inline function 'io.ktor.utils.io.core.canRead' call
            if (!(buffer.i14_1 > buffer.h14_1)) {
              break $l$loop;
            }
            block(buffer.a1a());
          }
          if (!true) {
            break $l$loop_1;
          }
          release = false;
          var tmp1_elvis_lhs = prepareReadNextHead(_this__u8e3s4, current);
          var tmp_0;
          if (tmp1_elvis_lhs == null) {
            break $l$loop_1;
          } else {
            tmp_0 = tmp1_elvis_lhs;
          }
          var next = tmp_0;
          current = next;
          release = true;
        }
         while (true);
      }finally {
        if (release) {
          completeReadHead(_this__u8e3s4, current);
        }
      }
    }
  }
  function percentEncode(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    var code = _this__u8e3s4 & 255;
    var array = charArray(3);
    array[0] = _Char___init__impl__6a9atx(37);
    array[1] = hexDigitToChar(code >> 4);
    array[2] = hexDigitToChar(code & 15);
    return concatToString(array);
  }
  function decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset) {
    _init_properties_Codecs_kt__fudxxf();
    var inductionVariable = start;
    if (inductionVariable < end)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ch = charSequenceGet(_this__u8e3s4, index);
        if (ch === _Char___init__impl__6a9atx(37) ? true : plusIsSpace ? ch === _Char___init__impl__6a9atx(43) : false) {
          return decodeImpl(_this__u8e3s4, start, end, index, plusIsSpace, charset);
        }
      }
       while (inductionVariable < end);
    var tmp;
    if (start === 0 ? end === _this__u8e3s4.length : false) {
      tmp = toString(_this__u8e3s4);
    } else {
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = _this__u8e3s4.substring(start, end);
    }
    return tmp;
  }
  function encodeURLPath(_this__u8e3s4, encodeSlash) {
    _init_properties_Codecs_kt__fudxxf();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.encodeURLPath.<anonymous>' call
    var charset = Charsets_getInstance().w1c_1;
    var index = 0;
    $l$loop_0: while (index < _this__u8e3s4.length) {
      var current = charSequenceGet(_this__u8e3s4, index);
      if (((!encodeSlash ? current === _Char___init__impl__6a9atx(47) : false) ? true : get_URL_ALPHABET_CHARS().z(new Char(current))) ? true : get_VALID_PATH_PART().z(new Char(current))) {
        this_0.j5(current);
        index = index + 1 | 0;
        continue $l$loop_0;
      }
      if (((current === _Char___init__impl__6a9atx(37) ? (index + 2 | 0) < _this__u8e3s4.length : false) ? get_HEX_ALPHABET().z(new Char(charSequenceGet(_this__u8e3s4, index + 1 | 0))) : false) ? get_HEX_ALPHABET().z(new Char(charSequenceGet(_this__u8e3s4, index + 2 | 0))) : false) {
        this_0.j5(current);
        this_0.j5(charSequenceGet(_this__u8e3s4, index + 1 | 0));
        this_0.j5(charSequenceGet(_this__u8e3s4, index + 2 | 0));
        index = index + 3 | 0;
        continue $l$loop_0;
      }
      var symbolSize = isSurrogate(current) ? 2 : 1;
      var tmp = encode(charset.a1d(), _this__u8e3s4, index, index + symbolSize | 0);
      forEach_0(tmp, encodeURLPath$lambda(this_0));
      index = index + symbolSize | 0;
    }
    return this_0.toString();
  }
  function hexDigitToChar(digit) {
    _init_properties_Codecs_kt__fudxxf();
    return (0 <= digit ? digit <= 9 : false) ? Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(48), digit) : Char__minus_impl_a2frrh(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), digit), 10);
  }
  function decodeImpl(_this__u8e3s4, start, end, prefixEnd, plusIsSpace, charset) {
    _init_properties_Codecs_kt__fudxxf();
    var length = end - start | 0;
    var sbSize = length > 255 ? length / 3 | 0 : length;
    var sb = StringBuilder_init_$Create$_0(sbSize);
    if (prefixEnd > start) {
      sb.l7(_this__u8e3s4, start, prefixEnd);
    }
    var index = prefixEnd;
    var bytes = null;
    while (index < end) {
      var c = charSequenceGet(_this__u8e3s4, index);
      if (plusIsSpace ? c === _Char___init__impl__6a9atx(43) : false) {
        sb.j5(_Char___init__impl__6a9atx(32));
        index = index + 1 | 0;
      } else if (c === _Char___init__impl__6a9atx(37)) {
        if (bytes == null) {
          bytes = new Int8Array((end - index | 0) / 3 | 0);
        }
        var count = 0;
        while (index < end ? charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(37) : false) {
          if ((index + 2 | 0) >= end) {
            // Inline function 'kotlin.text.substring' call
            var startIndex = index;
            var endIndex = charSequenceLength(_this__u8e3s4);
            var tmp$ret$0 = toString(charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex));
            throw new URLDecodeException('Incomplete trailing HEX escape: ' + tmp$ret$0 + ', in ' + _this__u8e3s4 + ' at ' + index);
          }
          var digit1 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 1 | 0));
          var digit2 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 2 | 0));
          if (digit1 === -1 ? true : digit2 === -1) {
            throw new URLDecodeException('Wrong HEX escape: %' + toString_0(charSequenceGet(_this__u8e3s4, index + 1 | 0)) + toString_0(charSequenceGet(_this__u8e3s4, index + 2 | 0)) + ', in ' + _this__u8e3s4 + ', at ' + index);
          }
          var tmp = bytes;
          var tmp1 = count;
          count = tmp1 + 1 | 0;
          tmp[tmp1] = toByte(imul(digit1, 16) + digit2 | 0);
          index = index + 3 | 0;
        }
        sb.i5(String_0(bytes, 0, count, charset));
      } else {
        sb.j5(c);
        index = index + 1 | 0;
      }
    }
    return sb.toString();
  }
  function URLDecodeException(message) {
    Exception_init_$Init$(message, this);
    captureStack(this, URLDecodeException);
  }
  function charToHexDigit(c2) {
    _init_properties_Codecs_kt__fudxxf();
    return (_Char___init__impl__6a9atx(48) <= c2 ? c2 <= _Char___init__impl__6a9atx(57) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(48)) : (_Char___init__impl__6a9atx(65) <= c2 ? c2 <= _Char___init__impl__6a9atx(70) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(65)) + 10 | 0 : (_Char___init__impl__6a9atx(97) <= c2 ? c2 <= _Char___init__impl__6a9atx(102) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(97)) + 10 | 0 : -1;
  }
  function encodeURLParameterValue(_this__u8e3s4) {
    _init_properties_Codecs_kt__fudxxf();
    return encodeURLParameter(_this__u8e3s4, true);
  }
  function encodeURLParameter$lambda($$this$buildString, $spaceToPlus) {
    return function (it) {
      var tmp;
      if (get_URL_ALPHABET().z(it) ? true : get_SPECIAL_SYMBOLS().z(it)) {
        $$this$buildString.j5(numberToChar(it));
        tmp = Unit_instance;
      } else if ($spaceToPlus ? it === 32 : false) {
        $$this$buildString.j5(_Char___init__impl__6a9atx(43));
        tmp = Unit_instance;
      } else {
        $$this$buildString.i5(percentEncode(it));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function encodeURLQueryComponent$lambda($spaceToPlus, $$this$buildString, $encodeFull) {
    return function (it) {
      var tmp;
      if (it === 32) {
        var tmp_0;
        if ($spaceToPlus) {
          $$this$buildString.j5(_Char___init__impl__6a9atx(43));
          tmp_0 = Unit_instance;
        } else {
          $$this$buildString.i5('%20');
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else if (get_URL_ALPHABET().z(it) ? true : !$encodeFull ? get_URL_PROTOCOL_PART().z(it) : false) {
        $$this$buildString.j5(numberToChar(it));
        tmp = Unit_instance;
      } else {
        $$this$buildString.i5(percentEncode(it));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function encodeURLPath$lambda($$this$buildString) {
    return function (it) {
      $$this$buildString.i5(percentEncode(it));
      return Unit_instance;
    };
  }
  var properties_initialized_Codecs_kt_hkj9s1;
  function _init_properties_Codecs_kt__fudxxf() {
    if (!properties_initialized_Codecs_kt_hkj9s1) {
      properties_initialized_Codecs_kt_hkj9s1 = true;
      // Inline function 'kotlin.collections.map' call
      var this_0 = plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57)));
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
      var tmp0_iterator = this_0.u();
      while (tmp0_iterator.v()) {
        var item = tmp0_iterator.w().p8_1;
        // Inline function 'io.ktor.http.URL_ALPHABET.<anonymous>' call
        // Inline function 'kotlin.code' call
        var tmp$ret$0 = Char__toInt_impl_vasixd(item);
        var tmp$ret$1 = toByte(tmp$ret$0);
        destination.r(tmp$ret$1);
      }
      URL_ALPHABET = toSet(destination);
      URL_ALPHABET_CHARS = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
      HEX_ALPHABET = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(102)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(70))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
      // Inline function 'kotlin.collections.map' call
      var this_1 = setOf([new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(47)), new Char(_Char___init__impl__6a9atx(63)), new Char(_Char___init__impl__6a9atx(35)), new Char(_Char___init__impl__6a9atx(91)), new Char(_Char___init__impl__6a9atx(93)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(39)), new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(42)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126)), new Char(_Char___init__impl__6a9atx(43))]);
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(this_1, 10));
      var tmp0_iterator_0 = this_1.u();
      while (tmp0_iterator_0.v()) {
        var item_0 = tmp0_iterator_0.w().p8_1;
        // Inline function 'io.ktor.http.URL_PROTOCOL_PART.<anonymous>' call
        // Inline function 'kotlin.code' call
        var tmp$ret$0_0 = Char__toInt_impl_vasixd(item_0);
        var tmp$ret$1_0 = toByte(tmp$ret$0_0);
        destination_0.r(tmp$ret$1_0);
      }
      URL_PROTOCOL_PART = destination_0;
      VALID_PATH_PART = setOf([new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(39)), new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(42)), new Char(_Char___init__impl__6a9atx(43)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126))]);
      ATTRIBUTE_CHARACTERS = plus_1(get_URL_ALPHABET_CHARS(), setOf([new Char(_Char___init__impl__6a9atx(33)), new Char(_Char___init__impl__6a9atx(35)), new Char(_Char___init__impl__6a9atx(36)), new Char(_Char___init__impl__6a9atx(38)), new Char(_Char___init__impl__6a9atx(43)), new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(94)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(96)), new Char(_Char___init__impl__6a9atx(124)), new Char(_Char___init__impl__6a9atx(126))]));
      // Inline function 'kotlin.collections.map' call
      var this_2 = listOf([new Char(_Char___init__impl__6a9atx(45)), new Char(_Char___init__impl__6a9atx(46)), new Char(_Char___init__impl__6a9atx(95)), new Char(_Char___init__impl__6a9atx(126))]);
      // Inline function 'kotlin.collections.mapTo' call
      var destination_1 = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
      var tmp0_iterator_1 = this_2.u();
      while (tmp0_iterator_1.v()) {
        var item_1 = tmp0_iterator_1.w().p8_1;
        // Inline function 'io.ktor.http.SPECIAL_SYMBOLS.<anonymous>' call
        // Inline function 'kotlin.code' call
        var tmp$ret$0_1 = Char__toInt_impl_vasixd(item_1);
        var tmp$ret$1_1 = toByte(tmp$ret$0_1);
        destination_1.r(tmp$ret$1_1);
      }
      SPECIAL_SYMBOLS = destination_1;
    }
  }
  function ContentType_init_$Init$(contentType, contentSubtype, parameters, $this) {
    parameters = parameters === VOID ? emptyList() : parameters;
    ContentType.call($this, contentType, contentSubtype, contentType + '/' + contentSubtype, parameters);
    return $this;
  }
  function ContentType_init_$Create$(contentType, contentSubtype, parameters) {
    return ContentType_init_$Init$(contentType, contentSubtype, parameters, objectCreate(protoOf(ContentType)));
  }
  function hasParameter($this, name, value) {
    var tmp;
    switch ($this.f1m_1.n()) {
      case 0:
        tmp = false;
        break;
      case 1:
        // Inline function 'kotlin.let' call

        // Inline function 'kotlin.contracts.contract' call

        // Inline function 'io.ktor.http.ContentType.hasParameter.<anonymous>' call

        var it = $this.f1m_1.f1(0);
        tmp = equals(it.g1m_1, name, true) ? equals(it.h1m_1, value, true) : false;
        break;
      default:
        var tmp$ret$2;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var this_0 = $this.f1m_1;
          var tmp_0;
          if (isInterface(this_0, Collection)) {
            tmp_0 = this_0.b1();
          } else {
            tmp_0 = false;
          }
          if (tmp_0) {
            tmp$ret$2 = false;
            break $l$block_0;
          }
          var tmp0_iterator = this_0.u();
          while (tmp0_iterator.v()) {
            var element = tmp0_iterator.w();
            // Inline function 'io.ktor.http.ContentType.hasParameter.<anonymous>' call
            if (equals(element.g1m_1, name, true) ? equals(element.h1m_1, value, true) : false) {
              tmp$ret$2 = true;
              break $l$block_0;
            }
          }
          tmp$ret$2 = false;
        }

        tmp = tmp$ret$2;
        break;
    }
    return tmp;
  }
  function Companion() {
    Companion_instance_0 = this;
    this.j1m_1 = ContentType_init_$Create$('*', '*');
  }
  protoOf(Companion).k1m = function (value) {
    if (isBlank(value))
      return this.j1m_1;
    // Inline function 'io.ktor.http.Companion.parse' call
    var headerValue = last(parseHeaderValue(value));
    // Inline function 'io.ktor.http.Companion.parse.<anonymous>' call
    var parts = headerValue.l1m_1;
    var parameters = headerValue.m1m_1;
    var slash = indexOf(parts, _Char___init__impl__6a9atx(47));
    if (slash === -1) {
      // Inline function 'kotlin.text.trim' call
      if (toString(trim(isCharSequence(parts) ? parts : THROW_CCE())) === '*')
        return Companion_getInstance().j1m_1;
      throw new BadContentTypeFormatException(value);
    }
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var this_0 = parts.substring(0, slash);
    var type = toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(type) === 0) {
      throw new BadContentTypeFormatException(value);
    }
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.substring' call
    var startIndex = slash + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    var this_1 = parts.substring(startIndex);
    var subtype = toString(trim(isCharSequence(this_1) ? this_1 : THROW_CCE()));
    if (contains(type, _Char___init__impl__6a9atx(32)) ? true : contains(subtype, _Char___init__impl__6a9atx(32))) {
      throw new BadContentTypeFormatException(value);
    }
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(subtype) === 0) {
      tmp = true;
    } else {
      tmp = contains(subtype, _Char___init__impl__6a9atx(47));
    }
    if (tmp) {
      throw new BadContentTypeFormatException(value);
    }
    return ContentType_init_$Create$(type, subtype, parameters);
  };
  var Companion_instance_0;
  function Companion_getInstance() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function Application() {
    Application_instance = this;
    this.o1m_1 = ContentType_init_$Create$('application', '*');
    this.p1m_1 = ContentType_init_$Create$('application', 'atom+xml');
    this.q1m_1 = ContentType_init_$Create$('application', 'cbor');
    this.r1m_1 = ContentType_init_$Create$('application', 'json');
    this.s1m_1 = ContentType_init_$Create$('application', 'hal+json');
    this.t1m_1 = ContentType_init_$Create$('application', 'javascript');
    this.u1m_1 = ContentType_init_$Create$('application', 'octet-stream');
    this.v1m_1 = ContentType_init_$Create$('application', 'rss+xml');
    this.w1m_1 = ContentType_init_$Create$('application', 'xml');
    this.x1m_1 = ContentType_init_$Create$('application', 'xml-dtd');
    this.y1m_1 = ContentType_init_$Create$('application', 'zip');
    this.z1m_1 = ContentType_init_$Create$('application', 'gzip');
    this.a1n_1 = ContentType_init_$Create$('application', 'x-www-form-urlencoded');
    this.b1n_1 = ContentType_init_$Create$('application', 'pdf');
    this.c1n_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.d1n_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.e1n_1 = ContentType_init_$Create$('application', 'vnd.openxmlformats-officedocument.presentationml.presentation');
    this.f1n_1 = ContentType_init_$Create$('application', 'protobuf');
    this.g1n_1 = ContentType_init_$Create$('application', 'wasm');
    this.h1n_1 = ContentType_init_$Create$('application', 'problem+json');
    this.i1n_1 = ContentType_init_$Create$('application', 'problem+xml');
  }
  var Application_instance;
  function Application_getInstance() {
    if (Application_instance == null)
      new Application();
    return Application_instance;
  }
  function Text() {
    Text_instance = this;
    this.j1n_1 = ContentType_init_$Create$('text', '*');
    this.k1n_1 = ContentType_init_$Create$('text', 'plain');
    this.l1n_1 = ContentType_init_$Create$('text', 'css');
    this.m1n_1 = ContentType_init_$Create$('text', 'csv');
    this.n1n_1 = ContentType_init_$Create$('text', 'html');
    this.o1n_1 = ContentType_init_$Create$('text', 'javascript');
    this.p1n_1 = ContentType_init_$Create$('text', 'vcard');
    this.q1n_1 = ContentType_init_$Create$('text', 'xml');
    this.r1n_1 = ContentType_init_$Create$('text', 'event-stream');
  }
  var Text_instance;
  function Text_getInstance() {
    if (Text_instance == null)
      new Text();
    return Text_instance;
  }
  function ContentType(contentType, contentSubtype, existingContent, parameters) {
    Companion_getInstance();
    parameters = parameters === VOID ? emptyList() : parameters;
    HeaderValueWithParameters.call(this, existingContent, parameters);
    this.u1n_1 = contentType;
    this.v1n_1 = contentSubtype;
  }
  protoOf(ContentType).w1n = function (name, value) {
    if (hasParameter(this, name, value))
      return this;
    return new ContentType(this.u1n_1, this.v1n_1, this.e1m_1, plus_2(this.f1m_1, HeaderValueParam_init_$Create$(name, value)));
  };
  protoOf(ContentType).x1n = function () {
    return this.f1m_1.b1() ? this : ContentType_init_$Create$(this.u1n_1, this.v1n_1);
  };
  protoOf(ContentType).y1n = function (pattern) {
    if (!(pattern.u1n_1 === '*') ? !equals(pattern.u1n_1, this.u1n_1, true) : false) {
      return false;
    }
    if (!(pattern.v1n_1 === '*') ? !equals(pattern.v1n_1, this.v1n_1, true) : false) {
      return false;
    }
    var tmp0_iterator = pattern.f1m_1.u();
    while (tmp0_iterator.v()) {
      var tmp1_loop_parameter = tmp0_iterator.w();
      var patternName = tmp1_loop_parameter.oc();
      var patternValue = tmp1_loop_parameter.pc();
      var tmp;
      if (patternName === '*') {
        var tmp_0;
        if (patternValue === '*') {
          tmp_0 = true;
        } else {
          var tmp$ret$0;
          $l$block_0: {
            // Inline function 'kotlin.collections.any' call
            var this_0 = this.f1m_1;
            var tmp_1;
            if (isInterface(this_0, Collection)) {
              tmp_1 = this_0.b1();
            } else {
              tmp_1 = false;
            }
            if (tmp_1) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
            var tmp0_iterator_0 = this_0.u();
            while (tmp0_iterator_0.v()) {
              var element = tmp0_iterator_0.w();
              // Inline function 'io.ktor.http.ContentType.match.<anonymous>' call
              if (equals(element.h1m_1, patternValue, true)) {
                tmp$ret$0 = true;
                break $l$block_0;
              }
            }
            tmp$ret$0 = false;
          }
          tmp_0 = tmp$ret$0;
        }
        tmp = tmp_0;
      } else {
        var value = this.z1n(patternName);
        tmp = patternValue === '*' ? !(value == null) : equals(value, patternValue, true);
      }
      var matches = tmp;
      if (!matches) {
        return false;
      }
    }
    return true;
  };
  protoOf(ContentType).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (other instanceof ContentType) {
      tmp_1 = equals(this.u1n_1, other.u1n_1, true);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = equals(this.v1n_1, other.v1n_1, true);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals_0(this.f1m_1, other.f1m_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ContentType).hashCode = function () {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = this.u1n_1.toLowerCase();
    var result = getStringHashCode(tmp$ret$1);
    var tmp = result;
    var tmp_0 = imul(31, result);
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = this.v1n_1.toLowerCase();
    result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
    result = result + imul(31, hashCode(this.f1m_1)) | 0;
    return result;
  };
  function BadContentTypeFormatException(value) {
    Exception_init_$Init$('Bad Content-Type format: ' + value, this);
    captureStack(this, BadContentTypeFormatException);
  }
  function charset(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.z1n('charset');
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.http.charset.<anonymous>' call
      var tmp_0;
      try {
        tmp_0 = Companion_instance.y1f(tmp0_safe_receiver);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof IllegalArgumentException) {
          var exception = $p;
          tmp_1 = null;
        } else {
          throw $p;
        }
        tmp_0 = tmp_1;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function withCharset(_this__u8e3s4, charset) {
    return _this__u8e3s4.w1n('charset', get_name(charset));
  }
  function withCharsetIfNeeded(_this__u8e3s4, charset) {
    var tmp;
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    if (!(_this__u8e3s4.u1n_1.toLowerCase() === 'text')) {
      tmp = _this__u8e3s4;
    } else {
      tmp = _this__u8e3s4.w1n('charset', get_name(charset));
    }
    return tmp;
  }
  function get_HeaderFieldValueSeparators() {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    return HeaderFieldValueSeparators;
  }
  var HeaderFieldValueSeparators;
  function Companion_0() {
  }
  var Companion_instance_1;
  function Companion_getInstance_0() {
    return Companion_instance_1;
  }
  function HeaderValueWithParameters(content, parameters) {
    parameters = parameters === VOID ? emptyList() : parameters;
    this.e1m_1 = content;
    this.f1m_1 = parameters;
  }
  protoOf(HeaderValueWithParameters).z1n = function (name) {
    var inductionVariable = 0;
    var last = get_lastIndex(this.f1m_1);
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var parameter = this.f1m_1.f1(index);
        if (equals(parameter.g1m_1, name, true)) {
          return parameter.h1m_1;
        }
      }
       while (!(index === last));
    return null;
  };
  protoOf(HeaderValueWithParameters).toString = function () {
    var tmp;
    if (this.f1m_1.b1()) {
      tmp = this.e1m_1;
    } else {
      var tmp_0 = this.e1m_1.length;
      // Inline function 'kotlin.collections.sumOf' call
      var sum = 0;
      var tmp0_iterator = this.f1m_1.u();
      while (tmp0_iterator.v()) {
        var element = tmp0_iterator.w();
        var tmp_1 = sum;
        // Inline function 'io.ktor.http.HeaderValueWithParameters.toString.<anonymous>' call
        sum = tmp_1 + ((element.g1m_1.length + element.h1m_1.length | 0) + 3 | 0) | 0;
      }
      var size = tmp_0 + sum | 0;
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$_0(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.http.HeaderValueWithParameters.toString.<anonymous>' call
      this_0.i5(this.e1m_1);
      var inductionVariable = 0;
      var last = get_lastIndex(this.f1m_1);
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var element_0 = this.f1m_1.f1(index);
          this_0.i5('; ');
          this_0.i5(element_0.g1m_1);
          this_0.i5('=');
          // Inline function 'io.ktor.http.escapeIfNeededTo' call
          var this_1 = element_0.h1m_1;
          if (needQuotes$accessor$vynnj(this_1)) {
            this_0.i5(quote(this_1));
          } else {
            this_0.i5(this_1);
          }
        }
         while (!(index === last));
      tmp = this_0.toString();
    }
    return tmp;
  };
  function needQuotes(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(_this__u8e3s4) === 0)
      return true;
    if (isQuoted(_this__u8e3s4))
      return false;
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (get_HeaderFieldValueSeparators().z(new Char(charSequenceGet(_this__u8e3s4, index))))
          return true;
      }
       while (inductionVariable < last);
    return false;
  }
  function quote(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.quote.<anonymous>' call
    quoteTo(_this__u8e3s4, this_0);
    return this_0.toString();
  }
  function isQuoted(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    if (_this__u8e3s4.length < 2) {
      return false;
    }
    if (!(first(_this__u8e3s4) === _Char___init__impl__6a9atx(34)) ? true : !(last_0(_this__u8e3s4) === _Char___init__impl__6a9atx(34))) {
      return false;
    }
    var startIndex = 1;
    $l$loop: do {
      var index = indexOf(_this__u8e3s4, _Char___init__impl__6a9atx(34), startIndex);
      if (index === get_lastIndex_0(_this__u8e3s4)) {
        break $l$loop;
      }
      var slashesCount = 0;
      var slashIndex = index - 1 | 0;
      while (charSequenceGet(_this__u8e3s4, slashIndex) === _Char___init__impl__6a9atx(92)) {
        slashesCount = slashesCount + 1 | 0;
        slashIndex = slashIndex - 1 | 0;
      }
      if ((slashesCount % 2 | 0) === 0) {
        return false;
      }
      startIndex = index + 1 | 0;
    }
     while (startIndex < _this__u8e3s4.length);
    return true;
  }
  function quoteTo(_this__u8e3s4, out) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    out.i5('"');
    var inductionVariable = 0;
    var last = _this__u8e3s4.length;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var ch = charSequenceGet(_this__u8e3s4, i);
        if (ch === _Char___init__impl__6a9atx(92)) {
          out.i5('\\\\');
        } else if (ch === _Char___init__impl__6a9atx(10)) {
          out.i5('\\n');
        } else if (ch === _Char___init__impl__6a9atx(13)) {
          out.i5('\\r');
        } else if (ch === _Char___init__impl__6a9atx(9)) {
          out.i5('\\t');
        } else if (ch === _Char___init__impl__6a9atx(34)) {
          out.i5('\\"');
        } else {
          out.j5(ch);
        }
      }
       while (inductionVariable < last);
    out.i5('"');
  }
  function needQuotes$accessor$vynnj(_this__u8e3s4) {
    _init_properties_HeaderValueWithParameters_kt__z6luvy();
    return needQuotes(_this__u8e3s4);
  }
  var properties_initialized_HeaderValueWithParameters_kt_yu5xg;
  function _init_properties_HeaderValueWithParameters_kt__z6luvy() {
    if (!properties_initialized_HeaderValueWithParameters_kt_yu5xg) {
      properties_initialized_HeaderValueWithParameters_kt_yu5xg = true;
      HeaderFieldValueSeparators = setOf([new Char(_Char___init__impl__6a9atx(40)), new Char(_Char___init__impl__6a9atx(41)), new Char(_Char___init__impl__6a9atx(60)), new Char(_Char___init__impl__6a9atx(62)), new Char(_Char___init__impl__6a9atx(64)), new Char(_Char___init__impl__6a9atx(44)), new Char(_Char___init__impl__6a9atx(59)), new Char(_Char___init__impl__6a9atx(58)), new Char(_Char___init__impl__6a9atx(92)), new Char(_Char___init__impl__6a9atx(34)), new Char(_Char___init__impl__6a9atx(47)), new Char(_Char___init__impl__6a9atx(91)), new Char(_Char___init__impl__6a9atx(93)), new Char(_Char___init__impl__6a9atx(63)), new Char(_Char___init__impl__6a9atx(61)), new Char(_Char___init__impl__6a9atx(123)), new Char(_Char___init__impl__6a9atx(125)), new Char(_Char___init__impl__6a9atx(32)), new Char(_Char___init__impl__6a9atx(9)), new Char(_Char___init__impl__6a9atx(10)), new Char(_Char___init__impl__6a9atx(13))]);
    }
  }
  function Companion_1() {
    Companion_instance_2 = this;
    this.a1o_1 = EmptyHeaders_instance;
  }
  var Companion_instance_2;
  function Companion_getInstance_1() {
    if (Companion_instance_2 == null)
      new Companion_1();
    return Companion_instance_2;
  }
  function HeadersBuilder(size) {
    size = size === VOID ? 8 : size;
    StringValuesBuilderImpl.call(this, true, size);
  }
  protoOf(HeadersBuilder).z15 = function () {
    return new HeadersImpl(this.p1i_1);
  };
  protoOf(HeadersBuilder).q1i = function (name) {
    protoOf(StringValuesBuilderImpl).q1i.call(this, name);
    HttpHeaders_getInstance().z1r(name);
  };
  protoOf(HeadersBuilder).t1i = function (value) {
    protoOf(StringValuesBuilderImpl).t1i.call(this, value);
    HttpHeaders_getInstance().a1s(value);
  };
  function EmptyHeaders() {
  }
  protoOf(EmptyHeaders).j1i = function () {
    return true;
  };
  protoOf(EmptyHeaders).k1i = function (name) {
    return null;
  };
  protoOf(EmptyHeaders).l1i = function () {
    return emptySet();
  };
  protoOf(EmptyHeaders).m1i = function () {
    return emptySet();
  };
  protoOf(EmptyHeaders).toString = function () {
    return 'Headers ' + this.m1i();
  };
  var EmptyHeaders_instance;
  function EmptyHeaders_getInstance() {
    return EmptyHeaders_instance;
  }
  function HeadersImpl(values) {
    values = values === VOID ? emptyMap() : values;
    StringValuesImpl.call(this, true, values);
  }
  protoOf(HeadersImpl).toString = function () {
    return 'Headers ' + this.m1i();
  };
  function HeaderValueParam_init_$Init$(name, value, $this) {
    HeaderValueParam.call($this, name, value, false);
    return $this;
  }
  function HeaderValueParam_init_$Create$(name, value) {
    return HeaderValueParam_init_$Init$(name, value, objectCreate(protoOf(HeaderValueParam)));
  }
  function HeaderValueParam(name, value, escapeValue) {
    this.g1m_1 = name;
    this.h1m_1 = value;
    this.i1m_1 = escapeValue;
  }
  protoOf(HeaderValueParam).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof HeaderValueParam) {
      tmp_0 = equals(other.g1m_1, this.g1m_1, true);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.h1m_1, this.h1m_1, true);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HeaderValueParam).hashCode = function () {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = this.g1m_1.toLowerCase();
    var result = getStringHashCode(tmp$ret$1);
    var tmp = result;
    var tmp_0 = imul(31, result);
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = this.h1m_1.toLowerCase();
    result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
    return result;
  };
  protoOf(HeaderValueParam).oc = function () {
    return this.g1m_1;
  };
  protoOf(HeaderValueParam).pc = function () {
    return this.h1m_1;
  };
  protoOf(HeaderValueParam).toString = function () {
    return 'HeaderValueParam(name=' + this.g1m_1 + ', value=' + this.h1m_1 + ', escapeValue=' + this.i1m_1 + ')';
  };
  function HeaderValue(value, params) {
    params = params === VOID ? emptyList() : params;
    this.l1m_1 = value;
    this.m1m_1 = params;
    var tmp = this;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = this.m1m_1.u();
      while (tmp0_iterator.v()) {
        var element = tmp0_iterator.w();
        // Inline function 'io.ktor.http.HeaderValue.quality.<anonymous>' call
        if (element.g1m_1 === 'q') {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h1m_1;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : toDoubleOrNull(tmp1_safe_receiver);
    var tmp_0;
    if (tmp2_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_1;
      // Inline function 'io.ktor.http.HeaderValue.quality.<anonymous>' call
      if (0.0 <= tmp2_safe_receiver ? tmp2_safe_receiver <= 1.0 : false) {
        tmp_1 = tmp2_safe_receiver;
      } else {
        tmp_1 = null;
      }
      tmp_0 = tmp_1;
    }
    var tmp3_elvis_lhs = tmp_0;
    tmp.n1m_1 = tmp3_elvis_lhs == null ? 1.0 : tmp3_elvis_lhs;
  }
  protoOf(HeaderValue).oc = function () {
    return this.l1m_1;
  };
  protoOf(HeaderValue).toString = function () {
    return 'HeaderValue(value=' + this.l1m_1 + ', params=' + this.m1m_1 + ')';
  };
  protoOf(HeaderValue).hashCode = function () {
    var result = getStringHashCode(this.l1m_1);
    result = imul(result, 31) + hashCode(this.m1m_1) | 0;
    return result;
  };
  protoOf(HeaderValue).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HeaderValue))
      return false;
    var tmp0_other_with_cast = other instanceof HeaderValue ? other : THROW_CCE();
    if (!(this.l1m_1 === tmp0_other_with_cast.l1m_1))
      return false;
    if (!equals_0(this.m1m_1, tmp0_other_with_cast.m1m_1))
      return false;
    return true;
  };
  function parseHeaderValue(text) {
    return parseHeaderValue_0(text, false);
  }
  function parseHeaderValue_0(text, parametersOnly) {
    if (text == null) {
      return emptyList();
    }
    var position = 0;
    var tmp = LazyThreadSafetyMode_NONE_getInstance();
    var items = lazy(tmp, parseHeaderValue$lambda);
    while (position <= get_lastIndex_0(text)) {
      position = parseHeaderValueItem(text, position, items, parametersOnly);
    }
    return valueOrEmpty(items);
  }
  function parseHeaderValueItem(text, start, items, parametersOnly) {
    var position = start;
    var tmp = LazyThreadSafetyMode_NONE_getInstance();
    var parameters = lazy(tmp, parseHeaderValueItem$lambda);
    var valueEnd = parametersOnly ? position : null;
    while (position <= get_lastIndex_0(text)) {
      var tmp0_subject = charSequenceGet(text, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(44)) {
        var tmp_0 = items.f2();
        var tmp1_elvis_lhs = valueEnd;
        tmp_0.r(new HeaderValue(subtrim(text, start, tmp1_elvis_lhs == null ? position : tmp1_elvis_lhs), valueOrEmpty(parameters)));
        return position + 1 | 0;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(59)) {
        if (valueEnd == null)
          valueEnd = position;
        position = parseHeaderValueParameter(text, position + 1 | 0, parameters);
      } else {
        var tmp_1;
        if (parametersOnly) {
          tmp_1 = parseHeaderValueParameter(text, position, parameters);
        } else {
          tmp_1 = position + 1 | 0;
        }
        position = tmp_1;
      }
    }
    var tmp_2 = items.f2();
    var tmp2_elvis_lhs = valueEnd;
    tmp_2.r(new HeaderValue(subtrim(text, start, tmp2_elvis_lhs == null ? position : tmp2_elvis_lhs), valueOrEmpty(parameters)));
    return position;
  }
  function valueOrEmpty(_this__u8e3s4) {
    return _this__u8e3s4.gf() ? _this__u8e3s4.f2() : emptyList();
  }
  function subtrim(_this__u8e3s4, start, end) {
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var this_0 = _this__u8e3s4.substring(start, end);
    return toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
  }
  function parseHeaderValueParameter(text, start, parameters) {
    var position = start;
    while (position <= get_lastIndex_0(text)) {
      var tmp0_subject = charSequenceGet(text, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(61)) {
        var tmp1_container = parseHeaderValueParameterValue(text, position + 1 | 0);
        var paramEnd = tmp1_container.oc();
        var paramValue = tmp1_container.pc();
        parseHeaderValueParameter$addParam(parameters, text, start, position, paramValue);
        return paramEnd;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(59) ? true : tmp0_subject === _Char___init__impl__6a9atx(44)) {
        parseHeaderValueParameter$addParam(parameters, text, start, position, '');
        return position;
      } else {
        position = position + 1 | 0;
      }
    }
    parseHeaderValueParameter$addParam(parameters, text, start, position, '');
    return position;
  }
  function parseHeaderValueParameterValue(value, start) {
    if (value.length === start) {
      return to(start, '');
    }
    var position = start;
    if (charSequenceGet(value, start) === _Char___init__impl__6a9atx(34)) {
      return parseHeaderValueParameterValueQuoted(value, position + 1 | 0);
    }
    while (position <= get_lastIndex_0(value)) {
      var tmp0_subject = charSequenceGet(value, position);
      if (tmp0_subject === _Char___init__impl__6a9atx(59) ? true : tmp0_subject === _Char___init__impl__6a9atx(44))
        return to(position, subtrim(value, start, position));
      else {
        position = position + 1 | 0;
      }
    }
    return to(position, subtrim(value, start, position));
  }
  function parseHeaderValueParameterValueQuoted(value, start) {
    var position = start;
    var builder = StringBuilder_init_$Create$();
    loop: while (position <= get_lastIndex_0(value)) {
      var currentChar = charSequenceGet(value, position);
      if (currentChar === _Char___init__impl__6a9atx(34) ? nextIsSemicolonOrEnd(value, position) : false) {
        return to(position + 1 | 0, builder.toString());
      } else if (currentChar === _Char___init__impl__6a9atx(92) ? position < (get_lastIndex_0(value) - 2 | 0) : false) {
        builder.j5(charSequenceGet(value, position + 1 | 0));
        position = position + 2 | 0;
        continue loop;
      }
      builder.j5(currentChar);
      position = position + 1 | 0;
    }
    var tmp = position;
    // Inline function 'kotlin.text.plus' call
    var this_0 = _Char___init__impl__6a9atx(34);
    var other = builder.toString();
    var tmp$ret$0 = toString_0(this_0) + other;
    return to(tmp, tmp$ret$0);
  }
  function nextIsSemicolonOrEnd(_this__u8e3s4, start) {
    var position = start + 1 | 0;
    loop: while (position < _this__u8e3s4.length ? charSequenceGet(_this__u8e3s4, position) === _Char___init__impl__6a9atx(32) : false) {
      position = position + 1 | 0;
    }
    return position === _this__u8e3s4.length ? true : charSequenceGet(_this__u8e3s4, position) === _Char___init__impl__6a9atx(59);
  }
  function parseAndSortHeader(header) {
    // Inline function 'kotlin.collections.sortedByDescending' call
    var this_0 = parseHeaderValue(header);
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp = parseAndSortHeader$lambda;
    var tmp$ret$0 = new sam$kotlin_Comparator$0(tmp);
    return sortedWith(this_0, tmp$ret$0);
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.b1s_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).z7 = function (a, b) {
    return this.b1s_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.z7(a, b);
  };
  function parseHeaderValueParameter$addParam($parameters, text, start, end, value) {
    var name = subtrim(text, start, end);
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(name) === 0) {
      return Unit_instance;
    }
    $parameters.f2().r(HeaderValueParam_init_$Create$(name, value));
  }
  function parseHeaderValue$lambda() {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  }
  function parseHeaderValueItem$lambda() {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  }
  function parseAndSortHeader$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'io.ktor.http.parseAndSortHeader.<anonymous>' call
    var tmp = b.n1m_1;
    // Inline function 'io.ktor.http.parseAndSortHeader.<anonymous>' call
    var tmp$ret$1 = a.n1m_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function HttpHeaders() {
    HttpHeaders_instance = this;
    this.d1o_1 = 'Accept';
    this.e1o_1 = 'Accept-Charset';
    this.f1o_1 = 'Accept-Encoding';
    this.g1o_1 = 'Accept-Language';
    this.h1o_1 = 'Accept-Ranges';
    this.i1o_1 = 'Age';
    this.j1o_1 = 'Allow';
    this.k1o_1 = 'ALPN';
    this.l1o_1 = 'Authentication-Info';
    this.m1o_1 = 'Authorization';
    this.n1o_1 = 'Cache-Control';
    this.o1o_1 = 'Connection';
    this.p1o_1 = 'Content-Disposition';
    this.q1o_1 = 'Content-Encoding';
    this.r1o_1 = 'Content-Language';
    this.s1o_1 = 'Content-Length';
    this.t1o_1 = 'Content-Location';
    this.u1o_1 = 'Content-Range';
    this.v1o_1 = 'Content-Type';
    this.w1o_1 = 'Cookie';
    this.x1o_1 = 'DASL';
    this.y1o_1 = 'Date';
    this.z1o_1 = 'DAV';
    this.a1p_1 = 'Depth';
    this.b1p_1 = 'Destination';
    this.c1p_1 = 'ETag';
    this.d1p_1 = 'Expect';
    this.e1p_1 = 'Expires';
    this.f1p_1 = 'From';
    this.g1p_1 = 'Forwarded';
    this.h1p_1 = 'Host';
    this.i1p_1 = 'HTTP2-Settings';
    this.j1p_1 = 'If';
    this.k1p_1 = 'If-Match';
    this.l1p_1 = 'If-Modified-Since';
    this.m1p_1 = 'If-None-Match';
    this.n1p_1 = 'If-Range';
    this.o1p_1 = 'If-Schedule-Tag-Match';
    this.p1p_1 = 'If-Unmodified-Since';
    this.q1p_1 = 'Last-Modified';
    this.r1p_1 = 'Location';
    this.s1p_1 = 'Lock-Token';
    this.t1p_1 = 'Link';
    this.u1p_1 = 'Max-Forwards';
    this.v1p_1 = 'MIME-Version';
    this.w1p_1 = 'Ordering-Type';
    this.x1p_1 = 'Origin';
    this.y1p_1 = 'Overwrite';
    this.z1p_1 = 'Position';
    this.a1q_1 = 'Pragma';
    this.b1q_1 = 'Prefer';
    this.c1q_1 = 'Preference-Applied';
    this.d1q_1 = 'Proxy-Authenticate';
    this.e1q_1 = 'Proxy-Authentication-Info';
    this.f1q_1 = 'Proxy-Authorization';
    this.g1q_1 = 'Public-Key-Pins';
    this.h1q_1 = 'Public-Key-Pins-Report-Only';
    this.i1q_1 = 'Range';
    this.j1q_1 = 'Referer';
    this.k1q_1 = 'Retry-After';
    this.l1q_1 = 'Schedule-Reply';
    this.m1q_1 = 'Schedule-Tag';
    this.n1q_1 = 'Sec-WebSocket-Accept';
    this.o1q_1 = 'Sec-WebSocket-Extensions';
    this.p1q_1 = 'Sec-WebSocket-Key';
    this.q1q_1 = 'Sec-WebSocket-Protocol';
    this.r1q_1 = 'Sec-WebSocket-Version';
    this.s1q_1 = 'Server';
    this.t1q_1 = 'Set-Cookie';
    this.u1q_1 = 'SLUG';
    this.v1q_1 = 'Strict-Transport-Security';
    this.w1q_1 = 'TE';
    this.x1q_1 = 'Timeout';
    this.y1q_1 = 'Trailer';
    this.z1q_1 = 'Transfer-Encoding';
    this.a1r_1 = 'Upgrade';
    this.b1r_1 = 'User-Agent';
    this.c1r_1 = 'Vary';
    this.d1r_1 = 'Via';
    this.e1r_1 = 'Warning';
    this.f1r_1 = 'WWW-Authenticate';
    this.g1r_1 = 'Access-Control-Allow-Origin';
    this.h1r_1 = 'Access-Control-Allow-Methods';
    this.i1r_1 = 'Access-Control-Allow-Credentials';
    this.j1r_1 = 'Access-Control-Allow-Headers';
    this.k1r_1 = 'Access-Control-Request-Method';
    this.l1r_1 = 'Access-Control-Request-Headers';
    this.m1r_1 = 'Access-Control-Expose-Headers';
    this.n1r_1 = 'Access-Control-Max-Age';
    this.o1r_1 = 'X-Http-Method-Override';
    this.p1r_1 = 'X-Forwarded-Host';
    this.q1r_1 = 'X-Forwarded-Server';
    this.r1r_1 = 'X-Forwarded-Proto';
    this.s1r_1 = 'X-Forwarded-For';
    this.t1r_1 = 'X-Forwarded-Port';
    this.u1r_1 = 'X-Request-ID';
    this.v1r_1 = 'X-Correlation-ID';
    this.w1r_1 = 'X-Total-Count';
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.x1r_1 = [this.z1q_1, this.a1r_1];
    this.y1r_1 = asList(this.x1r_1);
  }
  protoOf(HttpHeaders).z1r = function (name) {
    // Inline function 'kotlin.text.forEachIndexed' call
    var index = 0;
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(name)) {
      var item = charSequenceGet(name, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'io.ktor.http.HttpHeaders.checkHeaderName.<anonymous>' call
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) <= 0 ? true : isDelimiter(item)) {
        throw new IllegalHeaderNameException(name, tmp1);
      }
    }
  };
  protoOf(HttpHeaders).a1s = function (value) {
    // Inline function 'kotlin.text.forEachIndexed' call
    var index = 0;
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(value)) {
      var item = charSequenceGet(value, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'io.ktor.http.HttpHeaders.checkHeaderValue.<anonymous>' call
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) < 0 ? !(item === _Char___init__impl__6a9atx(9)) : false) {
        throw new IllegalHeaderValueException(value, tmp1);
      }
    }
  };
  var HttpHeaders_instance;
  function HttpHeaders_getInstance() {
    if (HttpHeaders_instance == null)
      new HttpHeaders();
    return HttpHeaders_instance;
  }
  function isDelimiter(ch) {
    return contains('"(),/:;<=>?@[\\]{}', ch);
  }
  function IllegalHeaderNameException(headerName, position) {
    var tmp = "Header name '" + headerName + "' contains illegal character '" + toString_0(charSequenceGet(headerName, position)) + "'";
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(headerName, position);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    IllegalArgumentException_init_$Init$(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'), this);
    captureStack(this, IllegalHeaderNameException);
    this.c1s_1 = headerName;
    this.d1s_1 = position;
  }
  function IllegalHeaderValueException(headerValue, position) {
    var tmp = "Header value '" + headerValue + "' contains illegal character '" + toString_0(charSequenceGet(headerValue, position)) + "'";
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(headerValue, position);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    IllegalArgumentException_init_$Init$(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'), this);
    captureStack(this, IllegalHeaderValueException);
    this.e1s_1 = headerValue;
    this.f1s_1 = position;
  }
  function UnsafeHeaderException(header) {
    IllegalArgumentException_init_$Init$('Header(s) ' + header + ' are controlled by the engine and ' + 'cannot be set explicitly', this);
    captureStack(this, UnsafeHeaderException);
  }
  function contentType(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.g1s().k1h(HttpHeaders_getInstance().v1o_1);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.http.contentType.<anonymous>' call
      tmp = Companion_getInstance().k1m(tmp0_safe_receiver);
    }
    return tmp;
  }
  function contentLength(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.g1s().k1h(HttpHeaders_getInstance().s1o_1);
    return tmp0_safe_receiver == null ? null : toLong(tmp0_safe_receiver);
  }
  function charset_0(_this__u8e3s4) {
    var tmp0_safe_receiver = contentType_0(_this__u8e3s4);
    return tmp0_safe_receiver == null ? null : charset(tmp0_safe_receiver);
  }
  function contentType_0(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.g1s().k1h(HttpHeaders_getInstance().v1o_1);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.http.contentType.<anonymous>' call
      tmp = Companion_getInstance().k1m(tmp0_safe_receiver);
    }
    return tmp;
  }
  function Companion_2() {
    Companion_instance_3 = this;
    this.h1s_1 = new HttpMethod('GET');
    this.i1s_1 = new HttpMethod('POST');
    this.j1s_1 = new HttpMethod('PUT');
    this.k1s_1 = new HttpMethod('PATCH');
    this.l1s_1 = new HttpMethod('DELETE');
    this.m1s_1 = new HttpMethod('HEAD');
    this.n1s_1 = new HttpMethod('OPTIONS');
    this.o1s_1 = listOf([this.h1s_1, this.i1s_1, this.j1s_1, this.k1s_1, this.l1s_1, this.m1s_1, this.n1s_1]);
  }
  var Companion_instance_3;
  function Companion_getInstance_2() {
    if (Companion_instance_3 == null)
      new Companion_2();
    return Companion_instance_3;
  }
  function HttpMethod(value) {
    Companion_getInstance_2();
    this.p1s_1 = value;
  }
  protoOf(HttpMethod).toString = function () {
    return 'HttpMethod(value=' + this.p1s_1 + ')';
  };
  protoOf(HttpMethod).hashCode = function () {
    return getStringHashCode(this.p1s_1);
  };
  protoOf(HttpMethod).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpMethod))
      return false;
    var tmp0_other_with_cast = other instanceof HttpMethod ? other : THROW_CCE();
    if (!(this.p1s_1 === tmp0_other_with_cast.p1s_1))
      return false;
    return true;
  };
  function Companion_3() {
    Companion_instance_4 = this;
    this.q1s_1 = new HttpProtocolVersion('HTTP', 2, 0);
    this.r1s_1 = new HttpProtocolVersion('HTTP', 1, 1);
    this.s1s_1 = new HttpProtocolVersion('HTTP', 1, 0);
    this.t1s_1 = new HttpProtocolVersion('SPDY', 3, 0);
    this.u1s_1 = new HttpProtocolVersion('QUIC', 1, 0);
  }
  var Companion_instance_4;
  function Companion_getInstance_3() {
    if (Companion_instance_4 == null)
      new Companion_3();
    return Companion_instance_4;
  }
  function HttpProtocolVersion(name, major, minor) {
    Companion_getInstance_3();
    this.v1s_1 = name;
    this.w1s_1 = major;
    this.x1s_1 = minor;
  }
  protoOf(HttpProtocolVersion).toString = function () {
    return this.v1s_1 + '/' + this.w1s_1 + '.' + this.x1s_1;
  };
  protoOf(HttpProtocolVersion).hashCode = function () {
    var result = getStringHashCode(this.v1s_1);
    result = imul(result, 31) + this.w1s_1 | 0;
    result = imul(result, 31) + this.x1s_1 | 0;
    return result;
  };
  protoOf(HttpProtocolVersion).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HttpProtocolVersion))
      return false;
    var tmp0_other_with_cast = other instanceof HttpProtocolVersion ? other : THROW_CCE();
    if (!(this.v1s_1 === tmp0_other_with_cast.v1s_1))
      return false;
    if (!(this.w1s_1 === tmp0_other_with_cast.w1s_1))
      return false;
    if (!(this.x1s_1 === tmp0_other_with_cast.x1s_1))
      return false;
    return true;
  };
  function Companion_4() {
    Companion_instance_5 = this;
    this.y1s_1 = new HttpStatusCode(100, 'Continue');
    this.z1s_1 = new HttpStatusCode(101, 'Switching Protocols');
    this.a1t_1 = new HttpStatusCode(102, 'Processing');
    this.b1t_1 = new HttpStatusCode(200, 'OK');
    this.c1t_1 = new HttpStatusCode(201, 'Created');
    this.d1t_1 = new HttpStatusCode(202, 'Accepted');
    this.e1t_1 = new HttpStatusCode(203, 'Non-Authoritative Information');
    this.f1t_1 = new HttpStatusCode(204, 'No Content');
    this.g1t_1 = new HttpStatusCode(205, 'Reset Content');
    this.h1t_1 = new HttpStatusCode(206, 'Partial Content');
    this.i1t_1 = new HttpStatusCode(207, 'Multi-Status');
    this.j1t_1 = new HttpStatusCode(300, 'Multiple Choices');
    this.k1t_1 = new HttpStatusCode(301, 'Moved Permanently');
    this.l1t_1 = new HttpStatusCode(302, 'Found');
    this.m1t_1 = new HttpStatusCode(303, 'See Other');
    this.n1t_1 = new HttpStatusCode(304, 'Not Modified');
    this.o1t_1 = new HttpStatusCode(305, 'Use Proxy');
    this.p1t_1 = new HttpStatusCode(306, 'Switch Proxy');
    this.q1t_1 = new HttpStatusCode(307, 'Temporary Redirect');
    this.r1t_1 = new HttpStatusCode(308, 'Permanent Redirect');
    this.s1t_1 = new HttpStatusCode(400, 'Bad Request');
    this.t1t_1 = new HttpStatusCode(401, 'Unauthorized');
    this.u1t_1 = new HttpStatusCode(402, 'Payment Required');
    this.v1t_1 = new HttpStatusCode(403, 'Forbidden');
    this.w1t_1 = new HttpStatusCode(404, 'Not Found');
    this.x1t_1 = new HttpStatusCode(405, 'Method Not Allowed');
    this.y1t_1 = new HttpStatusCode(406, 'Not Acceptable');
    this.z1t_1 = new HttpStatusCode(407, 'Proxy Authentication Required');
    this.a1u_1 = new HttpStatusCode(408, 'Request Timeout');
    this.b1u_1 = new HttpStatusCode(409, 'Conflict');
    this.c1u_1 = new HttpStatusCode(410, 'Gone');
    this.d1u_1 = new HttpStatusCode(411, 'Length Required');
    this.e1u_1 = new HttpStatusCode(412, 'Precondition Failed');
    this.f1u_1 = new HttpStatusCode(413, 'Payload Too Large');
    this.g1u_1 = new HttpStatusCode(414, 'Request-URI Too Long');
    this.h1u_1 = new HttpStatusCode(415, 'Unsupported Media Type');
    this.i1u_1 = new HttpStatusCode(416, 'Requested Range Not Satisfiable');
    this.j1u_1 = new HttpStatusCode(417, 'Expectation Failed');
    this.k1u_1 = new HttpStatusCode(422, 'Unprocessable Entity');
    this.l1u_1 = new HttpStatusCode(423, 'Locked');
    this.m1u_1 = new HttpStatusCode(424, 'Failed Dependency');
    this.n1u_1 = new HttpStatusCode(425, 'Too Early');
    this.o1u_1 = new HttpStatusCode(426, 'Upgrade Required');
    this.p1u_1 = new HttpStatusCode(429, 'Too Many Requests');
    this.q1u_1 = new HttpStatusCode(431, 'Request Header Fields Too Large');
    this.r1u_1 = new HttpStatusCode(500, 'Internal Server Error');
    this.s1u_1 = new HttpStatusCode(501, 'Not Implemented');
    this.t1u_1 = new HttpStatusCode(502, 'Bad Gateway');
    this.u1u_1 = new HttpStatusCode(503, 'Service Unavailable');
    this.v1u_1 = new HttpStatusCode(504, 'Gateway Timeout');
    this.w1u_1 = new HttpStatusCode(505, 'HTTP Version Not Supported');
    this.x1u_1 = new HttpStatusCode(506, 'Variant Also Negotiates');
    this.y1u_1 = new HttpStatusCode(507, 'Insufficient Storage');
    this.z1u_1 = allStatusCodes();
    var tmp = this;
    // Inline function 'kotlin.collections.associateBy' call
    var this_0 = this.z1u_1;
    var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
    // Inline function 'kotlin.collections.associateByTo' call
    var destination = LinkedHashMap_init_$Create$(capacity);
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.http.Companion.statusCodesMap.<anonymous>' call
      var tmp$ret$0 = element.b1v_1;
      destination.c2(tmp$ret$0, element);
    }
    tmp.a1v_1 = destination;
  }
  var Companion_instance_5;
  function Companion_getInstance_4() {
    if (Companion_instance_5 == null)
      new Companion_4();
    return Companion_instance_5;
  }
  function HttpStatusCode(value, description) {
    Companion_getInstance_4();
    this.b1v_1 = value;
    this.c1v_1 = description;
  }
  protoOf(HttpStatusCode).toString = function () {
    return '' + this.b1v_1 + ' ' + this.c1v_1;
  };
  protoOf(HttpStatusCode).equals = function (other) {
    var tmp;
    if (other instanceof HttpStatusCode) {
      tmp = other.b1v_1 === this.b1v_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(HttpStatusCode).hashCode = function () {
    return this.b1v_1;
  };
  protoOf(HttpStatusCode).d1v = function (other) {
    return this.b1v_1 - other.b1v_1 | 0;
  };
  protoOf(HttpStatusCode).d = function (other) {
    return this.d1v(other instanceof HttpStatusCode ? other : THROW_CCE());
  };
  function allStatusCodes() {
    return listOf([Companion_getInstance_4().y1s_1, Companion_getInstance_4().z1s_1, Companion_getInstance_4().a1t_1, Companion_getInstance_4().b1t_1, Companion_getInstance_4().c1t_1, Companion_getInstance_4().d1t_1, Companion_getInstance_4().e1t_1, Companion_getInstance_4().f1t_1, Companion_getInstance_4().g1t_1, Companion_getInstance_4().h1t_1, Companion_getInstance_4().i1t_1, Companion_getInstance_4().j1t_1, Companion_getInstance_4().k1t_1, Companion_getInstance_4().l1t_1, Companion_getInstance_4().m1t_1, Companion_getInstance_4().n1t_1, Companion_getInstance_4().o1t_1, Companion_getInstance_4().p1t_1, Companion_getInstance_4().q1t_1, Companion_getInstance_4().r1t_1, Companion_getInstance_4().s1t_1, Companion_getInstance_4().t1t_1, Companion_getInstance_4().u1t_1, Companion_getInstance_4().v1t_1, Companion_getInstance_4().w1t_1, Companion_getInstance_4().x1t_1, Companion_getInstance_4().y1t_1, Companion_getInstance_4().z1t_1, Companion_getInstance_4().a1u_1, Companion_getInstance_4().b1u_1, Companion_getInstance_4().c1u_1, Companion_getInstance_4().d1u_1, Companion_getInstance_4().e1u_1, Companion_getInstance_4().f1u_1, Companion_getInstance_4().g1u_1, Companion_getInstance_4().h1u_1, Companion_getInstance_4().i1u_1, Companion_getInstance_4().j1u_1, Companion_getInstance_4().k1u_1, Companion_getInstance_4().l1u_1, Companion_getInstance_4().m1u_1, Companion_getInstance_4().n1u_1, Companion_getInstance_4().o1u_1, Companion_getInstance_4().p1u_1, Companion_getInstance_4().q1u_1, Companion_getInstance_4().r1u_1, Companion_getInstance_4().s1u_1, Companion_getInstance_4().t1u_1, Companion_getInstance_4().u1u_1, Companion_getInstance_4().v1u_1, Companion_getInstance_4().w1u_1, Companion_getInstance_4().x1u_1, Companion_getInstance_4().y1u_1]);
  }
  function Companion_5() {
    Companion_instance_6 = this;
    this.e1v_1 = EmptyParameters_instance;
  }
  var Companion_instance_6;
  function Companion_getInstance_5() {
    if (Companion_instance_6 == null)
      new Companion_5();
    return Companion_instance_6;
  }
  function Parameters() {
  }
  function ParametersBuilder(size) {
    size = size === VOID ? 8 : size;
    return new ParametersBuilderImpl(size);
  }
  function EmptyParameters() {
  }
  protoOf(EmptyParameters).j1i = function () {
    return true;
  };
  protoOf(EmptyParameters).k1i = function (name) {
    return null;
  };
  protoOf(EmptyParameters).l1i = function () {
    return emptySet();
  };
  protoOf(EmptyParameters).m1i = function () {
    return emptySet();
  };
  protoOf(EmptyParameters).b1 = function () {
    return true;
  };
  protoOf(EmptyParameters).toString = function () {
    return 'Parameters ' + this.m1i();
  };
  protoOf(EmptyParameters).equals = function (other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Parameters) : false) {
      tmp = other.b1();
    } else {
      tmp = false;
    }
    return tmp;
  };
  var EmptyParameters_instance;
  function EmptyParameters_getInstance() {
    return EmptyParameters_instance;
  }
  function ParametersBuilderImpl(size) {
    size = size === VOID ? 8 : size;
    StringValuesBuilderImpl.call(this, true, size);
  }
  protoOf(ParametersBuilderImpl).z15 = function () {
    return new ParametersImpl(this.p1i_1);
  };
  function ParametersImpl(values) {
    values = values === VOID ? emptyMap() : values;
    StringValuesImpl.call(this, true, values);
  }
  protoOf(ParametersImpl).toString = function () {
    return 'Parameters ' + this.m1i();
  };
  function parseQueryString(query, startIndex, limit, decode) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    limit = limit === VOID ? 1000 : limit;
    decode = decode === VOID ? true : decode;
    var tmp;
    if (startIndex > get_lastIndex_0(query)) {
      tmp = Companion_getInstance_5().e1v_1;
    } else {
      // Inline function 'io.ktor.http.Companion.build' call
      Companion_getInstance_5();
      // Inline function 'kotlin.apply' call
      var this_0 = ParametersBuilder();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'io.ktor.http.parseQueryString.<anonymous>' call
      parse(this_0, query, startIndex, limit, decode);
      tmp = this_0.z15();
    }
    return tmp;
  }
  function parse(_this__u8e3s4, query, startIndex, limit, decode) {
    var count = 0;
    var nameIndex = startIndex;
    var equalIndex = -1;
    var inductionVariable = startIndex;
    var last = get_lastIndex_0(query);
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (count === limit) {
          return Unit_instance;
        }
        var tmp1_subject = charSequenceGet(query, index);
        if (tmp1_subject === _Char___init__impl__6a9atx(38)) {
          appendParam(_this__u8e3s4, query, nameIndex, equalIndex, index, decode);
          nameIndex = index + 1 | 0;
          equalIndex = -1;
          count = count + 1 | 0;
        } else if (tmp1_subject === _Char___init__impl__6a9atx(61)) {
          if (equalIndex === -1) {
            equalIndex = index;
          }
        }
      }
       while (!(index === last));
    if (count === limit) {
      return Unit_instance;
    }
    appendParam(_this__u8e3s4, query, nameIndex, equalIndex, query.length, decode);
  }
  function appendParam(_this__u8e3s4, query, nameIndex, equalIndex, endIndex, decode) {
    if (equalIndex === -1) {
      var spaceNameIndex = trimStart(nameIndex, endIndex, query);
      var spaceEndIndex = trimEnd(spaceNameIndex, endIndex, query);
      if (spaceEndIndex > spaceNameIndex) {
        var tmp;
        if (decode) {
          tmp = decodeURLQueryComponent(query, spaceNameIndex, spaceEndIndex);
        } else {
          // Inline function 'kotlin.text.substring' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp = query.substring(spaceNameIndex, spaceEndIndex);
        }
        var name = tmp;
        _this__u8e3s4.r1i(name, emptyList());
      }
      return Unit_instance;
    }
    var spaceNameIndex_0 = trimStart(nameIndex, equalIndex, query);
    var spaceEqualIndex = trimEnd(spaceNameIndex_0, equalIndex, query);
    if (spaceEqualIndex > spaceNameIndex_0) {
      var tmp_0;
      if (decode) {
        tmp_0 = decodeURLQueryComponent(query, spaceNameIndex_0, spaceEqualIndex);
      } else {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = query.substring(spaceNameIndex_0, spaceEqualIndex);
      }
      var name_0 = tmp_0;
      var spaceValueIndex = trimStart(equalIndex + 1 | 0, endIndex, query);
      var spaceEndIndex_0 = trimEnd(spaceValueIndex, endIndex, query);
      var tmp_1;
      if (decode) {
        tmp_1 = decodeURLQueryComponent(query, spaceValueIndex, spaceEndIndex_0, true);
      } else {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_1 = query.substring(spaceValueIndex, spaceEndIndex_0);
      }
      var value = tmp_1;
      _this__u8e3s4.u1i(name_0, value);
    }
  }
  function trimStart(start, end, query) {
    var spaceIndex = start;
    while (spaceIndex < end ? isWhitespace(charSequenceGet(query, spaceIndex)) : false) {
      spaceIndex = spaceIndex + 1 | 0;
    }
    return spaceIndex;
  }
  function trimEnd(start, end, text) {
    var spaceIndex = end;
    while (spaceIndex > start ? isWhitespace(charSequenceGet(text, spaceIndex - 1 | 0)) : false) {
      spaceIndex = spaceIndex - 1 | 0;
    }
    return spaceIndex;
  }
  function applyOrigin($this) {
    var tmp;
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = $this.i1v_1;
    if (charSequenceLength(this_0) > 0) {
      tmp = true;
    } else {
      tmp = $this.h1v_1.r1v_1 === 'file';
    }
    if (tmp)
      return Unit_instance;
    $this.i1v_1 = Companion_getInstance_6().j1w_1.u1v_1;
    if ($this.h1v_1.equals(Companion_getInstance_7().k1w_1))
      $this.h1v_1 = Companion_getInstance_6().j1w_1.t1v_1;
    if ($this.j1v_1 === 0)
      $this.j1v_1 = Companion_getInstance_6().j1w_1.v1v_1;
  }
  function Companion_6() {
    Companion_instance_7 = this;
    this.j1w_1 = Url(get_origin(this));
  }
  var Companion_instance_7;
  function Companion_getInstance_6() {
    if (Companion_instance_7 == null)
      new Companion_6();
    return Companion_instance_7;
  }
  function URLBuilder(protocol, host, port, user, password, pathSegments, parameters, fragment, trailingQuery) {
    Companion_getInstance_6();
    protocol = protocol === VOID ? Companion_getInstance_7().k1w_1 : protocol;
    host = host === VOID ? '' : host;
    port = port === VOID ? 0 : port;
    user = user === VOID ? null : user;
    password = password === VOID ? null : password;
    pathSegments = pathSegments === VOID ? emptyList() : pathSegments;
    parameters = parameters === VOID ? Companion_getInstance_5().e1v_1 : parameters;
    fragment = fragment === VOID ? '' : fragment;
    trailingQuery = trailingQuery === VOID ? false : trailingQuery;
    this.h1v_1 = protocol;
    this.i1v_1 = host;
    this.j1v_1 = port;
    this.k1v_1 = trailingQuery;
    var tmp = this;
    tmp.l1v_1 = user == null ? null : encodeURLParameter(user);
    var tmp_0 = this;
    tmp_0.m1v_1 = password == null ? null : encodeURLParameter(password);
    this.n1v_1 = encodeURLQueryComponent(fragment);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(pathSegments, 10));
    var tmp0_iterator = pathSegments.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.http.URLBuilder.encodedPathSegments.<anonymous>' call
      var tmp$ret$0 = encodeURLPathPart(item);
      destination.r(tmp$ret$0);
    }
    tmp_1.o1v_1 = destination;
    this.p1v_1 = encodeParameters(parameters);
    this.q1v_1 = new UrlDecodedParametersBuilder(this.p1v_1);
  }
  protoOf(URLBuilder).q1w = function (value) {
    var tmp = this;
    tmp.l1v_1 = value == null ? null : encodeURLParameter(value);
  };
  protoOf(URLBuilder).r1w = function () {
    var tmp0_safe_receiver = this.l1v_1;
    return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
  };
  protoOf(URLBuilder).s1w = function () {
    var tmp0_safe_receiver = this.m1v_1;
    return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
  };
  protoOf(URLBuilder).t1w = function () {
    return decodeURLQueryComponent(this.n1v_1);
  };
  protoOf(URLBuilder).u1w = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.o1v_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.http.URLBuilder.<get-pathSegments>.<anonymous>' call
      var tmp$ret$0 = decodeURLPart(item);
      destination.r(tmp$ret$0);
    }
    return destination;
  };
  protoOf(URLBuilder).v1w = function (value) {
    this.p1v_1 = value;
    this.q1v_1 = new UrlDecodedParametersBuilder(value);
  };
  protoOf(URLBuilder).w1w = function () {
    applyOrigin(this);
    return appendTo(this, StringBuilder_init_$Create$_0(256)).toString();
  };
  protoOf(URLBuilder).toString = function () {
    return appendTo(this, StringBuilder_init_$Create$_0(256)).toString();
  };
  protoOf(URLBuilder).z15 = function () {
    applyOrigin(this);
    return new Url_0(this.h1v_1, this.i1v_1, this.j1v_1, this.u1w(), this.q1v_1.z15(), this.t1w(), this.r1w(), this.s1w(), this.k1v_1, this.w1w());
  };
  function get_authority(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.<get-authority>.<anonymous>' call
    this_0.i5(get_encodedUserAndPassword(_this__u8e3s4));
    this_0.i5(_this__u8e3s4.i1v_1);
    if (!(_this__u8e3s4.j1v_1 === 0) ? !(_this__u8e3s4.j1v_1 === _this__u8e3s4.h1v_1.s1v_1) : false) {
      this_0.i5(':');
      this_0.i5(_this__u8e3s4.j1v_1.toString());
    }
    return this_0.toString();
  }
  function get_DEFAULT_PORT() {
    return DEFAULT_PORT;
  }
  var DEFAULT_PORT;
  function appendTo(_this__u8e3s4, out) {
    out.k7(_this__u8e3s4.h1v_1.r1v_1);
    var tmp0_subject = _this__u8e3s4.h1v_1.r1v_1;
    if (tmp0_subject === 'file') {
      appendFile(out, _this__u8e3s4.i1v_1, get_encodedPath(_this__u8e3s4));
      return out;
    } else if (tmp0_subject === 'mailto') {
      appendMailto(out, get_encodedUserAndPassword(_this__u8e3s4), _this__u8e3s4.i1v_1);
      return out;
    }
    out.k7('://');
    out.k7(get_authority(_this__u8e3s4));
    appendUrlFullPath(out, get_encodedPath(_this__u8e3s4), _this__u8e3s4.p1v_1, _this__u8e3s4.k1v_1);
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = _this__u8e3s4.n1v_1;
    if (charSequenceLength(this_0) > 0) {
      out.j5(_Char___init__impl__6a9atx(35));
      out.k7(_this__u8e3s4.n1v_1);
    }
    return out;
  }
  function get_encodedUserAndPassword(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.<get-encodedUserAndPassword>.<anonymous>' call
    appendUserAndPassword(this_0, _this__u8e3s4.l1v_1, _this__u8e3s4.m1v_1);
    return this_0.toString();
  }
  function appendFile(_this__u8e3s4, host, encodedPath) {
    _this__u8e3s4.k7('://');
    _this__u8e3s4.k7(host);
    if (!startsWith(encodedPath, _Char___init__impl__6a9atx(47))) {
      _this__u8e3s4.j5(_Char___init__impl__6a9atx(47));
    }
    _this__u8e3s4.k7(encodedPath);
  }
  function set_encodedPath(_this__u8e3s4, value) {
    _this__u8e3s4.o1v_1 = isBlank(value) ? emptyList() : value === '/' ? get_ROOT_PATH() : toMutableList(split(value, charArrayOf([_Char___init__impl__6a9atx(47)])));
  }
  function get_encodedPath(_this__u8e3s4) {
    return joinPath(_this__u8e3s4.o1v_1);
  }
  function appendMailto(_this__u8e3s4, encodedUser, host) {
    _this__u8e3s4.k7(':');
    _this__u8e3s4.k7(encodedUser);
    _this__u8e3s4.k7(host);
  }
  function joinPath(_this__u8e3s4) {
    if (_this__u8e3s4.b1())
      return '';
    if (_this__u8e3s4.n() === 1) {
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = first_0(_this__u8e3s4);
      if (charSequenceLength(this_0) === 0)
        return '/';
      return first_0(_this__u8e3s4);
    }
    return joinToString(_this__u8e3s4, '/');
  }
  function get_ROOT_PATH() {
    _init_properties_URLParser_kt__sf11to();
    return ROOT_PATH;
  }
  var ROOT_PATH;
  function takeFrom(_this__u8e3s4, urlString) {
    _init_properties_URLParser_kt__sf11to();
    if (isBlank(urlString))
      return _this__u8e3s4;
    var tmp;
    try {
      tmp = takeFromUnsafe(_this__u8e3s4, urlString);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var cause = $p;
        throw new URLParserException(urlString, cause);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function takeFromUnsafe(_this__u8e3s4, urlString) {
    _init_properties_URLParser_kt__sf11to();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.indexOfFirst' call
      var inductionVariable = 0;
      var last = charSequenceLength(urlString) - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'io.ktor.http.takeFromUnsafe.<anonymous>' call
          var it = charSequenceGet(urlString, index);
          if (!isWhitespace(it)) {
            tmp$ret$1 = index;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = -1;
    }
    var startIndex = tmp$ret$1;
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlin.text.indexOfLast' call
      var inductionVariable_0 = charSequenceLength(urlString) - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          // Inline function 'io.ktor.http.takeFromUnsafe.<anonymous>' call
          var it_0 = charSequenceGet(urlString, index_0);
          if (!isWhitespace(it_0)) {
            tmp$ret$3 = index_0;
            break $l$block_0;
          }
        }
         while (0 <= inductionVariable_0);
      tmp$ret$3 = -1;
    }
    var endIndex = tmp$ret$3 + 1 | 0;
    var schemeLength = findScheme(urlString, startIndex, endIndex);
    if (schemeLength > 0) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = startIndex;
      var endIndex_0 = startIndex + schemeLength | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var scheme = urlString.substring(startIndex_0, endIndex_0);
      _this__u8e3s4.h1v_1 = Companion_getInstance_7().x1w(scheme);
      startIndex = startIndex + (schemeLength + 1 | 0) | 0;
    }
    var slashCount = count(urlString, startIndex, endIndex, _Char___init__impl__6a9atx(47));
    startIndex = startIndex + slashCount | 0;
    if (_this__u8e3s4.h1v_1.r1v_1 === 'file') {
      parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount);
      return _this__u8e3s4;
    }
    if (_this__u8e3s4.h1v_1.r1v_1 === 'mailto') {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(slashCount === 0)) {
        // Inline function 'kotlin.require.<anonymous>' call
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      parseMailto(_this__u8e3s4, urlString, startIndex, endIndex);
      return _this__u8e3s4;
    }
    if (slashCount >= 2) {
      loop: while (true) {
        // Inline function 'kotlin.takeIf' call
        var this_0 = indexOfAny(urlString, toCharArray('@/\\?#'), startIndex);
        // Inline function 'kotlin.contracts.contract' call
        var tmp;
        // Inline function 'io.ktor.http.takeFromUnsafe.<anonymous>' call
        if (this_0 > 0) {
          tmp = this_0;
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        var delimiter = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
        if (delimiter < endIndex ? charSequenceGet(urlString, delimiter) === _Char___init__impl__6a9atx(64) : false) {
          var passwordIndex = indexOfColonInHostPort(urlString, startIndex, delimiter);
          if (!(passwordIndex === -1)) {
            var tmp_0 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_1 = startIndex;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_0.l1v_1 = urlString.substring(startIndex_1, passwordIndex);
            var tmp_1 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_2 = passwordIndex + 1 | 0;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_1.m1v_1 = urlString.substring(startIndex_2, delimiter);
          } else {
            var tmp_2 = _this__u8e3s4;
            // Inline function 'kotlin.text.substring' call
            var startIndex_3 = startIndex;
            // Inline function 'kotlin.js.asDynamic' call
            tmp_2.l1v_1 = urlString.substring(startIndex_3, delimiter);
          }
          startIndex = delimiter + 1 | 0;
        } else {
          fillHost(_this__u8e3s4, urlString, startIndex, delimiter);
          startIndex = delimiter;
          break loop;
        }
      }
    }
    if (startIndex >= endIndex) {
      _this__u8e3s4.o1v_1 = charSequenceGet(urlString, endIndex - 1 | 0) === _Char___init__impl__6a9atx(47) ? get_ROOT_PATH() : emptyList();
      return _this__u8e3s4;
    }
    var tmp_3 = _this__u8e3s4;
    var tmp_4;
    if (slashCount === 0) {
      tmp_4 = dropLast(_this__u8e3s4.o1v_1, 1);
    } else {
      tmp_4 = emptyList();
    }
    tmp_3.o1v_1 = tmp_4;
    // Inline function 'kotlin.takeIf' call
    var this_1 = indexOfAny(urlString, toCharArray('?#'), startIndex);
    // Inline function 'kotlin.contracts.contract' call
    var tmp_5;
    // Inline function 'io.ktor.http.takeFromUnsafe.<anonymous>' call
    if (this_1 > 0) {
      tmp_5 = this_1;
    } else {
      tmp_5 = null;
    }
    var tmp1_elvis_lhs = tmp_5;
    var pathEnd = tmp1_elvis_lhs == null ? endIndex : tmp1_elvis_lhs;
    if (pathEnd > startIndex) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_4 = startIndex;
      // Inline function 'kotlin.js.asDynamic' call
      var rawPath = urlString.substring(startIndex_4, pathEnd);
      var tmp_6;
      var tmp_7;
      if (_this__u8e3s4.o1v_1.n() === 1) {
        // Inline function 'kotlin.text.isEmpty' call
        var this_2 = first_0(_this__u8e3s4.o1v_1);
        tmp_7 = charSequenceLength(this_2) === 0;
      } else {
        tmp_7 = false;
      }
      if (tmp_7) {
        tmp_6 = emptyList();
      } else {
        tmp_6 = _this__u8e3s4.o1v_1;
      }
      var basePath = tmp_6;
      var rawChunks = rawPath === '/' ? get_ROOT_PATH() : split(rawPath, charArrayOf([_Char___init__impl__6a9atx(47)]));
      var relativePath = plus_0(slashCount === 1 ? get_ROOT_PATH() : emptyList(), rawChunks);
      _this__u8e3s4.o1v_1 = plus_0(basePath, relativePath);
      startIndex = pathEnd;
    }
    if (startIndex < endIndex ? charSequenceGet(urlString, startIndex) === _Char___init__impl__6a9atx(63) : false) {
      startIndex = parseQuery(_this__u8e3s4, urlString, startIndex, endIndex);
    }
    parseFragment(_this__u8e3s4, urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  function URLParserException(urlString, cause) {
    IllegalStateException_init_$Init$('Fail to parse url: ' + urlString, cause, this);
    captureStack(this, URLParserException);
  }
  function findScheme(urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var current = startIndex;
    var incorrectSchemePosition = -1;
    var firstChar = charSequenceGet(urlString, current);
    if (!(_Char___init__impl__6a9atx(97) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(122) : false) ? !(_Char___init__impl__6a9atx(65) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(90) : false) : false) {
      incorrectSchemePosition = current;
    }
    while (current < endIndex) {
      var char = charSequenceGet(urlString, current);
      if (char === _Char___init__impl__6a9atx(58)) {
        if (!(incorrectSchemePosition === -1)) {
          throw IllegalArgumentException_init_$Create$('Illegal character in scheme at position ' + incorrectSchemePosition);
        }
        return current - startIndex | 0;
      }
      if ((char === _Char___init__impl__6a9atx(47) ? true : char === _Char___init__impl__6a9atx(63)) ? true : char === _Char___init__impl__6a9atx(35))
        return -1;
      if ((((((incorrectSchemePosition === -1 ? !(_Char___init__impl__6a9atx(97) <= char ? char <= _Char___init__impl__6a9atx(122) : false) : false) ? !(_Char___init__impl__6a9atx(65) <= char ? char <= _Char___init__impl__6a9atx(90) : false) : false) ? !(_Char___init__impl__6a9atx(48) <= char ? char <= _Char___init__impl__6a9atx(57) : false) : false) ? !(char === _Char___init__impl__6a9atx(46)) : false) ? !(char === _Char___init__impl__6a9atx(43)) : false) ? !(char === _Char___init__impl__6a9atx(45)) : false) {
        incorrectSchemePosition = current;
      }
      current = current + 1 | 0;
    }
    return -1;
  }
  function count(urlString, startIndex, endIndex, char) {
    _init_properties_URLParser_kt__sf11to();
    var result = 0;
    $l$loop: while ((startIndex + result | 0) < endIndex && charSequenceGet(urlString, startIndex + result | 0) === char) {
      result = result + 1 | 0;
    }
    return result;
  }
  function parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount) {
    _init_properties_URLParser_kt__sf11to();
    switch (slashCount) {
      case 2:
        var nextSlash = indexOf(urlString, _Char___init__impl__6a9atx(47), startIndex);
        if (nextSlash === -1 ? true : nextSlash === endIndex) {
          var tmp = _this__u8e3s4;
          // Inline function 'kotlin.text.substring' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp.i1v_1 = urlString.substring(startIndex, endIndex);
          return Unit_instance;
        }

        var tmp_0 = _this__u8e3s4;
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        tmp_0.i1v_1 = urlString.substring(startIndex, nextSlash);
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        var tmp$ret$5 = urlString.substring(nextSlash, endIndex);
        set_encodedPath(_this__u8e3s4, tmp$ret$5);
        break;
      case 3:
        _this__u8e3s4.i1v_1 = '';
        // Inline function 'kotlin.text.substring' call

        // Inline function 'kotlin.js.asDynamic' call

        var tmp$ret$7 = urlString.substring(startIndex, endIndex);
        set_encodedPath(_this__u8e3s4, '/' + tmp$ret$7);
        break;
      default:
        throw IllegalArgumentException_init_$Create$('Invalid file url: ' + urlString);
    }
  }
  function parseMailto(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var delimiter = indexOf_0(urlString, '@', startIndex);
    if (delimiter === -1) {
      throw IllegalArgumentException_init_$Create$('Invalid mailto url: ' + urlString + ", it should contain '@'.");
    }
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = urlString.substring(startIndex, delimiter);
    _this__u8e3s4.q1w(decodeURLPart(tmp$ret$1));
    var tmp = _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    var startIndex_0 = delimiter + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    tmp.i1v_1 = urlString.substring(startIndex_0, endIndex);
  }
  function indexOfColonInHostPort(_this__u8e3s4, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    var skip = false;
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp1_subject = charSequenceGet(_this__u8e3s4, index);
        if (tmp1_subject === _Char___init__impl__6a9atx(91))
          skip = true;
        else if (tmp1_subject === _Char___init__impl__6a9atx(93))
          skip = false;
        else if (tmp1_subject === _Char___init__impl__6a9atx(58))
          if (!skip)
            return index;
      }
       while (inductionVariable < endIndex);
    return -1;
  }
  function fillHost(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    // Inline function 'kotlin.takeIf' call
    var this_0 = indexOfColonInHostPort(urlString, startIndex, endIndex);
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'io.ktor.http.fillHost.<anonymous>' call
    if (this_0 > 0) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    var colonIndex = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
    var tmp_0 = _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp_0.i1v_1 = urlString.substring(startIndex, colonIndex);
    if ((colonIndex + 1 | 0) < endIndex) {
      var tmp_1 = _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = colonIndex + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$5 = urlString.substring(startIndex_0, endIndex);
      tmp_1.j1v_1 = toInt(tmp$ret$5);
    } else {
      _this__u8e3s4.j1v_1 = get_DEFAULT_PORT();
    }
  }
  function parseQuery(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    if ((startIndex + 1 | 0) === endIndex) {
      _this__u8e3s4.k1v_1 = true;
      return endIndex;
    }
    // Inline function 'kotlin.takeIf' call
    var this_0 = indexOf(urlString, _Char___init__impl__6a9atx(35), startIndex + 1 | 0);
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'io.ktor.http.parseQuery.<anonymous>' call
    if (this_0 > 0) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    var fragmentStart = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
    // Inline function 'kotlin.text.substring' call
    var startIndex_0 = startIndex + 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$3 = urlString.substring(startIndex_0, fragmentStart);
    var rawParameters = parseQueryString(tmp$ret$3, VOID, VOID, false);
    rawParameters.n1i(parseQuery$lambda(_this__u8e3s4));
    return fragmentStart;
  }
  function parseFragment(_this__u8e3s4, urlString, startIndex, endIndex) {
    _init_properties_URLParser_kt__sf11to();
    if (startIndex < endIndex ? charSequenceGet(urlString, startIndex) === _Char___init__impl__6a9atx(35) : false) {
      var tmp = _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = startIndex + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      tmp.n1v_1 = urlString.substring(startIndex_0, endIndex);
    }
  }
  function parseQuery$lambda($this_parseQuery) {
    return function (key, values) {
      $this_parseQuery.p1v_1.r1i(key, values);
      return Unit_instance;
    };
  }
  var properties_initialized_URLParser_kt_hd1g6a;
  function _init_properties_URLParser_kt__sf11to() {
    if (!properties_initialized_URLParser_kt_hd1g6a) {
      properties_initialized_URLParser_kt_hd1g6a = true;
      ROOT_PATH = listOf_0('');
    }
  }
  function isWebsocket(_this__u8e3s4) {
    return _this__u8e3s4.r1v_1 === 'ws' ? true : _this__u8e3s4.r1v_1 === 'wss';
  }
  function Companion_7() {
    Companion_instance_8 = this;
    this.k1w_1 = new URLProtocol('http', 80);
    this.l1w_1 = new URLProtocol('https', 443);
    this.m1w_1 = new URLProtocol('ws', 80);
    this.n1w_1 = new URLProtocol('wss', 443);
    this.o1w_1 = new URLProtocol('socks', 1080);
    var tmp = this;
    // Inline function 'kotlin.collections.associateBy' call
    var this_0 = listOf([this.k1w_1, this.l1w_1, this.m1w_1, this.n1w_1, this.o1w_1]);
    var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
    // Inline function 'kotlin.collections.associateByTo' call
    var destination = LinkedHashMap_init_$Create$(capacity);
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.http.Companion.byName.<anonymous>' call
      var tmp$ret$0 = element.r1v_1;
      destination.c2(tmp$ret$0, element);
    }
    tmp.p1w_1 = destination;
  }
  protoOf(Companion_7).x1w = function (name) {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.Companion.createOrDefault.<anonymous>' call
    var it = toLowerCasePreservingASCIIRules(name);
    var tmp0_elvis_lhs = Companion_getInstance_7().p1w_1.m2(it);
    return tmp0_elvis_lhs == null ? new URLProtocol(it, get_DEFAULT_PORT()) : tmp0_elvis_lhs;
  };
  var Companion_instance_8;
  function Companion_getInstance_7() {
    if (Companion_instance_8 == null)
      new Companion_7();
    return Companion_instance_8;
  }
  function URLProtocol(name, defaultPort) {
    Companion_getInstance_7();
    this.r1v_1 = name;
    this.s1v_1 = defaultPort;
    // Inline function 'kotlin.require' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.all' call
      var indexedObject = this.r1v_1;
      var inductionVariable = 0;
      while (inductionVariable < charSequenceLength(indexedObject)) {
        var element = charSequenceGet(indexedObject, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'io.ktor.http.URLProtocol.<anonymous>' call
        if (!isLowerCase(element)) {
          tmp$ret$1 = false;
          break $l$block;
        }
      }
      tmp$ret$1 = true;
    }
    // Inline function 'kotlin.contracts.contract' call
    if (!tmp$ret$1) {
      // Inline function 'io.ktor.http.URLProtocol.<anonymous>' call
      var message = 'All characters should be lower case';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(URLProtocol).toString = function () {
    return 'URLProtocol(name=' + this.r1v_1 + ', defaultPort=' + this.s1v_1 + ')';
  };
  protoOf(URLProtocol).hashCode = function () {
    var result = getStringHashCode(this.r1v_1);
    result = imul(result, 31) + this.s1v_1 | 0;
    return result;
  };
  protoOf(URLProtocol).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof URLProtocol))
      return false;
    var tmp0_other_with_cast = other instanceof URLProtocol ? other : THROW_CCE();
    if (!(this.r1v_1 === tmp0_other_with_cast.r1v_1))
      return false;
    if (!(this.s1v_1 === tmp0_other_with_cast.s1v_1))
      return false;
    return true;
  };
  function isSecure(_this__u8e3s4) {
    return _this__u8e3s4.r1v_1 === 'https' ? true : _this__u8e3s4.r1v_1 === 'wss';
  }
  function takeFrom_0(_this__u8e3s4, url) {
    _this__u8e3s4.h1v_1 = url.h1v_1;
    _this__u8e3s4.i1v_1 = url.i1v_1;
    _this__u8e3s4.j1v_1 = url.j1v_1;
    _this__u8e3s4.o1v_1 = url.o1v_1;
    _this__u8e3s4.l1v_1 = url.l1v_1;
    _this__u8e3s4.m1v_1 = url.m1v_1;
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.takeFrom.<anonymous>' call
    appendAll(this_0, url.p1v_1);
    _this__u8e3s4.v1w(this_0);
    _this__u8e3s4.n1v_1 = url.n1v_1;
    _this__u8e3s4.k1v_1 = url.k1v_1;
    return _this__u8e3s4;
  }
  function Url(urlString) {
    return URLBuilder_0(urlString).z15();
  }
  function appendUrlFullPath(_this__u8e3s4, encodedPath, encodedQueryParameters, trailingQuery) {
    var tmp;
    // Inline function 'kotlin.text.isNotBlank' call
    if (!isBlank(encodedPath)) {
      tmp = !startsWith_0(encodedPath, '/');
    } else {
      tmp = false;
    }
    if (tmp) {
      _this__u8e3s4.j5(_Char___init__impl__6a9atx(47));
    }
    _this__u8e3s4.k7(encodedPath);
    if (!encodedQueryParameters.b1() ? true : trailingQuery) {
      _this__u8e3s4.k7('?');
    }
    // Inline function 'kotlin.collections.flatMap' call
    // Inline function 'kotlin.collections.flatMapTo' call
    var this_0 = encodedQueryParameters.m1i();
    var destination = ArrayList_init_$Create$_0();
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.http.appendUrlFullPath.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var value = element.f2();
      var tmp_0;
      if (value.b1()) {
        tmp_0 = listOf_0(to(key, null));
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(value, 10));
        var tmp0_iterator_0 = value.u();
        while (tmp0_iterator_0.v()) {
          var item = tmp0_iterator_0.w();
          // Inline function 'io.ktor.http.appendUrlFullPath.<anonymous>.<anonymous>' call
          var tmp$ret$3 = to(key, item);
          destination_0.r(tmp$ret$3);
        }
        tmp_0 = destination_0;
      }
      var list = tmp_0;
      addAll(destination, list);
    }
    var tmp_1 = destination;
    joinTo(tmp_1, _this__u8e3s4, '&', VOID, VOID, VOID, VOID, appendUrlFullPath$lambda);
  }
  function appendUserAndPassword(_this__u8e3s4, encodedUser, encodedPassword) {
    if (encodedUser == null) {
      return Unit_instance;
    }
    _this__u8e3s4.i5(encodedUser);
    if (!(encodedPassword == null)) {
      _this__u8e3s4.j5(_Char___init__impl__6a9atx(58));
      _this__u8e3s4.i5(encodedPassword);
    }
    _this__u8e3s4.i5('@');
  }
  function get_hostWithPort(_this__u8e3s4) {
    return _this__u8e3s4.u1v_1 + ':' + _this__u8e3s4.y1w();
  }
  function URLBuilder_0(urlString) {
    return takeFrom(new URLBuilder(), urlString);
  }
  function appendUrlFullPath$lambda(it) {
    var key = it.mc_1;
    var tmp;
    if (it.nc_1 == null) {
      tmp = key;
    } else {
      var value = toString_1(it.nc_1);
      tmp = key + '=' + value;
    }
    return tmp;
  }
  function Companion_8() {
  }
  var Companion_instance_9;
  function Companion_getInstance_8() {
    return Companion_instance_9;
  }
  function Url$encodedPath$delegate$lambda(this$0) {
    return function () {
      var tmp;
      if (this$0.w1v_1.b1()) {
        return '';
      }
      var pathStartIndex = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(47), this$0.t1v_1.r1v_1.length + 3 | 0);
      var tmp_0;
      if (pathStartIndex === -1) {
        return '';
      }
      // Inline function 'kotlin.charArrayOf' call
      var tmp$ret$0 = charArrayOf([_Char___init__impl__6a9atx(63), _Char___init__impl__6a9atx(35)]);
      var pathEndIndex = indexOfAny(this$0.c1w_1, tmp$ret$0, pathStartIndex);
      var tmp_1;
      if (pathEndIndex === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.c1w_1.substring(pathStartIndex);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(pathStartIndex, pathEndIndex);
    };
  }
  function Url$encodedQuery$delegate$lambda(this$0) {
    return function () {
      var queryStart = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(63)) + 1 | 0;
      var tmp;
      if (queryStart === 0) {
        return '';
      }
      var queryEnd = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(35), queryStart);
      var tmp_0;
      if (queryEnd === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.c1w_1.substring(queryStart);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(queryStart, queryEnd);
    };
  }
  function Url$encodedPathAndQuery$delegate$lambda(this$0) {
    return function () {
      var pathStart = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(47), this$0.t1v_1.r1v_1.length + 3 | 0);
      var tmp;
      if (pathStart === -1) {
        return '';
      }
      var queryEnd = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(35), pathStart);
      var tmp_0;
      if (queryEnd === -1) {
        // Inline function 'kotlin.text.substring' call
        // Inline function 'kotlin.js.asDynamic' call
        return this$0.c1w_1.substring(pathStart);
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(pathStart, queryEnd);
    };
  }
  function Url$encodedUser$delegate$lambda(this$0) {
    return function () {
      var tmp;
      if (this$0.z1v_1 == null) {
        return null;
      }
      var tmp_0;
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = this$0.z1v_1;
      if (charSequenceLength(this_0) === 0) {
        return '';
      }
      var usernameStart = this$0.t1v_1.r1v_1.length + 3 | 0;
      // Inline function 'kotlin.charArrayOf' call
      var tmp$ret$1 = charArrayOf([_Char___init__impl__6a9atx(58), _Char___init__impl__6a9atx(64)]);
      var usernameEnd = indexOfAny(this$0.c1w_1, tmp$ret$1, usernameStart);
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(usernameStart, usernameEnd);
    };
  }
  function Url$encodedPassword$delegate$lambda(this$0) {
    return function () {
      var tmp;
      if (this$0.a1w_1 == null) {
        return null;
      }
      var tmp_0;
      // Inline function 'kotlin.text.isEmpty' call
      var this_0 = this$0.a1w_1;
      if (charSequenceLength(this_0) === 0) {
        return '';
      }
      var passwordStart = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(58), this$0.t1v_1.r1v_1.length + 3 | 0) + 1 | 0;
      var passwordEnd = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(64));
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(passwordStart, passwordEnd);
    };
  }
  function Url$encodedFragment$delegate$lambda(this$0) {
    return function () {
      var fragmentStart = indexOf(this$0.c1w_1, _Char___init__impl__6a9atx(35)) + 1 | 0;
      var tmp;
      if (fragmentStart === 0) {
        return '';
      }
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      return this$0.c1w_1.substring(fragmentStart);
    };
  }
  function Url_0(protocol, host, specifiedPort, pathSegments, parameters, fragment, user, password, trailingQuery, urlString) {
    this.t1v_1 = protocol;
    this.u1v_1 = host;
    this.v1v_1 = specifiedPort;
    this.w1v_1 = pathSegments;
    this.x1v_1 = parameters;
    this.y1v_1 = fragment;
    this.z1v_1 = user;
    this.a1w_1 = password;
    this.b1w_1 = trailingQuery;
    this.c1w_1 = urlString;
    // Inline function 'kotlin.require' call
    var tmp;
    var containsArg = this.v1v_1;
    if (0 <= containsArg ? containsArg <= 65535 : false) {
      tmp = true;
    } else {
      tmp = this.v1v_1 === get_DEFAULT_PORT();
    }
    // Inline function 'kotlin.contracts.contract' call
    if (!tmp) {
      // Inline function 'io.ktor.http.Url.<anonymous>' call
      var message = 'port must be between 0 and 65535, or ' + get_DEFAULT_PORT() + ' if not set';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp_0 = this;
    tmp_0.d1w_1 = lazy_0(Url$encodedPath$delegate$lambda(this));
    var tmp_1 = this;
    tmp_1.e1w_1 = lazy_0(Url$encodedQuery$delegate$lambda(this));
    var tmp_2 = this;
    tmp_2.f1w_1 = lazy_0(Url$encodedPathAndQuery$delegate$lambda(this));
    var tmp_3 = this;
    tmp_3.g1w_1 = lazy_0(Url$encodedUser$delegate$lambda(this));
    var tmp_4 = this;
    tmp_4.h1w_1 = lazy_0(Url$encodedPassword$delegate$lambda(this));
    var tmp_5 = this;
    tmp_5.i1w_1 = lazy_0(Url$encodedFragment$delegate$lambda(this));
  }
  protoOf(Url_0).y1w = function () {
    // Inline function 'kotlin.takeUnless' call
    var this_0 = this.v1v_1;
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'io.ktor.http.Url.<get-port>.<anonymous>' call
    if (!(this_0 === get_DEFAULT_PORT())) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    return tmp0_elvis_lhs == null ? this.t1v_1.s1v_1 : tmp0_elvis_lhs;
  };
  protoOf(Url_0).z1w = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.g1w_1;
    encodedUser$factory();
    return this_0.f2();
  };
  protoOf(Url_0).a1x = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.h1w_1;
    encodedPassword$factory();
    return this_0.f2();
  };
  protoOf(Url_0).toString = function () {
    return this.c1w_1;
  };
  protoOf(Url_0).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof Url_0))
      THROW_CCE();
    if (!(this.c1w_1 === other.c1w_1))
      return false;
    return true;
  };
  protoOf(Url_0).hashCode = function () {
    return getStringHashCode(this.c1w_1);
  };
  function get_authority_0(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.<get-authority>.<anonymous>' call
    this_0.i5(get_encodedUserAndPassword_0(_this__u8e3s4));
    if (_this__u8e3s4.v1v_1 === get_DEFAULT_PORT() ? true : _this__u8e3s4.v1v_1 === _this__u8e3s4.t1v_1.s1v_1) {
      this_0.i5(_this__u8e3s4.u1v_1);
    } else {
      this_0.i5(get_hostWithPort(_this__u8e3s4));
    }
    return this_0.toString();
  }
  function get_encodedUserAndPassword_0(_this__u8e3s4) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.<get-encodedUserAndPassword>.<anonymous>' call
    appendUserAndPassword(this_0, _this__u8e3s4.z1w(), _this__u8e3s4.a1x());
    return this_0.toString();
  }
  function encodedUser$factory() {
    return getPropertyCallableRef('encodedUser', 1, KProperty1, function (receiver) {
      return receiver.z1w();
    }, null);
  }
  function encodedPassword$factory() {
    return getPropertyCallableRef('encodedPassword', 1, KProperty1, function (receiver) {
      return receiver.a1x();
    }, null);
  }
  function UrlDecodedParametersBuilder(encodedParametersBuilder) {
    this.b1x_1 = encodedParametersBuilder;
    this.c1x_1 = this.b1x_1.j1i();
  }
  protoOf(UrlDecodedParametersBuilder).z15 = function () {
    return decodeParameters(this.b1x_1);
  };
  protoOf(UrlDecodedParametersBuilder).j1i = function () {
    return this.c1x_1;
  };
  protoOf(UrlDecodedParametersBuilder).k1i = function (name) {
    var tmp0_safe_receiver = this.b1x_1.k1i(encodeURLParameter(name));
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(tmp0_safe_receiver, 10));
      var tmp0_iterator = tmp0_safe_receiver.u();
      while (tmp0_iterator.v()) {
        var item = tmp0_iterator.w();
        // Inline function 'io.ktor.http.UrlDecodedParametersBuilder.getAll.<anonymous>' call
        var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
        destination.r(tmp$ret$0);
      }
      tmp = destination;
    }
    return tmp;
  };
  protoOf(UrlDecodedParametersBuilder).l1i = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.b1x_1.l1i();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.http.UrlDecodedParametersBuilder.names.<anonymous>' call
      var tmp$ret$0 = decodeURLQueryComponent(item);
      destination.r(tmp$ret$0);
    }
    return toSet(destination);
  };
  protoOf(UrlDecodedParametersBuilder).b1 = function () {
    return this.b1x_1.b1();
  };
  protoOf(UrlDecodedParametersBuilder).m1i = function () {
    return decodeParameters(this.b1x_1).m1i();
  };
  protoOf(UrlDecodedParametersBuilder).u1i = function (name, value) {
    return this.b1x_1.u1i(encodeURLParameter(name), encodeURLParameterValue(value));
  };
  protoOf(UrlDecodedParametersBuilder).r1i = function (name, values) {
    var tmp = encodeURLParameter(name);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
    var tmp0_iterator = values.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'io.ktor.http.UrlDecodedParametersBuilder.appendAll.<anonymous>' call
      var tmp$ret$0 = encodeURLParameterValue(item);
      destination.r(tmp$ret$0);
    }
    return this.b1x_1.r1i(tmp, destination);
  };
  protoOf(UrlDecodedParametersBuilder).x = function () {
    return this.b1x_1.x();
  };
  function encodeParameters(parameters) {
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.encodeParameters.<anonymous>' call
    appendAllEncoded(this_0, parameters);
    return this_0;
  }
  function decodeParameters(parameters) {
    // Inline function 'kotlin.apply' call
    var this_0 = ParametersBuilder();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'io.ktor.http.decodeParameters.<anonymous>' call
    appendAllDecoded(this_0, parameters);
    return this_0.z15();
  }
  function appendAllEncoded(_this__u8e3s4, parameters) {
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = parameters.l1i().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.http.appendAllEncoded.<anonymous>' call
      var tmp0_elvis_lhs = parameters.k1i(element);
      var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      var tmp = encodeURLParameter(element);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
      var tmp0_iterator_0 = values.u();
      while (tmp0_iterator_0.v()) {
        var item = tmp0_iterator_0.w();
        // Inline function 'io.ktor.http.appendAllEncoded.<anonymous>.<anonymous>' call
        var tmp$ret$0 = encodeURLParameterValue(item);
        destination.r(tmp$ret$0);
      }
      _this__u8e3s4.r1i(tmp, destination);
    }
  }
  function appendAllDecoded(_this__u8e3s4, parameters) {
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = parameters.l1i().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'io.ktor.http.appendAllDecoded.<anonymous>' call
      var tmp0_elvis_lhs = parameters.k1i(element);
      var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      var tmp = decodeURLQueryComponent(element);
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(values, 10));
      var tmp0_iterator_0 = values.u();
      while (tmp0_iterator_0.v()) {
        var item = tmp0_iterator_0.w();
        // Inline function 'io.ktor.http.appendAllDecoded.<anonymous>.<anonymous>' call
        var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
        destination.r(tmp$ret$0);
      }
      _this__u8e3s4.r1i(tmp, destination);
    }
  }
  function ByteArrayContent(bytes, contentType, status) {
    contentType = contentType === VOID ? null : contentType;
    status = status === VOID ? null : status;
    ByteArrayContent_0.call(this);
    this.e1x_1 = bytes;
    this.f1x_1 = contentType;
    this.g1x_1 = status;
  }
  protoOf(ByteArrayContent).h1x = function () {
    return this.f1x_1;
  };
  protoOf(ByteArrayContent).i1x = function () {
    return toLong_0(this.e1x_1.length);
  };
  protoOf(ByteArrayContent).j1x = function () {
    return this.e1x_1;
  };
  function NoContent() {
    OutgoingContent.call(this);
  }
  function ReadChannelContent() {
    OutgoingContent.call(this);
  }
  function WriteChannelContent() {
  }
  function ByteArrayContent_0() {
    OutgoingContent.call(this);
  }
  function ProtocolUpgrade() {
  }
  function OutgoingContent() {
    this.k1x_1 = null;
  }
  protoOf(OutgoingContent).h1x = function () {
    return null;
  };
  protoOf(OutgoingContent).i1x = function () {
    return null;
  };
  protoOf(OutgoingContent).g1s = function () {
    return Companion_getInstance_1().a1o_1;
  };
  function NullBody() {
  }
  var NullBody_instance;
  function NullBody_getInstance() {
    return NullBody_instance;
  }
  function TextContent(text, contentType, status) {
    status = status === VOID ? null : status;
    ByteArrayContent_0.call(this);
    this.r1x_1 = text;
    this.s1x_1 = contentType;
    this.t1x_1 = status;
    var tmp = this;
    var tmp$ret$0;
    $l$block: {
      // Inline function 'io.ktor.utils.io.core.toByteArray' call
      var this_0 = this.r1x_1;
      var tmp0_elvis_lhs = charset(this.s1x_1);
      var charset_0 = tmp0_elvis_lhs == null ? Charsets_getInstance().w1c_1 : tmp0_elvis_lhs;
      if (charset_0.equals(Charsets_getInstance().w1c_1)) {
        tmp$ret$0 = encodeToByteArray(this_0);
        break $l$block;
      }
      tmp$ret$0 = encodeToByteArray_0(charset_0.a1d(), this_0, 0, this_0.length);
    }
    tmp.u1x_1 = tmp$ret$0;
  }
  protoOf(TextContent).h1x = function () {
    return this.s1x_1;
  };
  protoOf(TextContent).i1x = function () {
    return toLong_0(this.u1x_1.length);
  };
  protoOf(TextContent).j1x = function () {
    return this.u1x_1;
  };
  protoOf(TextContent).toString = function () {
    return 'TextContent[' + this.s1x_1 + '] "' + take(this.r1x_1, 30) + '"';
  };
  function get_origin(_this__u8e3s4) {
    var tmp;
    if (get_platform(PlatformUtils_getInstance()).e8_1 === 2) {
      var tmp_0 = function () {
        var origin = '';
        if (typeof window !== 'undefined') {
          origin = window.location.origin;
        } else {
          origin = self.location.origin;
        }
        return origin && origin != 'null' ? origin : 'http://localhost';
      }();
      tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'string' : false) ? tmp_0 : THROW_CCE();
    } else {
      tmp = 'http://localhost';
    }
    return tmp;
  }
  //region block: post-declaration
  protoOf(EmptyHeaders).k1h = get;
  protoOf(EmptyHeaders).n1i = forEach;
  protoOf(EmptyParameters).n1i = forEach;
  //endregion
  //region block: init
  Companion_instance_1 = new Companion_0();
  EmptyHeaders_instance = new EmptyHeaders();
  EmptyParameters_instance = new EmptyParameters();
  DEFAULT_PORT = 0;
  Companion_instance_9 = new Companion_8();
  NullBody_instance = new NullBody();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = NullBody_instance;
  _.$_$.b = Application_getInstance;
  _.$_$.c = Text_getInstance;
  _.$_$.d = Companion_getInstance_1;
  _.$_$.e = HttpHeaders_getInstance;
  _.$_$.f = Companion_getInstance_2;
  _.$_$.g = Companion_getInstance_3;
  _.$_$.h = Companion_getInstance_4;
  _.$_$.i = ByteArrayContent;
  _.$_$.j = ByteArrayContent_0;
  _.$_$.k = NoContent;
  _.$_$.l = ProtocolUpgrade;
  _.$_$.m = ReadChannelContent;
  _.$_$.n = WriteChannelContent;
  _.$_$.o = OutgoingContent;
  _.$_$.p = TextContent;
  _.$_$.q = HeadersBuilder;
  _.$_$.r = HttpStatusCode;
  _.$_$.s = URLBuilder;
  _.$_$.t = UnsafeHeaderException;
  _.$_$.u = get_authority;
  _.$_$.v = get_authority_0;
  _.$_$.w = charset_0;
  _.$_$.x = charset;
  _.$_$.y = contentLength;
  _.$_$.z = contentType;
  _.$_$.a1 = contentType_0;
  _.$_$.b1 = isSecure;
  _.$_$.c1 = isWebsocket;
  _.$_$.d1 = parseAndSortHeader;
  _.$_$.e1 = takeFrom_0;
  _.$_$.f1 = takeFrom;
  _.$_$.g1 = withCharsetIfNeeded;
  _.$_$.h1 = withCharset;
  //endregion
  return _;
}));

//# sourceMappingURL=ktor-ktor-http.js.map
