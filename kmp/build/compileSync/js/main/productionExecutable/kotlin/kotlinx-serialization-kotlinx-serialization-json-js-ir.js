(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core-js-ir.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core-js-ir.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json-js-ir'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core-js-ir' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core-js-ir' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json-js-ir'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json-js-ir'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json-js-ir'.");
    }
    root['kotlinx-serialization-kotlinx-serialization-json-js-ir'] = factory(typeof this['kotlinx-serialization-kotlinx-serialization-json-js-ir'] === 'undefined' ? {} : this['kotlinx-serialization-kotlinx-serialization-json-js-ir'], this['kotlinx-serialization-kotlinx-serialization-core-js-ir'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var protoOf = kotlin_kotlin.$_$.r9;
  var objectMeta = kotlin_kotlin.$_$.q9;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var StringFormat = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var classMeta = kotlin_kotlin.$_$.o8;
  var VOID = kotlin_kotlin.$_$.f;
  var toString = kotlin_kotlin.$_$.w9;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.l1;
  var charSequenceLength = kotlin_kotlin.$_$.m8;
  var charSequenceGet = kotlin_kotlin.$_$.l8;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.d2;
  var equals = kotlin_kotlin.$_$.r8;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.c1;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var hashCode = kotlin_kotlin.$_$.x8;
  var joinToString = kotlin_kotlin.$_$.f6;
  var Map = kotlin_kotlin.$_$.a5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.h;
  var lazy = kotlin_kotlin.$_$.hd;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var getBooleanHashCode = kotlin_kotlin.$_$.u8;
  var getStringHashCode = kotlin_kotlin.$_$.w8;
  var List = kotlin_kotlin.$_$.y4;
  var toInt = kotlin_kotlin.$_$.mb;
  var toLong = kotlin_kotlin.$_$.ob;
  var toDouble = kotlin_kotlin.$_$.kb;
  var toLongOrNull = kotlin_kotlin.$_$.nb;
  var toDoubleOrNull = kotlin_kotlin.$_$.jb;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.h4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var toULongOrNull = kotlin_kotlin.$_$.rb;
  var ULong = kotlin_kotlin.$_$.tc;
  var Companion_getInstance = kotlin_kotlin.$_$.p4;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.i3;
  var isInterface = kotlin_kotlin.$_$.h9;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p1;
  var lazy_0 = kotlin_kotlin.$_$.id;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var KProperty1 = kotlin_kotlin.$_$.ga;
  var getPropertyCallableRef = kotlin_kotlin.$_$.v8;
  var Encoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var toLong_0 = kotlin_kotlin.$_$.u9;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.y2;
  var UInt__toString_impl_dbgl21 = kotlin_kotlin.$_$.a3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.h3;
  var ULong__toString_impl_f9au7k = kotlin_kotlin.$_$.j3;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.p2;
  var UByte__toString_impl_v72jg = kotlin_kotlin.$_$.r2;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.q3;
  var UShort__toString_impl_edaoee = kotlin_kotlin.$_$.s3;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var captureStack = kotlin_kotlin.$_$.i8;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var charSequenceSubSequence = kotlin_kotlin.$_$.n8;
  var coerceAtLeast = kotlin_kotlin.$_$.y9;
  var coerceAtMost = kotlin_kotlin.$_$.aa;
  var Companion_instance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.t;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.k;
  var singleOrNull = kotlin_kotlin.$_$.a7;
  var emptyMap = kotlin_kotlin.$_$.w5;
  var getValue = kotlin_kotlin.$_$.c6;
  var fillArrayVal = kotlin_kotlin.$_$.t8;
  var copyOf = kotlin_kotlin.$_$.r5;
  var copyOf_0 = kotlin_kotlin.$_$.s5;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.ac;
  var invoke = kotlin_kotlin.$_$.dd;
  var CoroutineImpl = kotlin_kotlin.$_$.d8;
  var DeepRecursiveScope = kotlin_kotlin.$_$.bc;
  var Unit = kotlin_kotlin.$_$.wc;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.p7;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var getKClass = kotlin_kotlin.$_$.e;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var SealedClassSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var ensureNotNull = kotlin_kotlin.$_$.cd;
  var contains = kotlin_kotlin.$_$.ja;
  var plus = kotlin_kotlin.$_$.kd;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var IllegalArgumentException = kotlin_kotlin.$_$.fc;
  var isFinite = kotlin_kotlin.$_$.fd;
  var isFinite_0 = kotlin_kotlin.$_$.ed;
  var toUInt = kotlin_kotlin.$_$.qb;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.z2;
  var toULong = kotlin_kotlin.$_$.sb;
  var toUByte = kotlin_kotlin.$_$.pb;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.q2;
  var toUShort = kotlin_kotlin.$_$.tb;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.r3;
  var objectCreate = kotlin_kotlin.$_$.p9;
  var AbstractEncoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var toString_0 = kotlin_kotlin.$_$.k2;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.o4;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.n4;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.q4;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var setOf = kotlin_kotlin.$_$.z6;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.j2;
  var numberToChar = kotlin_kotlin.$_$.n9;
  var equals_0 = kotlin_kotlin.$_$.oa;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.j1;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var toByte = kotlin_kotlin.$_$.t9;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.g4;
  var toShort = kotlin_kotlin.$_$.v9;
  var single = kotlin_kotlin.$_$.db;
  var Char = kotlin_kotlin.$_$.yb;
  var emptySet = kotlin_kotlin.$_$.x5;
  var plus_0 = kotlin_kotlin.$_$.r6;
  var toList = kotlin_kotlin.$_$.f7;
  var Enum = kotlin_kotlin.$_$.cc;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var last = kotlin_kotlin.$_$.l6;
  var removeLast = kotlin_kotlin.$_$.w6;
  var lastIndexOf = kotlin_kotlin.$_$.ab;
  var Long = kotlin_kotlin.$_$.hc;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.f2;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.l4;
  var charArray = kotlin_kotlin.$_$.k8;
  var indexOf = kotlin_kotlin.$_$.sa;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.b1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.m;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Json, 'Json', classMeta, VOID, [StringFormat]);
  setMetadataFor(Default, 'Default', objectMeta, Json);
  setMetadataFor(JsonBuilder, 'JsonBuilder', classMeta);
  setMetadataFor(JsonImpl, 'JsonImpl', classMeta, Json);
  setMetadataFor(JsonClassDiscriminator, 'JsonClassDiscriminator', classMeta);
  setMetadataFor(JsonNames, 'JsonNames', classMeta);
  setMetadataFor(JsonConfiguration, 'JsonConfiguration', classMeta);
  setMetadataFor(JsonDecoder, 'JsonDecoder', interfaceMeta, VOID, [Decoder, CompositeDecoder]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(JsonElement, 'JsonElement', classMeta, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(JsonObject, 'JsonObject', classMeta, JsonElement, [JsonElement, Map], VOID, VOID, {0: JsonObjectSerializer_getInstance});
  setMetadataFor(JsonPrimitive, 'JsonPrimitive', classMeta, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
  setMetadataFor(JsonNull, 'JsonNull', objectMeta, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNull_getInstance});
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(JsonLiteral, 'JsonLiteral', classMeta, JsonPrimitive);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(JsonArray, 'JsonArray', classMeta, JsonElement, [JsonElement, List], VOID, VOID, {0: JsonArraySerializer_getInstance});
  setMetadataFor(JsonElementSerializer, 'JsonElementSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonObjectDescriptor, 'JsonObjectDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonObjectSerializer, 'JsonObjectSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonArrayDescriptor, 'JsonArrayDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonArraySerializer, 'JsonArraySerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonNullSerializer, 'JsonNullSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonLiteralSerializer, 'JsonLiteralSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(defer$1, VOID, classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonEncoder, 'JsonEncoder', interfaceMeta, VOID, [Encoder]);
  setMetadataFor(Composer, 'Composer', classMeta);
  setMetadataFor(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', classMeta, Composer);
  setMetadataFor(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', classMeta, Composer);
  setMetadataFor(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', classMeta, Composer);
  setMetadataFor(JsonElementMarker, 'JsonElementMarker', classMeta);
  setMetadataFor(JsonException, 'JsonException', classMeta, SerializationException);
  setMetadataFor(JsonEncodingException, 'JsonEncodingException', classMeta, JsonException);
  setMetadataFor(JsonDecodingException, 'JsonDecodingException', classMeta, JsonException);
  setMetadataFor(Tombstone, 'Tombstone', objectMeta);
  setMetadataFor(JsonPath, 'JsonPath', classMeta, VOID, VOID, JsonPath);
  setMetadataFor(JsonTreeReader$readDeepRecursive$slambda, 'JsonTreeReader$readDeepRecursive$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor($readObjectCOROUTINE$0, '$readObjectCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(JsonTreeReader, 'JsonTreeReader', classMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(PolymorphismValidator, 'PolymorphismValidator', classMeta, VOID, [SerializersModuleCollector]);
  setMetadataFor(Key, 'Key', classMeta, VOID, VOID, Key);
  setMetadataFor(DescriptorSchemaCache, 'DescriptorSchemaCache', classMeta, VOID, VOID, DescriptorSchemaCache);
  setMetadataFor(DiscriminatorHolder, 'DiscriminatorHolder', classMeta);
  setMetadataFor(StreamingJsonDecoder, 'StreamingJsonDecoder', classMeta, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
  setMetadataFor(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', classMeta, AbstractDecoder);
  setMetadataFor(StreamingJsonEncoder, 'StreamingJsonEncoder', classMeta, AbstractEncoder, [JsonEncoder, AbstractEncoder]);
  setMetadataFor(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', classMeta, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
  setMetadataFor(JsonTreeDecoder, 'JsonTreeDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonTreeListDecoder, 'JsonTreeListDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonTreeMapDecoder, 'JsonTreeMapDecoder', classMeta, JsonTreeDecoder);
  setMetadataFor(WriteMode, 'WriteMode', classMeta, Enum);
  setMetadataFor(AbstractJsonLexer, 'AbstractJsonLexer', classMeta);
  setMetadataFor(CharMappings, 'CharMappings', objectMeta);
  setMetadataFor(StringJsonLexer, 'StringJsonLexer', classMeta, AbstractJsonLexer);
  setMetadataFor(JsonToStringWriter, 'JsonToStringWriter', classMeta, VOID, VOID, JsonToStringWriter);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.b3q_1 = configuration;
    this.c3q_1 = serializersModule;
    this.d3q_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).z35 = function () {
    return this.c3q_1;
  };
  protoOf(Json).f33 = function (serializer, value) {
    var result = new JsonToStringWriter();
    try {
      encodeByWriter(this, result, serializer, value);
      return result.toString();
    }finally {
      result.un();
    }
  };
  protoOf(Json).g33 = function (deserializer, string) {
    var lexer = new StringJsonLexer(string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.m32(), null);
    var result = input.k35(deserializer);
    lexer.r3q();
    return result;
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.z15();
    return new JsonImpl(conf, builder.f3r_1);
  }
  function JsonBuilder(json) {
    this.s3q_1 = json.b3q_1.g3r_1;
    this.t3q_1 = json.b3q_1.l3r_1;
    this.u3q_1 = json.b3q_1.h3r_1;
    this.v3q_1 = json.b3q_1.i3r_1;
    this.w3q_1 = json.b3q_1.j3r_1;
    this.x3q_1 = json.b3q_1.k3r_1;
    this.y3q_1 = json.b3q_1.m3r_1;
    this.z3q_1 = json.b3q_1.n3r_1;
    this.a3r_1 = json.b3q_1.o3r_1;
    this.b3r_1 = json.b3q_1.p3r_1;
    this.c3r_1 = json.b3q_1.q3r_1;
    this.d3r_1 = json.b3q_1.r3r_1;
    this.e3r_1 = json.b3q_1.s3r_1;
    this.f3r_1 = json.z35();
  }
  protoOf(JsonBuilder).z15 = function () {
    if (this.a3r_1) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this.b3r_1 === 'type')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
    if (!this.x3q_1) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this.y3q_1 === '    ')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_0 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    } else if (!(this.y3q_1 === '    ')) {
      var tmp$ret$3;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var indexedObject = this.y3q_1;
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(indexedObject)) {
          var element = charSequenceGet(indexedObject, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
          if (!(((element === _Char___init__impl__6a9atx(32) ? true : element === _Char___init__impl__6a9atx(9)) ? true : element === _Char___init__impl__6a9atx(13)) ? true : element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$3 = false;
            break $l$block;
          }
        }
        tmp$ret$3 = true;
      }
      var allWhitespaces = tmp$ret$3;
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!allWhitespaces) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_1 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.y3q_1;
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    }
    return new JsonConfiguration(this.s3q_1, this.u3q_1, this.v3q_1, this.w3q_1, this.x3q_1, this.t3q_1, this.y3q_1, this.z3q_1, this.a3r_1, this.b3r_1, this.c3r_1, this.d3r_1, this.e3r_1);
  };
  function validateConfiguration($this) {
    if (equals($this.z35(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.b3q_1.o3r_1, $this.b3q_1.p3r_1);
    $this.z35().p3k(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    this.g3r_1 = encodeDefaults;
    this.h3r_1 = ignoreUnknownKeys;
    this.i3r_1 = isLenient;
    this.j3r_1 = allowStructuredMapKeys;
    this.k3r_1 = prettyPrint;
    this.l3r_1 = explicitNulls;
    this.m3r_1 = prettyPrintIndent;
    this.n3r_1 = coerceInputValues;
    this.o3r_1 = useArrayPolymorphism;
    this.p3r_1 = classDiscriminator;
    this.q3r_1 = allowSpecialFloatingPointValues;
    this.r3r_1 = useAlternativeNames;
    this.s3r_1 = namingStrategy;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.g3r_1 + ', ignoreUnknownKeys=' + this.h3r_1 + ', isLenient=' + this.i3r_1 + ', ' + ('allowStructuredMapKeys=' + this.j3r_1 + ', prettyPrint=' + this.k3r_1 + ', explicitNulls=' + this.l3r_1 + ', ') + ("prettyPrintIndent='" + this.m3r_1 + "', coerceInputValues=" + this.n3r_1 + ', useArrayPolymorphism=' + this.o3r_1 + ', ') + ("classDiscriminator='" + this.p3r_1 + "', allowSpecialFloatingPointValues=" + this.q3r_1 + ', useAlternativeNames=' + this.r3r_1 + ', ') + ('namingStrategy=' + this.s3r_1 + ')');
  };
  function JsonDecoder() {
  }
  function get_jsonUnquotedLiteralDescriptor() {
    _init_properties_JsonElement_kt__7cbdc2();
    return jsonUnquotedLiteralDescriptor;
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonElement() {
  }
  function Companion_0() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonObject$toString$lambda(_name_for_destructuring_parameter_0__wldtmu) {
    // Inline function 'kotlin.collections.component1' call
    var k = _name_for_destructuring_parameter_0__wldtmu.e2();
    // Inline function 'kotlin.collections.component2' call
    var v = _name_for_destructuring_parameter_0__wldtmu.f2();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.JsonObject.toString.<anonymous>.<anonymous>' call
    printQuoted(this_0, k);
    this_0.j5(_Char___init__impl__6a9atx(58));
    this_0.h5(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.v3r_1 = content;
  }
  protoOf(JsonObject).b2 = function () {
    return this.v3r_1.b2();
  };
  protoOf(JsonObject).z1 = function () {
    return this.v3r_1.z1();
  };
  protoOf(JsonObject).n = function () {
    return this.v3r_1.n();
  };
  protoOf(JsonObject).a2 = function () {
    return this.v3r_1.a2();
  };
  protoOf(JsonObject).j1h = function (key) {
    return this.v3r_1.j2(key);
  };
  protoOf(JsonObject).j2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.j1h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).k1h = function (key) {
    return this.v3r_1.m2(key);
  };
  protoOf(JsonObject).m2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.k1h((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).b1 = function () {
    return this.v3r_1.b1();
  };
  protoOf(JsonObject).equals = function (other) {
    return equals(this.v3r_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.v3r_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.v3r_1.b2();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  function _get_$cachedSerializer__te6jhj($this) {
    return $this.x3r_1.f2();
  }
  function JsonNull$_anonymous__enib48() {
    return JsonNullSerializer_getInstance();
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.w3r_1 = 'null';
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.x3r_1 = lazy(tmp_0, JsonNull$_anonymous__enib48);
  }
  protoOf(JsonNull).c26 = function () {
    return this.w3r_1;
  };
  protoOf(JsonNull).y3r = function () {
    return _get_$cachedSerializer__te6jhj(this);
  };
  protoOf(JsonNull).y3c = function (typeParamsSerializers) {
    return this.y3r();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function Companion_1() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.c26();
  };
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.z3r_1 = isString;
    this.a3s_1 = coerceToInlineType;
    this.b3s_1 = toString(body);
    if (!(this.a3s_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!this.a3s_1.v33()) {
        // Inline function 'kotlin.require.<anonymous>' call
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).c26 = function () {
    return this.b3s_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.z3r_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.JsonLiteral.toString.<anonymous>' call
      printQuoted(this_0, this.b3s_1);
      tmp = this_0.toString();
    } else {
      tmp = this.b3s_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.z3r_1 === other.z3r_1))
      return false;
    if (!(this.b3s_1 === other.b3s_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.z3r_1);
    result = imul(31, result) + getStringHashCode(this.b3s_1) | 0;
    return result;
  };
  function Companion_2() {
  }
  var Companion_instance_3;
  function Companion_getInstance_7() {
    return Companion_instance_3;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.c3s_1 = content;
  }
  protoOf(JsonArray).n = function () {
    return this.c3s_1.n();
  };
  protoOf(JsonArray).d3s = function (element) {
    return this.c3s_1.z(element);
  };
  protoOf(JsonArray).z = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.d3s(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).e3s = function (elements) {
    return this.c3s_1.a1(elements);
  };
  protoOf(JsonArray).a1 = function (elements) {
    return this.e3s(elements);
  };
  protoOf(JsonArray).f1 = function (index) {
    return this.c3s_1.f1(index);
  };
  protoOf(JsonArray).b1 = function () {
    return this.c3s_1.b1();
  };
  protoOf(JsonArray).u = function () {
    return this.c3s_1.u();
  };
  protoOf(JsonArray).equals = function (other) {
    return equals(this.c3s_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.c3s_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.c3s_1, ',', '[', ']');
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull(_this__u8e3s4.c26());
  }
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toInt(_this__u8e3s4.c26());
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toLong(_this__u8e3s4.c26());
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.c26();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.c26());
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.c26();
    }
    return tmp;
  }
  function get_longOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toLongOrNull(_this__u8e3s4.c26());
  }
  function get_doubleOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDoubleOrNull(_this__u8e3s4.c26());
  }
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + getKClassFromExpression(_this__u8e3s4) + ' is not a ' + element);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.x32('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.x32('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.x32('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.x32('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.x32('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().f3s_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().g3s_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().h3s_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().i3s_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().j3s_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.k3s_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).m32 = function () {
    return this.k3s_1;
  };
  protoOf(JsonElementSerializer).l3s = function (encoder, value) {
    verify(encoder);
    if (value instanceof JsonPrimitive) {
      encoder.b37(JsonPrimitiveSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonObject) {
        encoder.b37(JsonObjectSerializer_getInstance(), value);
      } else {
        if (value instanceof JsonArray) {
          encoder.b37(JsonArraySerializer_getInstance(), value);
        }
      }
    }
  };
  protoOf(JsonElementSerializer).n32 = function (encoder, value) {
    return this.l3s(encoder, value instanceof JsonElement ? value : THROW_CCE());
  };
  protoOf(JsonElementSerializer).o32 = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.u3r();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.m3s_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).m32();
    this.n3s_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).t33 = function () {
    return this.m3s_1.t33();
  };
  protoOf(JsonObjectDescriptor).u33 = function () {
    return this.m3s_1.u33();
  };
  protoOf(JsonObjectDescriptor).v33 = function () {
    return this.m3s_1.v33();
  };
  protoOf(JsonObjectDescriptor).o33 = function () {
    return this.m3s_1.o33();
  };
  protoOf(JsonObjectDescriptor).w33 = function () {
    return this.m3s_1.w33();
  };
  protoOf(JsonObjectDescriptor).x33 = function (index) {
    return this.m3s_1.x33(index);
  };
  protoOf(JsonObjectDescriptor).y33 = function (index) {
    return this.m3s_1.y33(index);
  };
  protoOf(JsonObjectDescriptor).z33 = function (name) {
    return this.m3s_1.z33(name);
  };
  protoOf(JsonObjectDescriptor).a34 = function (index) {
    return this.m3s_1.a34(index);
  };
  protoOf(JsonObjectDescriptor).b34 = function (index) {
    return this.m3s_1.b34(index);
  };
  protoOf(JsonObjectDescriptor).s33 = function () {
    return this.n3s_1;
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.i3s_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).m32 = function () {
    return this.i3s_1;
  };
  protoOf(JsonObjectSerializer).o3s = function (encoder, value) {
    verify(encoder);
    MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).n32(encoder, value);
  };
  protoOf(JsonObjectSerializer).n32 = function (encoder, value) {
    return this.o3s(encoder, value instanceof JsonObject ? value : THROW_CCE());
  };
  protoOf(JsonObjectSerializer).o32 = function (decoder) {
    verify_0(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).o32(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.p3s_1 = ListSerializer(JsonElementSerializer_getInstance()).m32();
    this.q3s_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).t33 = function () {
    return this.p3s_1.t33();
  };
  protoOf(JsonArrayDescriptor).u33 = function () {
    return this.p3s_1.u33();
  };
  protoOf(JsonArrayDescriptor).v33 = function () {
    return this.p3s_1.v33();
  };
  protoOf(JsonArrayDescriptor).o33 = function () {
    return this.p3s_1.o33();
  };
  protoOf(JsonArrayDescriptor).w33 = function () {
    return this.p3s_1.w33();
  };
  protoOf(JsonArrayDescriptor).x33 = function (index) {
    return this.p3s_1.x33(index);
  };
  protoOf(JsonArrayDescriptor).y33 = function (index) {
    return this.p3s_1.y33(index);
  };
  protoOf(JsonArrayDescriptor).z33 = function (name) {
    return this.p3s_1.z33(name);
  };
  protoOf(JsonArrayDescriptor).a34 = function (index) {
    return this.p3s_1.a34(index);
  };
  protoOf(JsonArrayDescriptor).b34 = function (index) {
    return this.p3s_1.b34(index);
  };
  protoOf(JsonArrayDescriptor).s33 = function () {
    return this.q3s_1;
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.j3s_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).m32 = function () {
    return this.j3s_1;
  };
  protoOf(JsonArraySerializer).r3s = function (encoder, value) {
    verify(encoder);
    ListSerializer(JsonElementSerializer_getInstance()).n32(encoder, value);
  };
  protoOf(JsonArraySerializer).n32 = function (encoder, value) {
    return this.r3s(encoder, value instanceof JsonArray ? value : THROW_CCE());
  };
  protoOf(JsonArraySerializer).o32 = function (decoder) {
    verify_0(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).o32(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.f3s_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).m32 = function () {
    return this.f3s_1;
  };
  protoOf(JsonPrimitiveSerializer).s3s = function (encoder, value) {
    verify(encoder);
    var tmp;
    if (value instanceof JsonNull) {
      encoder.b37(JsonNullSerializer_getInstance(), JsonNull_getInstance());
      tmp = Unit_instance;
    } else {
      var tmp_0 = JsonLiteralSerializer_getInstance();
      encoder.b37(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(JsonPrimitiveSerializer).n32 = function (encoder, value) {
    return this.s3s(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
  };
  protoOf(JsonPrimitiveSerializer).o32 = function (decoder) {
    var result = asJsonDecoder(decoder).u3r();
    if (!(result instanceof JsonPrimitive))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + getKClassFromExpression(result), toString(result));
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.g3s_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).m32 = function () {
    return this.g3s_1;
  };
  protoOf(JsonNullSerializer).t3s = function (encoder, value) {
    verify(encoder);
    encoder.f36();
  };
  protoOf(JsonNullSerializer).n32 = function (encoder, value) {
    return this.t3s(encoder, value instanceof JsonNull ? value : THROW_CCE());
  };
  protoOf(JsonNullSerializer).o32 = function (decoder) {
    verify_0(decoder);
    if (decoder.x34()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.y34();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.h3s_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).m32 = function () {
    return this.h3s_1;
  };
  protoOf(JsonLiteralSerializer).u3s = function (encoder, value) {
    verify(encoder);
    if (value.z3r_1) {
      return encoder.o36(value.b3s_1);
    }
    if (!(value.a3s_1 == null)) {
      return encoder.p36(value.a3s_1).o36(value.b3s_1);
    }
    var tmp0_safe_receiver = get_longOrNull(value);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return encoder.k36(tmp0_safe_receiver);
    }
    var tmp1_safe_receiver = toULongOrNull(value.b3s_1);
    var tmp = tmp1_safe_receiver;
    if ((tmp == null ? null : new ULong(tmp)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_0 = tmp1_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      var it = (tmp_0 == null ? null : new ULong(tmp_0)).mg_1;
      var tmp_1 = encoder.p36(serializer_0(Companion_getInstance()).m32());
      // Inline function 'kotlin.ULong.toLong' call
      var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
      tmp_1.k36(tmp$ret$1);
      return Unit_instance;
    }
    var tmp2_safe_receiver = get_doubleOrNull(value);
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return encoder.m36(tmp2_safe_receiver);
    }
    var tmp3_safe_receiver = get_booleanOrNull(value);
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return encoder.g36(tmp3_safe_receiver);
    }
    encoder.o36(value.b3s_1);
  };
  protoOf(JsonLiteralSerializer).n32 = function (encoder, value) {
    return this.u3s(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
  };
  protoOf(JsonLiteralSerializer).o32 = function (decoder) {
    var result = asJsonDecoder(decoder).u3r();
    if (!(result instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + getKClassFromExpression(result), toString(result));
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function verify(encoder) {
    asJsonEncoder(encoder);
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + getKClassFromExpression(_this__u8e3s4)));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function verify_0(decoder) {
    asJsonDecoder(decoder);
  }
  function asJsonEncoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + getKClassFromExpression(_this__u8e3s4)));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function _get_original__l7ku1m($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.v3s_1;
    original$factory();
    return this_0.f2();
  }
  function defer$1($deferred) {
    this.v3s_1 = lazy_0($deferred);
  }
  protoOf(defer$1).s33 = function () {
    return _get_original__l7ku1m(this).s33();
  };
  protoOf(defer$1).w33 = function () {
    return _get_original__l7ku1m(this).w33();
  };
  protoOf(defer$1).u33 = function () {
    return _get_original__l7ku1m(this).u33();
  };
  protoOf(defer$1).a34 = function (index) {
    return _get_original__l7ku1m(this).a34(index);
  };
  protoOf(defer$1).z33 = function (name) {
    return _get_original__l7ku1m(this).z33(name);
  };
  protoOf(defer$1).x33 = function (index) {
    return _get_original__l7ku1m(this).x33(index);
  };
  protoOf(defer$1).y33 = function (index) {
    return _get_original__l7ku1m(this).y33(index);
  };
  protoOf(defer$1).b34 = function (index) {
    return _get_original__l7ku1m(this).b34(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function JsonEncoder() {
  }
  function Composer(writer) {
    this.w3s_1 = writer;
    this.x3s_1 = true;
  }
  protoOf(Composer).y3s = function () {
    this.x3s_1 = true;
  };
  protoOf(Composer).z3s = function () {
    return Unit_instance;
  };
  protoOf(Composer).a3t = function () {
    this.x3s_1 = false;
  };
  protoOf(Composer).b3t = function () {
    return Unit_instance;
  };
  protoOf(Composer).c3t = function (v) {
    return this.w3s_1.d3t(v);
  };
  protoOf(Composer).e3t = function (v) {
    return this.w3s_1.f3t(v);
  };
  protoOf(Composer).g3t = function (v) {
    return this.w3s_1.f3t(v.toString());
  };
  protoOf(Composer).h3t = function (v) {
    return this.w3s_1.f3t(v.toString());
  };
  protoOf(Composer).i3t = function (v) {
    return this.w3s_1.j3t(toLong_0(v));
  };
  protoOf(Composer).k3t = function (v) {
    return this.w3s_1.j3t(toLong_0(v));
  };
  protoOf(Composer).l3t = function (v) {
    return this.w3s_1.j3t(toLong_0(v));
  };
  protoOf(Composer).m3t = function (v) {
    return this.w3s_1.j3t(v);
  };
  protoOf(Composer).n3t = function (v) {
    return this.w3s_1.f3t(v.toString());
  };
  protoOf(Composer).o3t = function (value) {
    return this.w3s_1.p3t(value);
  };
  function Composer_0(sb, json) {
    return json.b3q_1.k3r_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
  }
  function ComposerForUnsignedNumbers(writer, forceQuoting) {
    Composer.call(this, writer);
    this.s3t_1 = forceQuoting;
  }
  protoOf(ComposerForUnsignedNumbers).l3t = function (v) {
    if (this.s3t_1) {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
      this.o3t(UInt__toString_impl_dbgl21(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUInt' call
      var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
      this.e3t(UInt__toString_impl_dbgl21(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).m3t = function (v) {
    if (this.s3t_1) {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
      this.o3t(ULong__toString_impl_f9au7k(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toULong' call
      var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
      this.e3t(ULong__toString_impl_f9au7k(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).i3t = function (v) {
    if (this.s3t_1) {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
      this.o3t(UByte__toString_impl_v72jg(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUByte' call
      var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
      this.e3t(UByte__toString_impl_v72jg(tmp$ret$1));
    }
  };
  protoOf(ComposerForUnsignedNumbers).k3t = function (v) {
    if (this.s3t_1) {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$0 = _UShort___init__impl__jigrne(v);
      this.o3t(UShort__toString_impl_edaoee(tmp$ret$0));
    } else {
      // Inline function 'kotlin.toUShort' call
      var tmp$ret$1 = _UShort___init__impl__jigrne(v);
      this.e3t(UShort__toString_impl_edaoee(tmp$ret$1));
    }
  };
  function ComposerForUnquotedLiterals(writer, forceQuoting) {
    Composer.call(this, writer);
    this.v3t_1 = forceQuoting;
  }
  protoOf(ComposerForUnquotedLiterals).o3t = function (value) {
    if (this.v3t_1) {
      protoOf(Composer).o3t.call(this, value);
    } else {
      protoOf(Composer).e3t.call(this, value);
    }
  };
  function ComposerWithPrettyPrint(writer, json) {
    Composer.call(this, writer);
    this.y3t_1 = json;
    this.z3t_1 = 0;
  }
  protoOf(ComposerWithPrettyPrint).y3s = function () {
    this.x3s_1 = true;
    this.z3t_1 = this.z3t_1 + 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).z3s = function () {
    this.z3t_1 = this.z3t_1 - 1 | 0;
  };
  protoOf(ComposerWithPrettyPrint).a3t = function () {
    this.x3s_1 = false;
    this.e3t('\n');
    // Inline function 'kotlin.repeat' call
    var times = this.z3t_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.serialization.json.internal.ComposerWithPrettyPrint.nextItem.<anonymous>' call
        this.e3t(this.y3t_1.b3q_1.m3r_1);
      }
       while (inductionVariable < times);
  };
  protoOf(ComposerWithPrettyPrint).b3t = function () {
    this.c3t(_Char___init__impl__6a9atx(32));
  };
  function readIfAbsent($this, descriptor, index) {
    $this.b3u_1 = !descriptor.b34(index) ? descriptor.y33(index).o33() : false;
    return $this.b3u_1;
  }
  function JsonElementMarker$readIfAbsent$ref($boundThis) {
    var l = function (p0, p1) {
      return readIfAbsent($boundThis, p0, p1);
    };
    l.callableName = 'readIfAbsent';
    return l;
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.a3u_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.b3u_1 = false;
  }
  protoOf(JsonElementMarker).k3b = function (index) {
    this.a3u_1.k3b(index);
  };
  protoOf(JsonElementMarker).l3b = function () {
    return this.a3u_1.l3b();
  };
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.c3u('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, get_specialFlowingValuesHint());
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.s33() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.w33() + "'.\n") + get_allowStructuredMapKeysHint());
  }
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + minify(input, offset));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function UnknownKeyException(key, input) {
    return JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "'.\n" + (get_ignoreUnknownKeysHint() + '\n') + ('Current input: ' + minify(input)));
  }
  function InvalidFloatingPointEncoded(value, output) {
    return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + (get_specialFlowingValuesHint() + '\n') + ('Current output: ' + minify(output)));
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + (get_specialFlowingValuesHint() + '\n') + ('Current output: ' + minify(output));
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    // Inline function 'kotlin.text.substring' call
    var startIndex = coerceAtLeast(start_0, 0);
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex_0)) + suffix;
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  function get_JsonSerializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonSerializationNamesKey;
  }
  var JsonSerializationNamesKey;
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndex$getJsonNameIndexSlowPath(json, _this__u8e3s4, name);
    var index = _this__u8e3s4.z33(name);
    if (!(index === -3))
      return index;
    if (!json.b3q_1.r3r_1)
      return index;
    return getJsonNameIndex$getJsonNameIndexSlowPath(json, _this__u8e3s4, name);
  }
  function getJsonElementName(_this__u8e3s4, json, index) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var strategy = namingStrategy(_this__u8e3s4, json);
    return strategy == null ? _this__u8e3s4.a34(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.w33(), CLASS_getInstance()) ? json.b3q_1.s3r_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.e3u(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function serializationNamesIndices(_this__u8e3s4, json, strategy) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(json);
    var tmp_0 = get_JsonSerializationNamesKey();
    return tmp.e3u(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var strategy = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.u33();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var this_0 = _this__u8e3s4.x33(i);
        var destination = ArrayList_init_$Create$();
        var tmp0_iterator = this_0.u();
        while (tmp0_iterator.v()) {
          var element = tmp0_iterator.w();
          if (element instanceof JsonNames) {
            destination.r(element);
          }
        }
        var tmp1_safe_receiver = singleOrNull(destination);
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.f3u_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp2_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp2_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, element_0, i);
          }
        }
        if (strategy == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, strategy.g3u(_this__u8e3s4, i, _this__u8e3s4.a34(i)), i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp;
    if (builder.b1()) {
      // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
      tmp = emptyMap();
    } else {
      tmp = builder;
    }
    return tmp;
  }
  function getJsonNameIndex$getJsonNameIndexSlowPath($json, $this_getJsonNameIndex, $name) {
    var tmp0_elvis_lhs = deserializationNamesMap($json, $this_getJsonNameIndex).m2($name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, Map) ? _this__u8e3s4 : THROW_CCE()).j2(name)) {
      throw new JsonException("The suggested name '" + name + "' for property " + $this_buildDeserializationNamesMap.a34(index) + ' is already one of the names for property ' + ($this_buildDeserializationNamesMap.a34(getValue(_this__u8e3s4, name)) + ' in ' + $this_buildDeserializationNamesMap));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.c2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
    return function () {
      var tmp = 0;
      var tmp_0 = $this_serializationNamesIndices.u33();
      // Inline function 'kotlin.arrayOfNulls' call
      var tmp_1 = fillArrayVal(Array(tmp_0), null);
      while (tmp < tmp_0) {
        var tmp_2 = tmp;
        var baseName = $this_serializationNamesIndices.a34(tmp_2);
        tmp_1[tmp_2] = $strategy.g3u($this_serializationNamesIndices, tmp_2, baseName);
        tmp = tmp + 1 | 0;
      }
      return tmp_1;
    };
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.j3u_1, 2);
    $this.h3u_1 = copyOf($this.h3u_1, newSize);
    $this.i3u_1 = copyOf_0($this.i3u_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.h3u_1 = fillArrayVal(Array(8), null);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.i3u_1 = tmp_2;
    this.j3u_1 = -1;
  }
  protoOf(JsonPath).k3u = function (sd) {
    this.j3u_1 = this.j3u_1 + 1 | 0;
    var depth = this.j3u_1;
    if (depth === this.h3u_1.length) {
      resize(this);
    }
    this.h3u_1[depth] = sd;
  };
  protoOf(JsonPath).l3u = function (index) {
    this.i3u_1[this.j3u_1] = index;
  };
  protoOf(JsonPath).m3u = function (key) {
    var tmp;
    if (!(this.i3u_1[this.j3u_1] === -2)) {
      this.j3u_1 = this.j3u_1 + 1 | 0;
      tmp = this.j3u_1 === this.h3u_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.h3u_1[this.j3u_1] = key;
    this.i3u_1[this.j3u_1] = -2;
  };
  protoOf(JsonPath).n3u = function () {
    if (this.i3u_1[this.j3u_1] === -2) {
      this.h3u_1[this.j3u_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).o3u = function () {
    var depth = this.j3u_1;
    if (this.i3u_1[depth] === -2) {
      this.i3u_1[depth] = -1;
      this.j3u_1 = this.j3u_1 - 1 | 0;
    }
    if (!(this.j3u_1 === -1)) {
      this.j3u_1 = this.j3u_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).p3u = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>' call
    this_0.i5('$');
    // Inline function 'kotlin.repeat' call
    var times = this.j3u_1 + 1 | 0;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>.<anonymous>' call
        var element = this.h3u_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.w33(), LIST_getInstance())) {
            if (!(this.i3u_1[index] === -1)) {
              this_0.i5('[');
              this_0.h5(this.i3u_1[index]);
              this_0.i5(']');
            }
          } else {
            var idx = this.i3u_1[index];
            if (idx >= 0) {
              this_0.i5('.');
              this_0.i5(element.a34(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.i5('[');
            this_0.i5("'");
            this_0.h5(element);
            this_0.i5("'");
            this_0.i5(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.p3u();
  };
  function encodeByWriter(_this__u8e3s4, writer, serializer, value) {
    var tmp = WriteMode_OBJ_getInstance();
    // Inline function 'kotlin.arrayOfNulls' call
    var size = values().length;
    var tmp$ret$0 = fillArrayVal(Array(size), null);
    var encoder = StreamingJsonEncoder_init_$Create$(writer, _this__u8e3s4, tmp, tmp$ret$0);
    encoder.b37(serializer, value);
  }
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.y3u_1.b3v(get_TC_BEGIN_OBJ());
    if ($this.y3u_1.c3v() === get_TC_COMMA()) {
      $this.y3u_1.c3u('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.y3u_1.d3v()) {
      var key = $this.z3u_1 ? $this.y3u_1.f3v() : $this.y3u_1.e3v();
      $this.y3u_1.b3v(get_TC_COLON());
      // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObject.<anonymous>' call
      var element = $this.g3v();
      // Inline function 'kotlin.collections.set' call
      result.c2(key, element);
      lastToken = $this.y3u_1.h3v();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== get_TC_COMMA())
        if (tmp0_subject === get_TC_END_OBJ())
          break $l$loop;
        else {
          $this.y3u_1.c3u('Expected end of the object or comma');
        }
    }
    if (lastToken === get_TC_BEGIN_OBJ()) {
      $this.y3u_1.b3v(get_TC_END_OBJ());
    } else if (lastToken === get_TC_COMMA()) {
      $this.y3u_1.c3u('Unexpected trailing comma');
    }
    return new JsonObject(result);
  }
  function readObject_0(_this__u8e3s4, $this, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  }
  function readArray($this) {
    var lastToken = $this.y3u_1.h3v();
    if ($this.y3u_1.c3v() === get_TC_COMMA()) {
      $this.y3u_1.c3u('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.y3u_1.d3v()) {
      var element = $this.g3v();
      result.r(element);
      lastToken = $this.y3u_1.h3v();
      if (!(lastToken === get_TC_COMMA())) {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var this_0 = $this.y3u_1;
        var condition = lastToken === get_TC_END_LIST();
        var position = this_0.n3q_1;
        if (!condition) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readArray.<anonymous>' call
          var tmp$ret$1 = 'Expected end of the array or comma';
          this_0.c3u(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === get_TC_BEGIN_LIST()) {
      $this.y3u_1.b3v(get_TC_END_LIST());
    } else if (lastToken === get_TC_COMMA()) {
      $this.y3u_1.c3u('Unexpected trailing comma');
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.z3u_1 ? true : !isString) {
      tmp = $this.y3u_1.f3v();
    } else {
      tmp = $this.y3u_1.e3v();
    }
    var string = tmp;
    if (!isString ? string === get_NULL() : false)
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.e3w_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).j3w = function ($this$$receiver, it, $completion) {
    var tmp = this.k3w($this$$receiver, it, $completion);
    tmp.ga_1 = Unit_instance;
    tmp.ha_1 = null;
    return tmp.ra();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).df = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.j3w(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 3;
            this.h3w_1 = this.e3w_1.y3u_1.c3v();
            if (this.h3w_1 === get_TC_STRING()) {
              this.i3w_1 = readValue(this.e3w_1, true);
              this.ea_1 = 2;
              continue $sm;
            } else {
              if (this.h3w_1 === get_TC_OTHER()) {
                this.i3w_1 = readValue(this.e3w_1, false);
                this.ea_1 = 2;
                continue $sm;
              } else {
                if (this.h3w_1 === get_TC_BEGIN_OBJ()) {
                  this.ea_1 = 1;
                  suspendResult = readObject_0(this.f3w_1, this.e3w_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.h3w_1 === get_TC_BEGIN_LIST()) {
                    this.i3w_1 = readArray(this.e3w_1);
                    this.ea_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.e3w_1.y3u_1.c3u("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.i3w_1 = suspendResult;
            this.ea_1 = 2;
            continue $sm;
          case 2:
            return this.i3w_1;
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
  protoOf(JsonTreeReader$readDeepRecursive$slambda).k3w = function ($this$$receiver, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.e3w_1, completion);
    i.f3w_1 = $this$$receiver;
    i.g3w_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$$receiver, it, $completion) {
      return i.j3w($this$$receiver, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.q3v_1 = _this__u8e3s4;
    this.r3v_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).ra = function () {
    var suspendResult = this.ga_1;
    $sm: do
      try {
        var tmp = this.ea_1;
        switch (tmp) {
          case 0:
            this.fa_1 = 5;
            var tmp_0 = this;
            tmp_0.s3v_1 = this.q3v_1;
            this.t3v_1 = this.s3v_1.y3u_1.b3v(get_TC_BEGIN_OBJ());
            if (this.s3v_1.y3u_1.c3v() === get_TC_COMMA()) {
              this.s3v_1.y3u_1.c3u('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.u3v_1 = LinkedHashMap_init_$Create$();
            this.ea_1 = 1;
            continue $sm;
          case 1:
            if (!this.s3v_1.y3u_1.d3v()) {
              this.ea_1 = 4;
              continue $sm;
            }

            this.v3v_1 = this.s3v_1.z3u_1 ? this.s3v_1.y3u_1.f3v() : this.s3v_1.y3u_1.e3v();
            this.s3v_1.y3u_1.b3v(get_TC_COLON());
            this.ea_1 = 2;
            suspendResult = this.r3v_1.ve(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var this_0 = this.u3v_1;
            var key = this.v3v_1;
            this_0.c2(key, element);
            this.t3v_1 = this.s3v_1.y3u_1.h3v();
            var tmp0_subject = this.t3v_1;
            if (tmp0_subject === get_TC_COMMA()) {
              this.ea_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === get_TC_END_OBJ()) {
                this.ea_1 = 4;
                continue $sm;
              } else {
                this.s3v_1.y3u_1.c3u('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.ea_1 = 1;
            continue $sm;
          case 4:
            if (this.t3v_1 === get_TC_BEGIN_OBJ()) {
              this.s3v_1.y3u_1.b3v(get_TC_END_OBJ());
            } else if (this.t3v_1 === get_TC_COMMA()) {
              this.s3v_1.y3u_1.c3u('Unexpected trailing comma');
            }

            return new JsonObject(this.u3v_1);
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
  function JsonTreeReader(configuration, lexer) {
    this.y3u_1 = lexer;
    this.z3u_1 = configuration.i3r_1;
    this.a3v_1 = 0;
  }
  protoOf(JsonTreeReader).g3v = function () {
    var token = this.y3u_1.c3v();
    var tmp;
    if (token === get_TC_STRING()) {
      tmp = readValue(this, true);
    } else if (token === get_TC_OTHER()) {
      tmp = readValue(this, false);
    } else if (token === get_TC_BEGIN_OBJ()) {
      var tmp_0;
      this.a3v_1 = this.a3v_1 + 1 | 0;
      if (this.a3v_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.a3v_1 = this.a3v_1 - 1 | 0;
      tmp = result;
    } else if (token === get_TC_BEGIN_LIST()) {
      tmp = readArray(this);
    } else {
      this.y3u_1.c3u('Cannot begin reading element, unexpected token: ' + token);
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var tmp0_iterator = _this__u8e3s4.t33().u();
    while (tmp0_iterator.v()) {
      var annotation = tmp0_iterator.w();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.l3w_1;
    }
    return json.b3q_1.p3r_1;
  }
  function decodeSerializableValuePolymorphic(_this__u8e3s4, deserializer) {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.t3r().b3q_1.o3r_1;
    }
    if (tmp) {
      return deserializer.o32(_this__u8e3s4);
    }
    var discriminator = classDiscriminator(deserializer.m32(), _this__u8e3s4.t3r());
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = _this__u8e3s4.u3r();
    var descriptor = deserializer.m32();
    if (!(value instanceof JsonObject)) {
      throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.s33() + ', but had ' + getKClassFromExpression(value));
    }
    var jsonTree = value;
    var tmp0_safe_receiver = jsonTree.k1h(discriminator);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
    var type = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.c26();
    var tmp2_elvis_lhs = deserializer.d33(_this__u8e3s4, type);
    var tmp_0;
    if (tmp2_elvis_lhs == null) {
      throwSerializerNotFound(type, jsonTree);
    } else {
      tmp_0 = tmp2_elvis_lhs;
    }
    var actualSerializer = tmp_0;
    var tmp_1 = _this__u8e3s4.t3r();
    return readPolymorphicJson(tmp_1, discriminator, jsonTree, isInterface(actualSerializer, DeserializationStrategy) ? actualSerializer : THROW_CCE());
  }
  function throwSerializerNotFound(type, jsonTree) {
    var suffix = type == null ? "missing class discriminator ('null')" : "class discriminator '" + type + "'";
    throw JsonDecodingException_0(-1, 'Polymorphic serializer was not found for ' + suffix, jsonTree.toString());
  }
  function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
    if (!(serializer instanceof SealedClassSerializer))
      return Unit_instance;
    if (jsonCachedSerialNames(actualSerializer.m32()).z(classDiscriminator)) {
      var baseName = serializer.m32().s33();
      var actualName = actualSerializer.m32().s33();
      // Inline function 'kotlin.error' call
      var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation or fall back to array polymorphism';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function checkKind(kind) {
    if (kind instanceof ENUM) {
      // Inline function 'kotlin.error' call
      var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (kind instanceof PrimitiveKind) {
      // Inline function 'kotlin.error' call
      var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (kind instanceof PolymorphicKind) {
      // Inline function 'kotlin.error' call
      var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
  }
  function validateIfSealed$accessor$1ad0flx(serializer, actualSerializer, classDiscriminator) {
    return validateIfSealed(serializer, actualSerializer, classDiscriminator);
  }
  function checkKind_0($this, descriptor, actualClass) {
    var kind = descriptor.w33();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.z5() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.m3w_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) ? true : equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.z5() + ' of kind ' + kind + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.u33();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.a34(i);
        if (name === $this.n3w_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + actualClass + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.m3w_1 = useArrayPolymorphism;
    this.n3w_1 = discriminator;
  }
  protoOf(PolymorphismValidator).x3k = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).a3l = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.m32();
    checkKind_0(this, descriptor, actualClass);
    if (!this.m3w_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).b3l = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).c3l = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.d3u_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).o3w = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.set' call
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.d3u_1;
    var value_0 = this_0.m2(descriptor);
    var tmp;
    if (value_0 == null) {
      // Inline function 'kotlinx.serialization.json.internal.DescriptorSchemaCache.set.<anonymous>' call
      var answer = createMapForCache(2);
      this_0.c2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var this_1 = tmp;
    var key_0 = key instanceof Key ? key : THROW_CCE();
    var value_1 = !(value == null) ? value : THROW_CCE();
    this_1.c2(key_0, value_1);
  };
  protoOf(DescriptorSchemaCache).e3u = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.p3w(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.o3w(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).p3w = function (descriptor, key) {
    var tmp0_safe_receiver = this.d3u_1.m2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.m2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.q3w_1 = discriminatorToSkip;
  }
  function trySkip(_this__u8e3s4, $this, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.q3w_1 === unknownKey) {
      _this__u8e3s4.q3w_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    $l$loop: while (true) {
      var tmp = $this.b36(descriptor);
      if (!!(tmp === -1)) {
        break $l$loop;
      }
    }
  }
  function checkLeadingComma($this) {
    if ($this.h3q_1.c3v() === get_TC_COMMA()) {
      $this.h3q_1.c3u('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.j3q_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.j3q_1 === -1)) {
        hasComma = $this.h3q_1.s3w();
      }
    } else {
      $this.h3q_1.r3w(get_COLON());
    }
    var tmp;
    if ($this.h3q_1.d3v()) {
      if (decodingKey) {
        if ($this.j3q_1 === -1) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var this_0 = $this.h3q_1;
          var condition = !hasComma;
          var position = this_0.n3q_1;
          if (!condition) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$0 = 'Unexpected trailing comma';
            this_0.c3u(tmp$ret$0, position);
          }
        } else {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var this_1 = $this.h3q_1;
          var condition_0 = hasComma;
          var position_0 = this_1.n3q_1;
          if (!condition_0) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$1 = 'Expected comma after the key-value pair';
            this_1.c3u(tmp$ret$1, position_0);
          }
        }
      }
      $this.j3q_1 = $this.j3q_1 + 1 | 0;
      tmp = $this.j3q_1;
    } else {
      if (hasComma) {
        $this.h3q_1.c3u("Expected '}', but had ',' instead");
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var this_0 = $this.f3q_1;
      var elementDescriptor = descriptor.y33(index);
      var tmp;
      if (!elementDescriptor.o33()) {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        tmp = $this.h3q_1.t3w(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.w33(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.o33()) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          tmp_0 = $this.h3q_1.t3w(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        var tmp0_elvis_lhs = $this.h3q_1.u3w($this.l3q_1.i3r_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, this_0, enumValue);
        if (enumIndex === -3) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          $this.h3q_1.e3v();
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.h3q_1.s3w();
    while ($this.h3q_1.d3v()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.h3q_1.r3w(get_COLON());
      var index = getJsonNameIndex(descriptor, $this.f3q_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.l3q_1.n3r_1 ? coerceInputValue($this, descriptor, index) : false) {
          hasComma = $this.h3q_1.s3w();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.m3q_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.k3b(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, key);
      }
    }
    if (hasComma) {
      $this.h3q_1.c3u('Unexpected trailing comma');
    }
    var tmp1_safe_receiver = $this.m3q_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.l3b();
    var tmp_1;
    if (tmp2_elvis_lhs == null) {
      tmp_1 = -1;
    } else {
      tmp_1 = tmp2_elvis_lhs;
    }
    return tmp_1;
  }
  function handleUnknown($this, key) {
    if ($this.l3q_1.h3r_1 ? true : trySkip($this.k3q_1, $this, key)) {
      $this.h3q_1.w3w($this.l3q_1.i3r_1);
    } else {
      $this.h3q_1.v3w(key);
    }
    return $this.h3q_1.s3w();
  }
  function decodeListIndex($this) {
    var hasComma = $this.h3q_1.s3w();
    var tmp;
    if ($this.h3q_1.d3v()) {
      if (!($this.j3q_1 === -1) ? !hasComma : false) {
        $this.h3q_1.c3u('Expected end of the array or comma');
      }
      $this.j3q_1 = $this.j3q_1 + 1 | 0;
      tmp = $this.j3q_1;
    } else {
      if (hasComma) {
        $this.h3q_1.c3u('Unexpected trailing comma');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.l3q_1.i3r_1) {
      tmp = $this.h3q_1.y3w();
    } else {
      tmp = $this.h3q_1.x3w();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.f3q_1 = json;
    this.g3q_1 = mode;
    this.h3q_1 = lexer;
    this.i3q_1 = this.f3q_1.z35();
    this.j3q_1 = -1;
    this.k3q_1 = discriminatorHolder;
    this.l3q_1 = this.f3q_1.b3q_1;
    this.m3q_1 = this.l3q_1.l3r_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).t3r = function () {
    return this.f3q_1;
  };
  protoOf(StreamingJsonDecoder).z35 = function () {
    return this.i3q_1;
  };
  protoOf(StreamingJsonDecoder).u3r = function () {
    return (new JsonTreeReader(this.f3q_1.b3q_1, this.h3q_1)).g3v();
  };
  protoOf(StreamingJsonDecoder).k35 = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.f3q_1.b3q_1.o3r_1;
      }
      if (tmp) {
        return deserializer.o32(this);
      }
      var discriminator = classDiscriminator(deserializer.m32(), this.f3q_1);
      var type = this.h3q_1.z3w(discriminator, this.l3q_1.i3r_1);
      var actualSerializer = null;
      if (!(type == null)) {
        actualSerializer = deserializer.d33(this, type);
      }
      if (actualSerializer == null) {
        return decodeSerializableValuePolymorphic(this, isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE());
      }
      this.k3q_1 = new DiscriminatorHolder(discriminator);
      var tmp_0 = actualSerializer.o32(this);
      var result = !(tmp_0 == null) ? tmp_0 : THROW_CCE();
      return result;
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.j33_1, plus(e.message, ' at path: ') + this.h3q_1.o3q_1.p3u(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).l35 = function (descriptor) {
    var newMode = switchMode(this.f3q_1, descriptor);
    this.h3q_1.o3q_1.k3u(descriptor);
    this.h3q_1.r3w(newMode.c3x_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.e8_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.f3q_1, newMode, this.h3q_1, descriptor, this.k3q_1);
        break;
      default:
        var tmp_0;
        if (this.g3q_1.equals(newMode) ? this.f3q_1.b3q_1.l3r_1 : false) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.f3q_1, newMode, this.h3q_1, descriptor, this.k3q_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).m35 = function (descriptor) {
    if (this.f3q_1.b3q_1.h3r_1 ? descriptor.u33() === 0 : false) {
      skipLeftoverElements(this, descriptor);
    }
    this.h3q_1.r3w(this.g3q_1.d3x_1);
    this.h3q_1.o3q_1.o3u();
  };
  protoOf(StreamingJsonDecoder).x34 = function () {
    var tmp;
    var tmp0_safe_receiver = this.m3q_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b3u_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.h3q_1.e3x();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).y34 = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).x35 = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.g3q_1.equals(WriteMode_MAP_getInstance()) ? (index & 1) === 0 : false;
    if (isMapKey) {
      this.h3q_1.o3q_1.n3u();
    }
    var value = protoOf(AbstractDecoder).x35.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.h3q_1.o3q_1.m3u(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).b36 = function (descriptor) {
    var index;
    switch (this.g3q_1.e8_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.g3q_1.equals(WriteMode_MAP_getInstance())) {
      this.h3q_1.o3q_1.l3u(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).z34 = function () {
    var tmp;
    if (this.l3q_1.i3r_1) {
      tmp = this.h3q_1.g3x();
    } else {
      tmp = this.h3q_1.f3x();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).a35 = function () {
    var value = this.h3q_1.h3x();
    if (!value.equals(toLong_0(value.u9()))) {
      this.h3q_1.c3u("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.u9();
  };
  protoOf(StreamingJsonDecoder).b35 = function () {
    var value = this.h3q_1.h3x();
    if (!value.equals(toLong_0(value.v9()))) {
      this.h3q_1.c3u("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.v9();
  };
  protoOf(StreamingJsonDecoder).c35 = function () {
    var value = this.h3q_1.h3x();
    if (!value.equals(toLong_0(value.w9()))) {
      this.h3q_1.c3u("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.w9();
  };
  protoOf(StreamingJsonDecoder).d35 = function () {
    return this.h3q_1.h3x();
  };
  protoOf(StreamingJsonDecoder).e35 = function () {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.h3q_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeFloat.<anonymous>' call
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.f3q_1.b3q_1.q3r_1;
    if (specialFp ? true : isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.h3q_1, result);
  };
  protoOf(StreamingJsonDecoder).f35 = function () {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.h3q_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeDouble.<anonymous>' call
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.f3q_1.b3q_1.q3r_1;
    if (specialFp ? true : isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.h3q_1, result);
  };
  protoOf(StreamingJsonDecoder).g35 = function () {
    var string = this.h3q_1.f3v();
    if (!(string.length === 1)) {
      this.h3q_1.c3u("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).h35 = function () {
    var tmp;
    if (this.l3q_1.i3r_1) {
      tmp = this.h3q_1.y3w();
    } else {
      tmp = this.h3q_1.e3v();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).i35 = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.h3q_1, this.f3q_1) : protoOf(AbstractDecoder).i35.call(this, descriptor);
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.i3x_1 = lexer;
    this.j3x_1 = json.z35();
  }
  protoOf(JsonDecoderForUnsignedTypes).z35 = function () {
    return this.j3x_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).b36 = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).c35 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.i3x_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeInt.<anonymous>' call
        // Inline function 'kotlin.UInt.toInt' call
        var this_1 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).d35 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.i3x_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeLong.<anonymous>' call
        // Inline function 'kotlin.ULong.toLong' call
        var this_1 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).a35 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.i3x_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeByte.<anonymous>' call
        // Inline function 'kotlin.UByte.toByte' call
        var this_1 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).b35 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.i3x_1;
      var input = this_0.f3v();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeShort.<anonymous>' call
        // Inline function 'kotlin.UShort.toShort' call
        var this_1 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.c3u("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
    StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
    return $this;
  }
  function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
    return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
  }
  function encodeTypeInfo($this, descriptor) {
    $this.q3u_1.a3t();
    $this.o36(ensureNotNull($this.x3u_1));
    $this.q3u_1.c3t(get_COLON());
    $this.q3u_1.b3t();
    $this.o36(descriptor.s33());
  }
  function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
    AbstractEncoder.call(this);
    this.q3u_1 = composer;
    this.r3u_1 = json;
    this.s3u_1 = mode;
    this.t3u_1 = modeReuseCache;
    this.u3u_1 = this.r3u_1.z35();
    this.v3u_1 = this.r3u_1.b3q_1;
    this.w3u_1 = false;
    this.x3u_1 = null;
    var i = this.s3u_1.e8_1;
    if (!(this.t3u_1 == null)) {
      if (!(this.t3u_1[i] === null) ? true : !(this.t3u_1[i] === this)) {
        this.t3u_1[i] = this;
      }
    }
  }
  protoOf(StreamingJsonEncoder).t3r = function () {
    return this.r3u_1;
  };
  protoOf(StreamingJsonEncoder).z35 = function () {
    return this.u3u_1;
  };
  protoOf(StreamingJsonEncoder).b37 = function (serializer, value) {
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
      var tmp;
      if (!(serializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.t3r().b3q_1.o3r_1;
      }
      if (tmp) {
        serializer.n32(this, value);
        break $l$block;
      }
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      var baseClassDiscriminator = classDiscriminator(serializer.m32(), this.t3r());
      var actualSerializer = findPolymorphicSerializer(casted, this, !(value == null) ? value : THROW_CCE());
      validateIfSealed$accessor$1ad0flx(casted, actualSerializer, baseClassDiscriminator);
      checkKind(actualSerializer.m32().w33());
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.encodeSerializableValue.<anonymous>' call
      this.x3u_1 = baseClassDiscriminator;
      actualSerializer.n32(this, value);
    }
  };
  protoOf(StreamingJsonEncoder).l35 = function (descriptor) {
    var newMode = switchMode(this.r3u_1, descriptor);
    if (!(newMode.c3x_1 === get_INVALID())) {
      this.q3u_1.c3t(newMode.c3x_1);
      this.q3u_1.y3s();
    }
    if (!(this.x3u_1 == null)) {
      encodeTypeInfo(this, descriptor);
      this.x3u_1 = null;
    }
    if (this.s3u_1.equals(newMode)) {
      return this;
    }
    var tmp0_safe_receiver = this.t3u_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver[newMode.e8_1];
    return tmp1_elvis_lhs == null ? new StreamingJsonEncoder(this.q3u_1, this.r3u_1, newMode, this.t3u_1) : tmp1_elvis_lhs;
  };
  protoOf(StreamingJsonEncoder).m35 = function (descriptor) {
    if (!(this.s3u_1.d3x_1 === get_INVALID())) {
      this.q3u_1.z3s();
      this.q3u_1.a3t();
      this.q3u_1.c3t(this.s3u_1.d3x_1);
    }
  };
  protoOf(StreamingJsonEncoder).d36 = function (descriptor, index) {
    switch (this.s3u_1.e8_1) {
      case 1:
        if (!this.q3u_1.x3s_1) {
          this.q3u_1.c3t(get_COMMA());
        }

        this.q3u_1.a3t();
        break;
      case 2:
        if (!this.q3u_1.x3s_1) {
          var tmp = this;
          var tmp_0;
          if ((index % 2 | 0) === 0) {
            this.q3u_1.c3t(get_COMMA());
            this.q3u_1.a3t();
            tmp_0 = true;
          } else {
            this.q3u_1.c3t(get_COLON());
            this.q3u_1.b3t();
            tmp_0 = false;
          }
          tmp.w3u_1 = tmp_0;
        } else {
          this.w3u_1 = true;
          this.q3u_1.a3t();
        }

        break;
      case 3:
        if (index === 0)
          this.w3u_1 = true;
        if (index === 1) {
          this.q3u_1.c3t(get_COMMA());
          this.q3u_1.b3t();
          this.w3u_1 = false;
        }

        break;
      default:
        if (!this.q3u_1.x3s_1) {
          this.q3u_1.c3t(get_COMMA());
        }

        this.q3u_1.a3t();
        this.o36(getJsonElementName(descriptor, this.r3u_1, index));
        this.q3u_1.c3t(get_COLON());
        this.q3u_1.b3t();
        break;
    }
    return true;
  };
  protoOf(StreamingJsonEncoder).p36 = function (descriptor) {
    var tmp;
    if (get_isUnsignedNumber(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_0;
      var tmp_1 = this.q3u_1;
      if (tmp_1 instanceof ComposerForUnsignedNumbers) {
        tmp_0 = this.q3u_1;
      } else {
        tmp_0 = new ComposerForUnsignedNumbers(this.q3u_1.w3s_1, this.w3u_1);
      }
      var tmp$ret$1 = tmp_0;
      tmp = new StreamingJsonEncoder(tmp$ret$1, this.r3u_1, this.s3u_1, null);
    } else if (get_isUnquotedLiteral(descriptor)) {
      // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
      var tmp_2;
      var tmp_3 = this.q3u_1;
      if (tmp_3 instanceof ComposerForUnquotedLiterals) {
        tmp_2 = this.q3u_1;
      } else {
        tmp_2 = new ComposerForUnquotedLiterals(this.q3u_1.w3s_1, this.w3u_1);
      }
      var tmp$ret$3 = tmp_2;
      tmp = new StreamingJsonEncoder(tmp$ret$3, this.r3u_1, this.s3u_1, null);
    } else {
      tmp = protoOf(AbstractEncoder).p36.call(this, descriptor);
    }
    return tmp;
  };
  protoOf(StreamingJsonEncoder).f36 = function () {
    this.q3u_1.e3t(get_NULL());
  };
  protoOf(StreamingJsonEncoder).g36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.n3t(value);
    }
  };
  protoOf(StreamingJsonEncoder).h36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.i3t(value);
    }
  };
  protoOf(StreamingJsonEncoder).i36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.k3t(value);
    }
  };
  protoOf(StreamingJsonEncoder).j36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.l3t(value);
    }
  };
  protoOf(StreamingJsonEncoder).k36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.m3t(value);
    }
  };
  protoOf(StreamingJsonEncoder).l36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.g3t(value);
    }
    if (!this.v3u_1.q3r_1 ? !isFinite(value) : false) {
      throw InvalidFloatingPointEncoded(value, toString(this.q3u_1.w3s_1));
    }
  };
  protoOf(StreamingJsonEncoder).m36 = function (value) {
    if (this.w3u_1) {
      this.o36(value.toString());
    } else {
      this.q3u_1.h3t(value);
    }
    if (!this.v3u_1.q3r_1 ? !isFinite_0(value) : false) {
      throw InvalidFloatingPointEncoded(value, toString(this.q3u_1.w3s_1));
    }
  };
  protoOf(StreamingJsonEncoder).n36 = function (value) {
    this.o36(toString_0(value));
  };
  protoOf(StreamingJsonEncoder).o36 = function (value) {
    return this.q3u_1.o3t(value);
  };
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.v33() ? get_unsignedNumberDescriptors().z(_this__u8e3s4) : false;
  }
  function get_isUnquotedLiteral(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.v33() ? equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor()) : false;
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).m32(), serializer_0(Companion_getInstance()).m32(), serializer_2(Companion_getInstance_1()).m32(), serializer_3(Companion_getInstance_2()).m32()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.j5(get_STRING());
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length ? !(get_ESCAPE_STRINGS()[c] == null) : false) {
          _this__u8e3s4.l7(value, lastPos, i);
          _this__u8e3s4.i5(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0)) {
      _this__u8e3s4.l7(value, lastPos, value.length);
    } else {
      _this__u8e3s4.i5(value);
    }
    _this__u8e3s4.j5(get_STRING());
  }
  function toBooleanStrictOrNull(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.apply' call
      // Inline function 'kotlin.arrayOfNulls' call
      var this_0 = fillArrayVal(Array(93), null);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_STRINGS.<anonymous>' call
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_0(c1) + toString_0(c2) + toString_0(c3) + toString_0(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_MARKERS.<anonymous>' call
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      this_7[Char__toInt_impl_vasixd(this_8)] = 34;
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(92);
      this_7[Char__toInt_impl_vasixd(this_9)] = 92;
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(9);
      this_7[Char__toInt_impl_vasixd(this_10)] = 116;
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(8);
      this_7[Char__toInt_impl_vasixd(this_11)] = 98;
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(10);
      this_7[Char__toInt_impl_vasixd(this_12)] = 110;
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(13);
      this_7[Char__toInt_impl_vasixd(this_13)] = 114;
      this_7[12] = 102;
      ESCAPE_MARKERS = this_7;
    }
  }
  function currentObject($this) {
    var tmp0_safe_receiver = $this.q3i();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.currentObject.<anonymous>' call
      tmp = $this.p3x(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? $this.f2() : tmp1_elvis_lhs;
  }
  function unparsedPrimitive($this, primitive) {
    throw JsonDecodingException_0(-1, "Failed to parse '" + primitive + "'", toString(currentObject($this)));
  }
  function asLiteral(_this__u8e3s4, $this, type) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonLiteral ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw JsonDecodingException_1(-1, "Unexpected 'null' when " + type + ' was expected');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function AbstractJsonTreeDecoder(json, value) {
    NamedValueDecoder.call(this);
    this.m3x_1 = json;
    this.n3x_1 = value;
    this.o3x_1 = this.t3r().b3q_1;
  }
  protoOf(AbstractJsonTreeDecoder).t3r = function () {
    return this.m3x_1;
  };
  protoOf(AbstractJsonTreeDecoder).f2 = function () {
    return this.n3x_1;
  };
  protoOf(AbstractJsonTreeDecoder).z35 = function () {
    return this.t3r().z35();
  };
  protoOf(AbstractJsonTreeDecoder).u3r = function () {
    return currentObject(this);
  };
  protoOf(AbstractJsonTreeDecoder).k35 = function (deserializer) {
    return decodeSerializableValuePolymorphic(this, deserializer);
  };
  protoOf(AbstractJsonTreeDecoder).r3i = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).l35 = function (descriptor) {
    var currentObject_0 = currentObject(this);
    var tmp0_subject = descriptor.w33();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.t3r();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      if (!(currentObject_0 instanceof JsonArray)) {
        throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonArray) + ' as the serialized body of ' + descriptor.s33() + ', but had ' + getKClassFromExpression(currentObject_0));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject_0);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.t3r();
        var keyDescriptor = carrierDescriptor(descriptor.y33(0), this_0.z35());
        var keyKind = keyDescriptor.w33();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
          var tmp_4 = this.t3r();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          if (!(currentObject_0 instanceof JsonObject)) {
            throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.s33() + ', but had ' + getKClassFromExpression(currentObject_0));
          }
          tmp_2 = new JsonTreeMapDecoder(tmp_4, currentObject_0);
        } else {
          if (this_0.b3q_1.j3r_1) {
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
            var tmp_5 = this.t3r();
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            if (!(currentObject_0 instanceof JsonArray)) {
              throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonArray) + ' as the serialized body of ' + descriptor.s33() + ', but had ' + getKClassFromExpression(currentObject_0));
            }
            tmp_2 = new JsonTreeListDecoder(tmp_5, currentObject_0);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_2;
      } else {
        var tmp_6 = this.t3r();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        if (!(currentObject_0 instanceof JsonObject)) {
          throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.s33() + ', but had ' + getKClassFromExpression(currentObject_0));
        }
        tmp = new JsonTreeDecoder(tmp_6, currentObject_0);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).m35 = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).x34 = function () {
    var tmp = currentObject(this);
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).q3x = function (tag) {
    var currentElement = this.p3x(tag);
    var tmp0_elvis_lhs = currentElement instanceof JsonPrimitive ? currentElement : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw JsonDecodingException_0(-1, 'Expected JsonPrimitive at ' + tag + ', found ' + currentElement, toString(currentObject(this)));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).r3x = function (tag) {
    return !(this.p3x(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).t3i = function (tag) {
    return this.r3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).s3x = function (tag) {
    var value = this.q3x(tag);
    if (!this.t3r().b3q_1.i3r_1) {
      var literal = asLiteral(value, this, 'boolean');
      if (literal.z3r_1)
        throw JsonDecodingException_0(-1, "Boolean literal for key '" + tag + "' should be unquoted.\n" + get_lenientHint(), toString(currentObject(this)));
    }
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedBoolean.<anonymous>' call
        var tmp0_elvis_lhs = get_booleanOrNull(value);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw IllegalArgumentException_init_$Create$_0();
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var tmp0_elvis_lhs_0 = tmp;
        var tmp_0;
        if (tmp0_elvis_lhs_0 == null) {
          unparsedPrimitive(this, 'boolean');
        } else {
          tmp_0 = tmp0_elvis_lhs_0;
        }
        tmp$ret$1 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'boolean');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).u3i = function (tag) {
    return this.s3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).t3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedByte.<anonymous>' call
        var result = get_int(this_0);
        var tmp;
        var containsLower = ByteCompanionObject_instance.MIN_VALUE;
        if (result <= ByteCompanionObject_instance.MAX_VALUE ? containsLower <= result : false) {
          tmp = toByte(result);
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'byte');
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'byte');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).v3i = function (tag) {
    return this.t3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).u3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedShort.<anonymous>' call
        var result = get_int(this_0);
        var tmp;
        var containsLower = ShortCompanionObject_instance.MIN_VALUE;
        if (result <= ShortCompanionObject_instance.MAX_VALUE ? containsLower <= result : false) {
          tmp = toShort(result);
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'short');
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'short');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).w3i = function (tag) {
    return this.u3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).v3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedInt.<anonymous>' call
        var tmp0_elvis_lhs = get_int(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'int');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'int');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).x3i = function (tag) {
    return this.v3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).w3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedLong.<anonymous>' call
        var tmp0_elvis_lhs = get_long(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'long');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'long');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).y3i = function (tag) {
    return this.w3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).x3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedFloat.<anonymous>' call
        var tmp0_elvis_lhs = get_float(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'float');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'float');
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.t3r().b3q_1.q3r_1;
    if (specialFp ? true : isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(currentObject(this)));
  };
  protoOf(AbstractJsonTreeDecoder).z3i = function (tag) {
    return this.x3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).y3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedDouble.<anonymous>' call
        var tmp0_elvis_lhs = get_double(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'double');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'double');
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.t3r().b3q_1.q3r_1;
    if (specialFp ? true : isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(currentObject(this)));
  };
  protoOf(AbstractJsonTreeDecoder).a3j = function (tag) {
    return this.y3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).z3x = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.q3x(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedChar.<anonymous>' call
        var tmp0_elvis_lhs = single(this_0.c26());
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new Char(tmp_0)) == null) {
          unparsedPrimitive(this, 'char');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'char');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).b3j = function (tag) {
    return this.z3x((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).a3y = function (tag) {
    var value = this.q3x(tag);
    if (!this.t3r().b3q_1.i3r_1) {
      var literal = asLiteral(value, this, 'string');
      if (!literal.z3r_1)
        throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted.\n" + get_lenientHint(), toString(currentObject(this)));
    }
    if (value instanceof JsonNull)
      throw JsonDecodingException_0(-1, "Unexpected 'null' value instead of string literal", toString(currentObject(this)));
    return value.c26();
  };
  protoOf(AbstractJsonTreeDecoder).c3j = function (tag) {
    return this.a3y((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).b3y = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? new JsonDecoderForUnsignedTypes(new StringJsonLexer(this.q3x(tag).c26()), this.t3r()) : protoOf(NamedValueDecoder).d3j.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).d3j = function (tag, inlineDescriptor) {
    return this.b3y((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).i35 = function (descriptor) {
    return !(this.q3i() == null) ? protoOf(NamedValueDecoder).i35.call(this, descriptor) : (new JsonPrimitiveDecoder(this.t3r(), this.f2())).i35(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var this_0 = $this.t3r();
      var elementDescriptor = descriptor.y33(index);
      var tmp;
      if (!elementDescriptor.o33()) {
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_0 = $this.p3x(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$1 = true;
        break $l$block_2;
      }
      if (equals(elementDescriptor.w33(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.o33()) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
          var tmp_2 = $this.p3x(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$1 = false;
          break $l$block_2;
        }
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_3 = $this.p3x(tag);
        var tmp0_safe_receiver = tmp_3 instanceof JsonPrimitive ? tmp_3 : null;
        var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
        var tmp_4;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = false;
          break $l$block_2;
        } else {
          tmp_4 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_4;
        var enumIndex = getJsonNameIndex(elementDescriptor, this_0, enumValue);
        if (enumIndex === -3) {
          // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue.<anonymous>' call
          tmp$ret$1 = true;
          break $l$block_2;
        }
      }
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  }
  function absenceIsNull($this, descriptor, index) {
    $this.l3y_1 = (!$this.t3r().b3q_1.l3r_1 ? !descriptor.b34(index) : false) ? descriptor.y33(index).o33() : false;
    return $this.l3y_1;
  }
  function JsonTreeDecoder(json, value, polyDiscriminator, polyDescriptor) {
    polyDiscriminator = polyDiscriminator === VOID ? null : polyDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value);
    this.h3y_1 = value;
    this.i3y_1 = polyDiscriminator;
    this.j3y_1 = polyDescriptor;
    this.k3y_1 = 0;
    this.l3y_1 = false;
  }
  protoOf(JsonTreeDecoder).f2 = function () {
    return this.h3y_1;
  };
  protoOf(JsonTreeDecoder).b36 = function (descriptor) {
    while (this.k3y_1 < descriptor.u33()) {
      var tmp1 = this.k3y_1;
      this.k3y_1 = tmp1 + 1 | 0;
      var name = this.l3i(descriptor, tmp1);
      var index = this.k3y_1 - 1 | 0;
      this.l3y_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.f2();
      if ((isInterface(this_0, Map) ? this_0 : THROW_CCE()).j2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.o3x_1.n3r_1 ? true : !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).x34 = function () {
    return !this.l3y_1 ? protoOf(AbstractJsonTreeDecoder).x34.call(this) : false;
  };
  protoOf(JsonTreeDecoder).m3i = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.t3r());
    var baseName = descriptor.a34(index);
    if (strategy == null) {
      if (!this.o3x_1.r3r_1)
        return baseName;
      if (this.f2().z1().z(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.t3r(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var this_0 = this.f2().z1();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = this_0.u();
      while (tmp0_iterator.v()) {
        var element = tmp0_iterator.w();
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.elementName.<anonymous>' call
        if (deserializationNamesMap_0.m2(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.g3u(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).p3x = function (tag) {
    return getValue(this.f2(), tag);
  };
  protoOf(JsonTreeDecoder).l35 = function (descriptor) {
    if (descriptor === this.j3y_1)
      return this;
    return protoOf(AbstractJsonTreeDecoder).l35.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).m35 = function (descriptor) {
    var tmp;
    if (this.o3x_1.h3r_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.w33();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.t3r());
    var tmp_1;
    if (strategy == null ? !this.o3x_1.r3r_1 : false) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.t3r(), descriptor).z1();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_safe_receiver = get_schemaCache(this.t3r()).p3w(descriptor, get_JsonDeserializationNamesKey());
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z1();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var tmp1_iterator = this.f2().z1().u();
    while (tmp1_iterator.v()) {
      var key = tmp1_iterator.w();
      if (!names.z(key) ? !(key === this.i3y_1) : false) {
        throw UnknownKeyException(key, this.f2().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.r3y_1 = value;
    this.s3y_1 = this.r3y_1.n();
    this.t3y_1 = -1;
  }
  protoOf(JsonTreeListDecoder).f2 = function () {
    return this.r3y_1;
  };
  protoOf(JsonTreeListDecoder).m3i = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).p3x = function (tag) {
    return this.r3y_1.f1(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).b36 = function (descriptor) {
    while (this.t3y_1 < (this.s3y_1 - 1 | 0)) {
      this.t3y_1 = this.t3y_1 + 1 | 0;
      return this.t3y_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.z3y_1 = value;
    this.e3j(get_PRIMITIVE_TAG());
  }
  protoOf(JsonPrimitiveDecoder).f2 = function () {
    return this.z3y_1;
  };
  protoOf(JsonPrimitiveDecoder).b36 = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).p3x = function (tag) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(tag === get_PRIMITIVE_TAG())) {
      // Inline function 'kotlinx.serialization.json.internal.JsonPrimitiveDecoder.currentElement.<anonymous>' call
      var message = "This input can only handle primitives with '" + get_PRIMITIVE_TAG() + "' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.z3y_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.k3z_1 = value;
    this.l3z_1 = toList(this.k3z_1.z1());
    this.m3z_1 = imul(this.l3z_1.n(), 2);
    this.n3z_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).f2 = function () {
    return this.k3z_1;
  };
  protoOf(JsonTreeMapDecoder).m3i = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.l3z_1.f1(i);
  };
  protoOf(JsonTreeMapDecoder).b36 = function (descriptor) {
    while (this.n3z_1 < (this.m3z_1 - 1 | 0)) {
      this.n3z_1 = this.n3z_1 + 1 | 0;
      return this.n3z_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).p3x = function (tag) {
    return (this.n3z_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.k3z_1, tag);
  };
  protoOf(JsonTreeMapDecoder).m35 = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.m32())).k35(deserializer);
  }
  function get_PRIMITIVE_TAG() {
    return PRIMITIVE_TAG;
  }
  var PRIMITIVE_TAG;
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  function values() {
    return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
  }
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_instance;
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, get_BEGIN_OBJ(), get_END_OBJ());
    WriteMode_LIST_instance = new WriteMode('LIST', 1, get_BEGIN_LIST(), get_END_LIST());
    WriteMode_MAP_instance = new WriteMode('MAP', 2, get_BEGIN_OBJ(), get_END_OBJ());
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, get_BEGIN_LIST(), get_END_LIST());
  }
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.c3x_1 = begin;
    this.d3x_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.w33();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.y33(0), _this__u8e3s4.z35());
          var keyKind = keyDescriptor.w33();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.b3q_1.j3r_1) {
              // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.w33(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.v33()) {
      tmp = carrierDescriptor(_this__u8e3s4.y33(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.o3z(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.o3z(lastPosition, currentPosition);
    var result = $this.q3q_1.toString();
    $this.q3q_1.q7(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.p3q_1);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.takePeeked.<anonymous>' call
    $this.p3q_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.p3z(), $this.n3q_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.q3z(currentPosition);
    if (currentPosition === -1) {
      $this.c3u('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.p3z();
    var tmp0 = currentPosition;
    currentPosition = tmp0 + 1 | 0;
    var currentChar = charSequenceGet(tmp, tmp0);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.p3z(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.c3u("Invalid escaped char '" + toString_0(currentChar) + "'");
    }
    $this.q3q_1.j5(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.n3q_1 = startPos;
      $this.r3z();
      if (($this.n3q_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.c3u('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.n3q_1);
    }
    $this.q3q_1.j5(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.c3u("Invalid toHexChar char '" + toString_0(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean($this, start) {
    var current = $this.q3z(start);
    if (current >= charSequenceLength($this.p3z()) ? true : current === -1) {
      $this.c3u('EOF');
    }
    // Inline function 'kotlin.code' call
    var tmp = $this.p3z();
    var tmp0 = current;
    current = tmp0 + 1 | 0;
    var this_0 = charSequenceGet(tmp, tmp0);
    var tmp1_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp1_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp1_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.c3u("Expected valid boolean literal prefix, but had '" + $this.f3v() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.p3z()) - current | 0) < literalSuffix.length) {
      $this.c3u('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.p3z(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.c3u("Expected valid boolean literal prefix, but had '" + $this.f3v() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.n3q_1 = current + literalSuffix.length | 0;
  }
  function AbstractJsonLexer() {
    this.n3q_1 = 0;
    this.o3q_1 = new JsonPath();
    this.p3q_1 = null;
    this.q3q_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).r3z = function () {
  };
  protoOf(AbstractJsonLexer).s3z = function (c) {
    return (((c === _Char___init__impl__6a9atx(125) ? true : c === _Char___init__impl__6a9atx(93)) ? true : c === _Char___init__impl__6a9atx(58)) ? true : c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).r3q = function () {
    var nextToken = this.h3v();
    if (!(nextToken === 10)) {
      this.c3u('Expected EOF after parsing, but had ' + toString_0(charSequenceGet(this.p3z(), this.n3q_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).b3v = function (expected) {
    var token = this.h3v();
    if (!(token === expected)) {
      this.t3z(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).r3w = function (expected) {
    this.r3z();
    var source = this.p3z();
    var cpos = this.n3q_1;
    $l$loop_0: while (true) {
      cpos = this.q3z(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var tmp0 = cpos;
      cpos = tmp0 + 1 | 0;
      var c = charSequenceGet(source, tmp0);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9))
        continue $l$loop_0;
      this.n3q_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.u3z(expected);
    }
    this.n3q_1 = cpos;
    this.u3z(expected);
  };
  protoOf(AbstractJsonLexer).u3z = function (expected) {
    this.n3q_1 = this.n3q_1 - 1 | 0;
    if ((this.n3q_1 >= 0 ? expected === _Char___init__impl__6a9atx(34) : false) ? this.f3v() === 'null' : false) {
      this.v3z("Expected string literal but 'null' literal was found", this.n3q_1 - 4 | 0, "Use 'coerceInputValues = true' in 'Json {}` builder to coerce nulls to default values.");
    }
    this.t3z(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).t3z = function (expectedToken) {
    var expected = expectedToken === 1 ? "quotation mark '\"'" : expectedToken === 4 ? "comma ','" : expectedToken === 5 ? "colon ':'" : expectedToken === 6 ? "start of the object '{'" : expectedToken === 7 ? "end of the object '}'" : expectedToken === 8 ? "start of the array '['" : expectedToken === 9 ? "end of the array ']'" : 'valid token';
    var s = (this.n3q_1 === charSequenceLength(this.p3z()) ? true : this.n3q_1 <= 0) ? 'EOF' : toString_0(charSequenceGet(this.p3z(), this.n3q_1 - 1 | 0));
    this.c3u('Expected ' + expected + ", but had '" + s + "' instead", this.n3q_1 - 1 | 0);
  };
  protoOf(AbstractJsonLexer).c3v = function () {
    var source = this.p3z();
    var cpos = this.n3q_1;
    $l$loop_0: while (true) {
      cpos = this.q3z(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (((ch === _Char___init__impl__6a9atx(32) ? true : ch === _Char___init__impl__6a9atx(10)) ? true : ch === _Char___init__impl__6a9atx(13)) ? true : ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.n3q_1 = cpos;
      return charToTokenClass(ch);
    }
    this.n3q_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).t3w = function (doConsume) {
    var current = this.w3z();
    current = this.q3z(current);
    var len = charSequenceLength(this.p3z()) - current | 0;
    if (len < 4 ? true : current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.p3z(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 ? charToTokenClass(charSequenceGet(this.p3z(), current + 4 | 0)) === 0 : false)
      return false;
    if (doConsume) {
      this.n3q_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).e3x = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.t3w(doConsume) : $super.t3w.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).w3z = function () {
    var current = this.n3q_1;
    $l$loop_0: while (true) {
      current = this.q3z(current);
      if (current === -1)
        break $l$loop_0;
      var c = charSequenceGet(this.p3z(), current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop_0;
      }
    }
    this.n3q_1 = current;
    return current;
  };
  protoOf(AbstractJsonLexer).u3w = function (isLenient) {
    var token = this.c3v();
    var tmp;
    if (isLenient) {
      if (!(token === 1) ? !(token === 0) : false)
        return null;
      tmp = this.f3v();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.e3v();
    }
    var string = tmp;
    this.p3q_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).x3z = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.p3z();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).e3v = function () {
    if (!(this.p3q_1 == null)) {
      return takePeeked(this);
    }
    return this.x3w();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.q3z(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.c3u('EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.o3z(lastPosition, currentPosition);
          currentPosition = this.q3z(currentPosition);
          if (currentPosition === -1) {
            this.c3u('EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.x3z(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.n3q_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).y3w = function () {
    var result = this.f3v();
    if (result === 'null' ? wasUnquotedString(this) : false) {
      this.c3u("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).f3v = function () {
    if (!(this.p3q_1 == null)) {
      return takePeeked(this);
    }
    var current = this.w3z();
    if (current >= charSequenceLength(this.p3z()) ? true : current === -1) {
      this.c3u('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.p3z(), current));
    if (token === 1) {
      return this.e3v();
    }
    if (!(token === 0)) {
      this.c3u('Expected beginning of the string, but got ' + toString_0(charSequenceGet(this.p3z(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.p3z(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.p3z())) {
        usedAppend = true;
        this.o3z(this.n3q_1, current);
        var eof = this.q3z(current);
        if (eof === -1) {
          this.n3q_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.x3z(this.n3q_1, current);
    } else {
      tmp = decodedString(this, this.n3q_1, current);
    }
    var result = tmp;
    this.n3q_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).o3z = function (fromIndex, toIndex) {
    this.q3q_1.l7(this.p3z(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).w3w = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.c3v();
    if (!(lastToken === 8) ? !(lastToken === 6) : false) {
      this.f3v();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.c3v();
      if (lastToken === 1) {
        if (allowLenientStrings) {
          this.f3v();
        } else {
          this.x3w();
        }
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 ? true : tmp0_subject === 6) {
        tokenStack.r(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.n3q_1, 'found ] instead of } at path: ' + this.o3q_1, this.p3z());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.n3q_1, 'found } instead of ] at path: ' + this.o3q_1, this.p3z());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.c3u('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.h3v();
      if (tokenStack.n() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + this.p3z() + "', currentPosition=" + this.n3q_1 + ')';
  };
  protoOf(AbstractJsonLexer).v3w = function (key) {
    var processed = this.x3z(0, this.n3q_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.v3z("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).v3z = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.o3q_1.p3u() + hintMessage, this.p3z());
  };
  protoOf(AbstractJsonLexer).c3u = function (message, position, hint, $super) {
    position = position === VOID ? this.n3q_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.v3z(message, position, hint) : $super.v3z.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).h3x = function () {
    var current = this.w3z();
    current = this.q3z(current);
    if (current >= charSequenceLength(this.p3z()) ? true : current === -1) {
      this.c3u('EOF');
    }
    var tmp;
    if (charSequenceGet(this.p3z(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.p3z())) {
        this.c3u('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var isNegative = false;
    var start = current;
    var hasChars = true;
    $l$loop_0: while (hasChars) {
      var ch = charSequenceGet(this.p3z(), current);
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.c3u("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_0;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_0;
      current = current + 1 | 0;
      hasChars = !(current === charSequenceLength(this.p3z()));
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.c3u("Unexpected symbol '" + toString_0(ch) + "' in numeric literal");
      }
      // Inline function 'kotlin.Long.minus' call
      // Inline function 'kotlin.Long.times' call
      accumulator = accumulator.h8(toLong_0(10)).i9(toLong_0(digit));
      if (accumulator.i8(new Long(0, 0)) > 0) {
        this.c3u('Numeric value overflow');
      }
    }
    if (start === current ? true : isNegative ? start === (current - 1 | 0) : false) {
      this.c3u('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.c3u('EOF');
      }
      if (!(charSequenceGet(this.p3z(), current) === _Char___init__impl__6a9atx(34))) {
        this.c3u('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.n3q_1 = current;
    var tmp_0;
    if (isNegative) {
      tmp_0 = accumulator;
    } else {
      var tmp_1 = accumulator;
      Companion_getInstance_3();
      if (!tmp_1.equals(new Long(0, -2147483648))) {
        tmp_0 = accumulator.m9();
      } else {
        this.c3u('Numeric value overflow');
      }
    }
    return tmp_0;
  };
  protoOf(AbstractJsonLexer).f3x = function () {
    return consumeBoolean(this, this.w3z());
  };
  protoOf(AbstractJsonLexer).g3x = function () {
    var current = this.w3z();
    if (current === charSequenceLength(this.p3z())) {
      this.c3u('EOF');
    }
    var tmp;
    if (charSequenceGet(this.p3z(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean(this, current);
    if (hasQuotation) {
      if (this.n3q_1 === charSequenceLength(this.p3z())) {
        this.c3u('EOF');
      }
      if (!(charSequenceGet(this.p3z(), this.n3q_1) === _Char___init__impl__6a9atx(34))) {
        this.c3u('Expected closing quotation mark');
      }
      this.n3q_1 = this.n3q_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().z3z_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function get_TC_WHITESPACE() {
    return TC_WHITESPACE;
  }
  var TC_WHITESPACE;
  function get_TC_EOF() {
    return TC_EOF;
  }
  var TC_EOF;
  function get_STRING() {
    return STRING;
  }
  var STRING;
  function get_TC_STRING() {
    return TC_STRING;
  }
  var TC_STRING;
  function get_STRING_ESC() {
    return STRING_ESC;
  }
  var STRING_ESC;
  function get_TC_BEGIN_OBJ() {
    return TC_BEGIN_OBJ;
  }
  var TC_BEGIN_OBJ;
  function get_TC_COLON() {
    return TC_COLON;
  }
  var TC_COLON;
  function get_TC_COMMA() {
    return TC_COMMA;
  }
  var TC_COMMA;
  function get_COLON() {
    return COLON;
  }
  var COLON;
  function get_BEGIN_OBJ() {
    return BEGIN_OBJ;
  }
  var BEGIN_OBJ;
  function get_END_OBJ() {
    return END_OBJ;
  }
  var END_OBJ;
  function get_BEGIN_LIST() {
    return BEGIN_LIST;
  }
  var BEGIN_LIST;
  function get_END_LIST() {
    return END_LIST;
  }
  var END_LIST;
  function get_lenientHint() {
    return lenientHint;
  }
  var lenientHint;
  function get_INVALID() {
    return INVALID;
  }
  var INVALID;
  function get_COMMA() {
    return COMMA;
  }
  var COMMA;
  function get_NULL() {
    return NULL;
  }
  var NULL;
  function get_TC_END_OBJ() {
    return TC_END_OBJ;
  }
  var TC_END_OBJ;
  function get_TC_BEGIN_LIST() {
    return TC_BEGIN_LIST;
  }
  var TC_BEGIN_LIST;
  function get_TC_END_LIST() {
    return TC_END_LIST;
  }
  var TC_END_LIST;
  function get_TC_OTHER() {
    return TC_OTHER;
  }
  var TC_OTHER;
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().y3z_1[c] : _Char___init__impl__6a9atx(0);
  }
  function get_ignoreUnknownKeysHint() {
    return ignoreUnknownKeysHint;
  }
  var ignoreUnknownKeysHint;
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.y3z_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.z3z_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.y3z_1 = charArray(117);
    this.z3z_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function get_specialFlowingValuesHint() {
    return specialFlowingValuesHint;
  }
  var specialFlowingValuesHint;
  function get_allowStructuredMapKeysHint() {
    return allowStructuredMapKeysHint;
  }
  var allowStructuredMapKeysHint;
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.e40_1 = source;
  }
  protoOf(StringJsonLexer).p3z = function () {
    return this.e40_1;
  };
  protoOf(StringJsonLexer).q3z = function (position) {
    return position < this.e40_1.length ? position : -1;
  };
  protoOf(StringJsonLexer).h3v = function () {
    var source = this.e40_1;
    $l$loop: while (!(this.n3q_1 === -1) ? this.n3q_1 < source.length : false) {
      var tmp1 = this.n3q_1;
      this.n3q_1 = tmp1 + 1 | 0;
      var ch = charSequenceGet(source, tmp1);
      var tc = charToTokenClass(ch);
      var tmp;
      if (tc === get_TC_WHITESPACE()) {
        continue $l$loop;
      } else {
        tmp = tc;
      }
      return tmp;
    }
    return get_TC_EOF();
  };
  protoOf(StringJsonLexer).s3w = function () {
    var current = this.w3z();
    if (current === this.e40_1.length ? true : current === -1)
      return false;
    if (charSequenceGet(this.e40_1, current) === _Char___init__impl__6a9atx(44)) {
      this.n3q_1 = this.n3q_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(StringJsonLexer).d3v = function () {
    var current = this.n3q_1;
    if (current === -1)
      return false;
    $l$loop: while (current < this.e40_1.length) {
      var c = charSequenceGet(this.e40_1, current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.n3q_1 = current;
      return this.s3z(c);
    }
    this.n3q_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).w3z = function () {
    var current = this.n3q_1;
    if (current === -1)
      return current;
    $l$loop: while (current < this.e40_1.length) {
      var c = charSequenceGet(this.e40_1, current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.n3q_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).r3w = function (expected) {
    if (this.n3q_1 === -1) {
      this.u3z(expected);
    }
    var source = this.e40_1;
    $l$loop: while (this.n3q_1 < source.length) {
      var tmp1 = this.n3q_1;
      this.n3q_1 = tmp1 + 1 | 0;
      var c = charSequenceGet(source, tmp1);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      if (c === expected)
        return Unit_instance;
      this.u3z(expected);
    }
    this.u3z(expected);
  };
  protoOf(StringJsonLexer).x3w = function () {
    this.r3w(get_STRING());
    var current = this.n3q_1;
    var closingQuote = indexOf(this.e40_1, _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.t3z(get_TC_STRING());
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.e40_1, i) === get_STRING_ESC()) {
          return this.consumeString2(this.e40_1, this.n3q_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.n3q_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.e40_1.substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).z3w = function (keyToMatch, isLenient) {
    var positionSnapshot = this.n3q_1;
    try {
      if (!(this.h3v() === get_TC_BEGIN_OBJ()))
        return null;
      var firstKey = isLenient ? this.x3w() : this.y3w();
      if (firstKey === keyToMatch) {
        if (!(this.h3v() === get_TC_COLON()))
          return null;
        var result = isLenient ? this.e3v() : this.y3w();
        return result;
      }
      return null;
    }finally {
      this.n3q_1 = positionSnapshot;
    }
  };
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.d3q_1;
  }
  function JsonToStringWriter() {
    this.e3q_1 = StringBuilder_init_$Create$_0(128);
  }
  protoOf(JsonToStringWriter).j3t = function (value) {
    this.e3q_1.h5(value);
  };
  protoOf(JsonToStringWriter).d3t = function (char) {
    this.e3q_1.j5(char);
  };
  protoOf(JsonToStringWriter).f3t = function (text) {
    this.e3q_1.i5(text);
  };
  protoOf(JsonToStringWriter).p3t = function (text) {
    printQuoted(this.e3q_1, text);
  };
  protoOf(JsonToStringWriter).un = function () {
    this.e3q_1.r7();
  };
  protoOf(JsonToStringWriter).toString = function () {
    return this.e3q_1.toString();
  };
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).o33 = get_isNullable;
  protoOf(defer$1).v33 = get_isInline;
  protoOf(defer$1).t33 = get_annotations;
  protoOf(PolymorphismValidator).z3k = contextual;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion();
  Companion_instance_1 = new Companion_0();
  Companion_instance_2 = new Companion_1();
  Companion_instance_3 = new Companion_2();
  Tombstone_instance = new Tombstone();
  PRIMITIVE_TAG = 'primitive';
  TC_WHITESPACE = 3;
  TC_EOF = 10;
  STRING = _Char___init__impl__6a9atx(34);
  TC_STRING = 1;
  STRING_ESC = _Char___init__impl__6a9atx(92);
  TC_BEGIN_OBJ = 6;
  TC_COLON = 5;
  TC_COMMA = 4;
  COLON = _Char___init__impl__6a9atx(58);
  BEGIN_OBJ = _Char___init__impl__6a9atx(123);
  END_OBJ = _Char___init__impl__6a9atx(125);
  BEGIN_LIST = _Char___init__impl__6a9atx(91);
  END_LIST = _Char___init__impl__6a9atx(93);
  lenientHint = "Use 'isLenient = true' in 'Json {}` builder to accept non-compliant JSON.";
  INVALID = _Char___init__impl__6a9atx(0);
  COMMA = _Char___init__impl__6a9atx(44);
  NULL = 'null';
  TC_END_OBJ = 7;
  TC_BEGIN_LIST = 8;
  TC_END_LIST = 9;
  TC_OTHER = 0;
  ignoreUnknownKeysHint = "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.";
  specialFlowingValuesHint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
  allowStructuredMapKeysHint = "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.";
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Json_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json-js-ir.js.map
