(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core-js-ir'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core-js-ir'.");
    }
    root['kotlinx-serialization-kotlinx-serialization-core-js-ir'] = factory(typeof this['kotlinx-serialization-kotlinx-serialization-core-js-ir'] === 'undefined' ? {} : this['kotlinx-serialization-kotlinx-serialization-core-js-ir'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.r9;
  var interfaceMeta = kotlin_kotlin.$_$.y8;
  var setMetadataFor = kotlin_kotlin.$_$.s9;
  var VOID = kotlin_kotlin.$_$.f;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.h4;
  var Unit_instance = kotlin_kotlin.$_$.r4;
  var emptyList = kotlin_kotlin.$_$.v5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.h;
  var lazy = kotlin_kotlin.$_$.hd;
  var classMeta = kotlin_kotlin.$_$.o8;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var KProperty1 = kotlin_kotlin.$_$.ga;
  var getPropertyCallableRef = kotlin_kotlin.$_$.v8;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.i1;
  var objectCreate = kotlin_kotlin.$_$.p9;
  var captureStack = kotlin_kotlin.$_$.i8;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.k1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.m1;
  var IllegalArgumentException = kotlin_kotlin.$_$.fc;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.h5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.j;
  var THROW_CCE = kotlin_kotlin.$_$.mc;
  var KClass = kotlin_kotlin.$_$.fa;
  var isInterface = kotlin_kotlin.$_$.h9;
  var Triple = kotlin_kotlin.$_$.nc;
  var getKClass = kotlin_kotlin.$_$.e;
  var Pair = kotlin_kotlin.$_$.jc;
  var Entry = kotlin_kotlin.$_$.z4;
  var LinkedHashMap = kotlin_kotlin.$_$.w4;
  var MutableMap = kotlin_kotlin.$_$.c5;
  var Map = kotlin_kotlin.$_$.a5;
  var HashMap = kotlin_kotlin.$_$.u4;
  var LinkedHashSet = kotlin_kotlin.$_$.x4;
  var MutableSet = kotlin_kotlin.$_$.d5;
  var Set = kotlin_kotlin.$_$.e5;
  var HashSet = kotlin_kotlin.$_$.v4;
  var ArrayList = kotlin_kotlin.$_$.s4;
  var MutableList = kotlin_kotlin.$_$.b5;
  var List = kotlin_kotlin.$_$.y4;
  var Collection = kotlin_kotlin.$_$.t4;
  var copyToArray = kotlin_kotlin.$_$.t5;
  var toString = kotlin_kotlin.$_$.w9;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.l1;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.m2;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.o2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.n2;
  var Result = kotlin_kotlin.$_$.kc;
  var ensureNotNull = kotlin_kotlin.$_$.cd;
  var equals = kotlin_kotlin.$_$.r8;
  var getStringHashCode = kotlin_kotlin.$_$.w8;
  var isBlank = kotlin_kotlin.$_$.ta;
  var toList = kotlin_kotlin.$_$.g7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.k;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.q;
  var toHashSet = kotlin_kotlin.$_$.d7;
  var toBooleanArray = kotlin_kotlin.$_$.c7;
  var withIndex = kotlin_kotlin.$_$.m7;
  var to = kotlin_kotlin.$_$.nd;
  var toMap = kotlin_kotlin.$_$.h7;
  var lazy_0 = kotlin_kotlin.$_$.id;
  var contentEquals = kotlin_kotlin.$_$.i5;
  var until = kotlin_kotlin.$_$.ea;
  var joinToString = kotlin_kotlin.$_$.f6;
  var objectMeta = kotlin_kotlin.$_$.q9;
  var Long = kotlin_kotlin.$_$.hc;
  var Char = kotlin_kotlin.$_$.yb;
  var Duration__toIsoString_impl_9h6wsm = kotlin_kotlin.$_$.c2;
  var Duration = kotlin_kotlin.$_$.xb;
  var Companion_getInstance = kotlin_kotlin.$_$.j4;
  var toIntOrNull = kotlin_kotlin.$_$.lb;
  var hashCode = kotlin_kotlin.$_$.x8;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.p1;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.l;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.r;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.v;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.w;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.n;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.o;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.t;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.u;
  var isArray = kotlin_kotlin.$_$.z8;
  var arrayIterator = kotlin_kotlin.$_$.g8;
  var asList = kotlin_kotlin.$_$.g5;
  var step = kotlin_kotlin.$_$.da;
  var getValue = kotlin_kotlin.$_$.c6;
  var longArray = kotlin_kotlin.$_$.m9;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.l4;
  var get_lastIndex = kotlin_kotlin.$_$.h6;
  var countTrailingZeroBits = kotlin_kotlin.$_$.ad;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.p;
  var KTypeParameter = kotlin_kotlin.$_$.ha;
  var fillArrayVal = kotlin_kotlin.$_$.t8;
  var booleanArray = kotlin_kotlin.$_$.h8;
  var emptyMap = kotlin_kotlin.$_$.w5;
  var contentHashCode = kotlin_kotlin.$_$.j5;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.k4;
  var isCharArray = kotlin_kotlin.$_$.c9;
  var charArray = kotlin_kotlin.$_$.k8;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var isDoubleArray = kotlin_kotlin.$_$.e9;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.e4;
  var isFloatArray = kotlin_kotlin.$_$.f9;
  var isLongArray = kotlin_kotlin.$_$.i9;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.p4;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.o3;
  var ULongArray = kotlin_kotlin.$_$.sc;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.k3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.h3;
  var ULongArray__get_impl_pr71q9 = kotlin_kotlin.$_$.m3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.i3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.f4;
  var isIntArray = kotlin_kotlin.$_$.g9;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.o4;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.f3;
  var UIntArray = kotlin_kotlin.$_$.qc;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.b3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.y2;
  var UIntArray__get_impl_gp5kza = kotlin_kotlin.$_$.d3;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.z2;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.g4;
  var isShortArray = kotlin_kotlin.$_$.j9;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.q4;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.x3;
  var UShortArray = kotlin_kotlin.$_$.uc;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.t3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.q3;
  var UShortArray__get_impl_fnbhmx = kotlin_kotlin.$_$.v3;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.r3;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var isByteArray = kotlin_kotlin.$_$.b9;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.n4;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.w2;
  var UByteArray = kotlin_kotlin.$_$.oc;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.t2;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.p2;
  var UByteArray__get_impl_t5f3hv = kotlin_kotlin.$_$.u2;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.q2;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.b4;
  var isBooleanArray = kotlin_kotlin.$_$.a9;
  var coerceAtLeast = kotlin_kotlin.$_$.y9;
  var copyOf = kotlin_kotlin.$_$.n5;
  var copyOf_0 = kotlin_kotlin.$_$.p5;
  var copyOf_1 = kotlin_kotlin.$_$.q5;
  var copyOf_2 = kotlin_kotlin.$_$.l5;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.p3;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.l3;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.n3;
  var copyOf_3 = kotlin_kotlin.$_$.s5;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.g3;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.c3;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.e3;
  var copyOf_4 = kotlin_kotlin.$_$.k5;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.y3;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.u3;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.w3;
  var copyOf_5 = kotlin_kotlin.$_$.o5;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.x2;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.s2;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.v2;
  var copyOf_6 = kotlin_kotlin.$_$.m5;
  var Unit = kotlin_kotlin.$_$.wc;
  var trimIndent = kotlin_kotlin.$_$.ub;
  var equals_0 = kotlin_kotlin.$_$.oa;
  var charSequenceLength = kotlin_kotlin.$_$.m8;
  var charSequenceGet = kotlin_kotlin.$_$.l8;
  var toString_0 = kotlin_kotlin.$_$.k2;
  var titlecase = kotlin_kotlin.$_$.ib;
  var isLowerCase = kotlin_kotlin.$_$.wa;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.i4;
  var ULong = kotlin_kotlin.$_$.tc;
  var UInt = kotlin_kotlin.$_$.rc;
  var UShort = kotlin_kotlin.$_$.vc;
  var UByte = kotlin_kotlin.$_$.pc;
  var mapOf = kotlin_kotlin.$_$.p6;
  var lastOrNull = kotlin_kotlin.$_$.k6;
  var get_lastIndex_0 = kotlin_kotlin.$_$.i6;
  var get_js = kotlin_kotlin.$_$.l9;
  var findAssociatedObject = kotlin_kotlin.$_$.c;
  var get_indices = kotlin_kotlin.$_$.e6;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.t1;
  var get_indices_0 = kotlin_kotlin.$_$.d6;
  var Companion_instance = kotlin_kotlin.$_$.m4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.l2;
  var createFailure = kotlin_kotlin.$_$.bd;
  //endregion
  //region block: pre-declaration
  setMetadataFor(SerializationStrategy, 'SerializationStrategy', interfaceMeta);
  setMetadataFor(DeserializationStrategy, 'DeserializationStrategy', interfaceMeta);
  setMetadataFor(KSerializer, 'KSerializer', interfaceMeta, VOID, [SerializationStrategy, DeserializationStrategy]);
  setMetadataFor(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(PolymorphicSerializer, 'PolymorphicSerializer', classMeta, AbstractPolymorphicSerializer);
  setMetadataFor(SealedClassSerializer, 'SealedClassSerializer', classMeta, AbstractPolymorphicSerializer);
  setMetadataFor(StringFormat, 'StringFormat', interfaceMeta);
  setMetadataFor(BinaryFormat, 'BinaryFormat', interfaceMeta);
  setMetadataFor(SerializationException, 'SerializationException', classMeta, IllegalArgumentException, VOID, SerializationException_init_$Create$);
  setMetadataFor(MissingFieldException, 'MissingFieldException', classMeta, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  setMetadataFor(SerialDescriptor, 'SerialDescriptor', interfaceMeta);
  setMetadataFor(ContextDescriptor, 'ContextDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(elementDescriptors$1$1, VOID, classMeta);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta);
  setMetadataFor(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder', classMeta);
  setMetadataFor(CachedNames, 'CachedNames', interfaceMeta);
  setMetadataFor(SerialDescriptorImpl, 'SerialDescriptorImpl', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(SerialKind, 'SerialKind', classMeta);
  setMetadataFor(ENUM, 'ENUM', objectMeta, SerialKind);
  setMetadataFor(CONTEXTUAL, 'CONTEXTUAL', objectMeta, SerialKind);
  setMetadataFor(PrimitiveKind, 'PrimitiveKind', classMeta, SerialKind);
  setMetadataFor(BOOLEAN, 'BOOLEAN', objectMeta, PrimitiveKind);
  setMetadataFor(BYTE, 'BYTE', objectMeta, PrimitiveKind);
  setMetadataFor(CHAR, 'CHAR', objectMeta, PrimitiveKind);
  setMetadataFor(SHORT, 'SHORT', objectMeta, PrimitiveKind);
  setMetadataFor(INT, 'INT', objectMeta, PrimitiveKind);
  setMetadataFor(LONG, 'LONG', objectMeta, PrimitiveKind);
  setMetadataFor(FLOAT, 'FLOAT', objectMeta, PrimitiveKind);
  setMetadataFor(DOUBLE, 'DOUBLE', objectMeta, PrimitiveKind);
  setMetadataFor(STRING, 'STRING', objectMeta, PrimitiveKind);
  setMetadataFor(StructureKind, 'StructureKind', classMeta, SerialKind);
  setMetadataFor(CLASS, 'CLASS', objectMeta, StructureKind);
  setMetadataFor(LIST, 'LIST', objectMeta, StructureKind);
  setMetadataFor(MAP, 'MAP', objectMeta, StructureKind);
  setMetadataFor(OBJECT, 'OBJECT', objectMeta, StructureKind);
  setMetadataFor(PolymorphicKind, 'PolymorphicKind', classMeta, SerialKind);
  setMetadataFor(SEALED, 'SEALED', objectMeta, PolymorphicKind);
  setMetadataFor(OPEN, 'OPEN', objectMeta, PolymorphicKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.o32(this);
  }
  setMetadataFor(Decoder, 'Decoder', interfaceMeta);
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.x35(descriptor, index, deserializer, previousValue) : $super.x35.call(this, descriptor, index, deserializer, previousValue);
  }
  setMetadataFor(CompositeDecoder, 'CompositeDecoder', interfaceMeta);
  setMetadataFor(AbstractDecoder, 'AbstractDecoder', classMeta, VOID, [Decoder, CompositeDecoder]);
  function encodeNotNullMark() {
  }
  function beginCollection(descriptor, collectionSize) {
    return this.l35(descriptor);
  }
  function encodeSerializableValue(serializer, value) {
    serializer.n32(this, value);
  }
  setMetadataFor(Encoder, 'Encoder', interfaceMeta);
  setMetadataFor(AbstractEncoder, 'AbstractEncoder', classMeta, VOID, [Encoder]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(NothingSerializer_0, 'NothingSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(DurationSerializer, 'DurationSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ListLikeDescriptor, 'ListLikeDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(ArrayListClassDesc, 'ArrayListClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(HashSetClassDesc, 'HashSetClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(MapLikeDescriptor, 'MapLikeDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(HashMapClassDesc, 'HashMapClassDesc', classMeta, MapLikeDescriptor);
  setMetadataFor(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', classMeta, MapLikeDescriptor);
  setMetadataFor(ArrayClassDesc, 'ArrayClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', classMeta, ListLikeDescriptor);
  setMetadataFor(AbstractCollectionSerializer, 'AbstractCollectionSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(CollectionLikeSerializer, 'CollectionLikeSerializer', classMeta, AbstractCollectionSerializer);
  setMetadataFor(CollectionSerializer, 'CollectionSerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(ArrayListSerializer, 'ArrayListSerializer', classMeta, CollectionSerializer);
  setMetadataFor(HashSetSerializer, 'HashSetSerializer', classMeta, CollectionSerializer);
  setMetadataFor(LinkedHashSetSerializer, 'LinkedHashSetSerializer', classMeta, CollectionSerializer);
  setMetadataFor(MapLikeSerializer, 'MapLikeSerializer', classMeta, AbstractCollectionSerializer);
  setMetadataFor(HashMapSerializer, 'HashMapSerializer', classMeta, MapLikeSerializer);
  setMetadataFor(LinkedHashMapSerializer, 'LinkedHashMapSerializer', classMeta, MapLikeSerializer);
  setMetadataFor(ReferenceArraySerializer, 'ReferenceArraySerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(PrimitiveArraySerializer, 'PrimitiveArraySerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(ElementMarker, 'ElementMarker', classMeta);
  setMetadataFor(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(InlineClassDescriptor, 'InlineClassDescriptor', classMeta, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  setMetadataFor(GeneratedSerializer, 'GeneratedSerializer', interfaceMeta, VOID, [KSerializer]);
  setMetadataFor(InlinePrimitiveDescriptor$1, VOID, classMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(NoOpEncoder, 'NoOpEncoder', objectMeta, AbstractEncoder);
  setMetadataFor(NothingSerialDescriptor, 'NothingSerialDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(NullableSerializer, 'NullableSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(SerialDescriptorForNullable, 'SerialDescriptorForNullable', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(ObjectSerializer, 'ObjectSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(SerializerFactory, 'SerializerFactory', interfaceMeta);
  setMetadataFor(CharArraySerializer_0, 'CharArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(DoubleArraySerializer_0, 'DoubleArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(FloatArraySerializer_0, 'FloatArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(LongArraySerializer_0, 'LongArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ULongArraySerializer_0, 'ULongArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(IntArraySerializer_0, 'IntArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UIntArraySerializer_0, 'UIntArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ShortArraySerializer_0, 'ShortArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UShortArraySerializer_0, 'UShortArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ByteArraySerializer_0, 'ByteArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UByteArraySerializer_0, 'UByteArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(BooleanArraySerializer_0, 'BooleanArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(CharArrayBuilder, 'CharArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(DoubleArrayBuilder, 'DoubleArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(FloatArrayBuilder, 'FloatArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(LongArrayBuilder, 'LongArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ULongArrayBuilder, 'ULongArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(IntArrayBuilder, 'IntArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UIntArrayBuilder, 'UIntArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ShortArrayBuilder, 'ShortArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UShortArrayBuilder, 'UShortArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ByteArrayBuilder, 'ByteArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UByteArrayBuilder, 'UByteArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(BooleanArrayBuilder, 'BooleanArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(StringSerializer, 'StringSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(CharSerializer, 'CharSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(DoubleSerializer, 'DoubleSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(FloatSerializer, 'FloatSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(LongSerializer, 'LongSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(IntSerializer, 'IntSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ShortSerializer, 'ShortSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ByteSerializer, 'ByteSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(BooleanSerializer, 'BooleanSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UnitSerializer, 'UnitSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(TaggedDecoder, 'TaggedDecoder', classMeta, VOID, [Decoder, CompositeDecoder]);
  setMetadataFor(NamedValueDecoder, 'NamedValueDecoder', classMeta, TaggedDecoder);
  setMetadataFor(MapEntry, 'MapEntry', classMeta, VOID, [Entry]);
  setMetadataFor(KeyValueSerializer, 'KeyValueSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(MapEntrySerializer_0, 'MapEntrySerializer', classMeta, KeyValueSerializer);
  setMetadataFor(PairSerializer_0, 'PairSerializer', classMeta, KeyValueSerializer);
  setMetadataFor(TripleSerializer_0, 'TripleSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(ULongSerializer, 'ULongSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UIntSerializer, 'UIntSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UShortSerializer, 'UShortSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UByteSerializer, 'UByteSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(SerializersModule, 'SerializersModule', classMeta);
  setMetadataFor(SerialModuleImpl, 'SerialModuleImpl', classMeta, SerializersModule);
  setMetadataFor(ContextualProvider, 'ContextualProvider', classMeta);
  setMetadataFor(Argless, 'Argless', classMeta, ContextualProvider);
  setMetadataFor(WithTypeArguments, 'WithTypeArguments', classMeta, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.x3k(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  setMetadataFor(SerializersModuleCollector, 'SerializersModuleCollector', interfaceMeta);
  setMetadataFor(SerializableWith, 'SerializableWith', classMeta, VOID, VOID, VOID, 0);
  setMetadataFor(createCache$1, VOID, classMeta);
  setMetadataFor(createParametrizedCache$1, VOID, classMeta);
  //endregion
  function KSerializer() {
  }
  function SerializationStrategy() {
  }
  function DeserializationStrategy() {
  }
  function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.x32('type', serializer_1(StringCompanionObject_instance).m32());
      $this$buildSerialDescriptor.x32('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.y32_1.z5() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.r32_1 = this$0.z32_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.y32_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.y32_1 = baseClass;
    this.z32_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.a33_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).b33 = function () {
    return this.y32_1;
  };
  protoOf(PolymorphicSerializer).m32 = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.a33_1;
    descriptor$factory();
    return this_0.f2();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + this.y32_1 + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
    var tmp0_elvis_lhs = _this__u8e3s4.e33(encoder, value);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.b33());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.d33(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.b33());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.m32();
    }, null);
  }
  function SealedClassSerializer() {
  }
  function StringFormat() {
  }
  function BinaryFormat() {
  }
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.j33_1 = missingFields;
  }
  function serializerOrNull(_this__u8e3s4) {
    var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
    var tmp;
    if (failOnMissingTypeArgSerializer) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var tmp0_iterator = typeArguments.u();
      while (tmp0_iterator.v()) {
        var item = tmp0_iterator.w();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.r(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var tmp0_iterator_0 = typeArguments.u();
      while (tmp0_iterator_0.v()) {
        var item_0 = tmp0_iterator_0.w();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var tmp$ret$3 = tmp_0;
        destination_0.r(tmp$ret$3);
      }
      tmp = destination_0;
    }
    var serializers = tmp;
    return serializers;
  }
  function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
    return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
  }
  function serializer(_this__u8e3s4, type) {
    var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      platformSpecificSerializerNotRegistered(kclass(type));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerOrNull_0(_this__u8e3s4, type) {
    return serializerByKTypeImpl(_this__u8e3s4, type, false);
  }
  function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp;
    if (((_this__u8e3s4.equals(getKClass(Collection)) ? true : _this__u8e3s4.equals(getKClass(List))) ? true : _this__u8e3s4.equals(getKClass(MutableList))) ? true : _this__u8e3s4.equals(getKClass(ArrayList))) {
      tmp = new ArrayListSerializer(serializers.f1(0));
    } else if (_this__u8e3s4.equals(getKClass(HashSet))) {
      tmp = new HashSetSerializer(serializers.f1(0));
    } else if ((_this__u8e3s4.equals(getKClass(Set)) ? true : _this__u8e3s4.equals(getKClass(MutableSet))) ? true : _this__u8e3s4.equals(getKClass(LinkedHashSet))) {
      tmp = new LinkedHashSetSerializer(serializers.f1(0));
    } else if (_this__u8e3s4.equals(getKClass(HashMap))) {
      tmp = new HashMapSerializer(serializers.f1(0), serializers.f1(1));
    } else if ((_this__u8e3s4.equals(getKClass(Map)) ? true : _this__u8e3s4.equals(getKClass(MutableMap))) ? true : _this__u8e3s4.equals(getKClass(LinkedHashMap))) {
      tmp = new LinkedHashMapSerializer(serializers.f1(0), serializers.f1(1));
    } else if (_this__u8e3s4.equals(getKClass(Entry))) {
      tmp = MapEntrySerializer(serializers.f1(0), serializers.f1(1));
    } else if (_this__u8e3s4.equals(getKClass(Pair))) {
      tmp = PairSerializer(serializers.f1(0), serializers.f1(1));
    } else if (_this__u8e3s4.equals(getKClass(Triple))) {
      tmp = TripleSerializer(serializers.f1(0), serializers.f1(1), serializers.f1(2));
    } else {
      var tmp_0;
      if (isReferenceArray(_this__u8e3s4)) {
        var tmp_1 = elementClassifierIfArray();
        tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface(tmp_1, KClass) : false) ? tmp_1 : THROW_CCE(), serializers.f1(0));
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(serializers);
    return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
  }
  function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
    var rootClass = kclass(type);
    var isNullable = type.p6();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.o6();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'kotlinx.serialization.serializerByKTypeImpl.<anonymous>' call
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlin.requireNotNull' call
        var value = item.ee_1;
        // Inline function 'kotlin.contracts.contract' call
        if (value == null) {
          // Inline function 'kotlinx.serialization.serializerByKTypeImpl.<anonymous>.<anonymous>' call
          var message = 'Star projections in type arguments are not allowed, but had ' + type;
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          tmp$ret$1 = value;
          break $l$block;
        }
      }
      var tmp$ret$2 = tmp$ret$1;
      destination.r(tmp$ret$2);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.b1()) {
      tmp = findCachedSerializer(rootClass, isNullable);
    } else {
      var cachedResult = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
      var tmp_0;
      if (failOnMissingTypeArgSerializer) {
        // Inline function 'kotlin.Result.getOrNull' call
        var tmp_1;
        if (_Result___get_isFailure__impl__jpiriv(cachedResult)) {
          tmp_1 = null;
        } else {
          var tmp_2 = _Result___get_value__impl__bjfvqg(cachedResult);
          tmp_1 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
        }
        tmp_0 = tmp_1;
      } else {
        // Inline function 'kotlin.getOrElse' call
        // Inline function 'kotlin.contracts.contract' call
        var exception = Result__exceptionOrNull_impl_p6xea9(cachedResult);
        var tmp_3;
        if (exception == null) {
          var tmp_4 = _Result___get_value__impl__bjfvqg(cachedResult);
          tmp_3 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
        } else {
          return null;
        }
        tmp_0 = tmp_3;
      }
      tmp = tmp_0;
    }
    var cachedSerializer = tmp;
    if (cachedSerializer == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return cachedSerializer;
    }
    var tmp_5;
    if (typeArguments.b1()) {
      tmp_5 = _this__u8e3s4.l33(rootClass);
    } else {
      var tmp1_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
      var tmp_6;
      if (tmp1_elvis_lhs == null) {
        return null;
      } else {
        tmp_6 = tmp1_elvis_lhs;
      }
      var serializers = tmp_6;
      var tmp2_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
      tmp_5 = tmp2_elvis_lhs == null ? _this__u8e3s4.k33(rootClass, serializers) : tmp2_elvis_lhs;
    }
    var contextualSerializer = tmp_5;
    var tmp_7;
    if (contextualSerializer == null) {
      tmp_7 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_7 = isInterface(contextualSerializer, KSerializer) ? contextualSerializer : THROW_CCE();
    }
    var tmp4_safe_receiver = tmp_7;
    return tmp4_safe_receiver == null ? null : nullable(tmp4_safe_receiver, isNullable);
  }
  function nullable(_this__u8e3s4, shouldBeNullable) {
    if (shouldBeNullable)
      return get_nullable(_this__u8e3s4);
    return isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
  }
  function serializer_0(_this__u8e3s4) {
    var tmp0_elvis_lhs = serializerOrNull(_this__u8e3s4);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      serializerNotRegistered(_this__u8e3s4);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.f1(0).n6();
    };
  }
  function get_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE;
  }
  var SERIALIZERS_CACHE;
  function get_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE_NULLABLE;
  }
  var SERIALIZERS_CACHE_NULLABLE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  function findCachedSerializer(clazz, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().m33(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().m33(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().n33(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().n33(clazz, types);
    }
    return tmp;
  }
  function SERIALIZERS_CACHE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    return serializerOrNull(it);
  }
  function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_safe_receiver = serializerOrNull(it);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
    return function () {
      return $types.f1(0).n6();
    };
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    var tmp0_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
    return function () {
      return $types.f1(0).n6();
    };
  }
  var properties_initialized_SerializersCache_kt_q8kf25;
  function _init_properties_SerializersCache_kt__hgwi2p() {
    if (!properties_initialized_SerializersCache_kt_q8kf25) {
      properties_initialized_SerializersCache_kt_q8kf25 = true;
      SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
      SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
    }
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.m32().o33()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_1(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_15(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function MapEntrySerializer(keySerializer, valueSerializer) {
    return new MapEntrySerializer_0(keySerializer, valueSerializer);
  }
  function PairSerializer(keySerializer, valueSerializer) {
    return new PairSerializer_0(keySerializer, valueSerializer);
  }
  function TripleSerializer(aSerializer, bSerializer, cSerializer) {
    return new TripleSerializer_0(aSerializer, bSerializer, cSerializer);
  }
  function ArraySerializer(kClass, elementSerializer) {
    return new ReferenceArraySerializer(kClass, elementSerializer);
  }
  function MapSerializer(keySerializer, valueSerializer) {
    return new LinkedHashMapSerializer(keySerializer, valueSerializer);
  }
  function ListSerializer(elementSerializer) {
    return new ArrayListSerializer(elementSerializer);
  }
  function SetSerializer(elementSerializer) {
    return new LinkedHashSetSerializer(elementSerializer);
  }
  function withContext(_this__u8e3s4, context) {
    return new ContextDescriptor(_this__u8e3s4, context);
  }
  function ContextDescriptor(original, kClass) {
    this.p33_1 = original;
    this.q33_1 = kClass;
    this.r33_1 = this.p33_1.s33() + '<' + this.q33_1.z5() + '>';
  }
  protoOf(ContextDescriptor).t33 = function () {
    return this.p33_1.t33();
  };
  protoOf(ContextDescriptor).u33 = function () {
    return this.p33_1.u33();
  };
  protoOf(ContextDescriptor).v33 = function () {
    return this.p33_1.v33();
  };
  protoOf(ContextDescriptor).o33 = function () {
    return this.p33_1.o33();
  };
  protoOf(ContextDescriptor).w33 = function () {
    return this.p33_1.w33();
  };
  protoOf(ContextDescriptor).x33 = function (index) {
    return this.p33_1.x33(index);
  };
  protoOf(ContextDescriptor).y33 = function (index) {
    return this.p33_1.y33(index);
  };
  protoOf(ContextDescriptor).z33 = function (name) {
    return this.p33_1.z33(name);
  };
  protoOf(ContextDescriptor).a34 = function (index) {
    return this.p33_1.a34(index);
  };
  protoOf(ContextDescriptor).b34 = function (index) {
    return this.p33_1.b34(index);
  };
  protoOf(ContextDescriptor).s33 = function () {
    return this.r33_1;
  };
  protoOf(ContextDescriptor).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof ContextDescriptor ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var another = tmp;
    return equals(this.p33_1, another.p33_1) ? another.q33_1.equals(this.q33_1) : false;
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.q33_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.r33_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + this.q33_1 + ', original: ' + this.p33_1 + ')';
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.descriptors.getContextualDescriptor.<anonymous>' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.l33(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.m32();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.q33_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.c34_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new _no_name_provided__qut3iv(_this__u8e3s4);
  }
  function elementDescriptors$1$1($this_elementDescriptors) {
    this.g34_1 = $this_elementDescriptors;
    this.f34_1 = $this_elementDescriptors.u33();
  }
  protoOf(elementDescriptors$1$1).v = function () {
    return this.f34_1 > 0;
  };
  protoOf(elementDescriptors$1$1).w = function () {
    var tmp = this.g34_1.u33();
    var tmp1 = this.f34_1;
    this.f34_1 = tmp1 - 1 | 0;
    return this.g34_1.y33(tmp - tmp1 | 0);
  };
  function _no_name_provided__qut3iv($this_elementDescriptors) {
    this.h34_1 = $this_elementDescriptors;
  }
  protoOf(_no_name_provided__qut3iv).u = function () {
    // Inline function 'kotlinx.serialization.descriptors.<get-elementDescriptors>.<anonymous>' call
    return new elementDescriptors$1$1(this.h34_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!equals(kind, CLASS_getInstance())) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.s32_1.n(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.p32_1 = serialName;
    this.q32_1 = false;
    this.r32_1 = emptyList();
    this.s32_1 = ArrayList_init_$Create$_0();
    this.t32_1 = HashSet_init_$Create$();
    this.u32_1 = ArrayList_init_$Create$_0();
    this.v32_1 = ArrayList_init_$Create$_0();
    this.w32_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).i34 = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!this.t32_1.r(elementName)) {
      // Inline function 'kotlinx.serialization.descriptors.ClassSerialDescriptorBuilder.element.<anonymous>' call
      var message = "Element with name '" + elementName + "' is already registered in " + this.p32_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.s32_1.r(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.u32_1.r(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.v32_1.r(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.w32_1.r(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).x32 = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.i34(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.i34.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
    var tmp;
    if (builderAction === VOID) {
      tmp = buildClassSerialDescriptor$lambda;
    } else {
      tmp = builderAction;
    }
    builderAction = tmp;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildClassSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builderAction(sdBuilder);
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.s32_1.n(), toList(typeParameters), sdBuilder);
  }
  function _get__hashCode__tgwhef($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.u34_1;
    _hashCode$factory();
    return this_0.f2();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.t34_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.a34(it) + ': ' + this$0.y33(it).s33();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.j34_1 = serialName;
    this.k34_1 = kind;
    this.l34_1 = elementsCount;
    this.m34_1 = builder.r32_1;
    this.n34_1 = toHashSet(builder.s32_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.s32_1;
    tmp.o34_1 = copyToArray(this_0);
    this.p34_1 = compactArray(builder.u32_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.v32_1;
    tmp_0.q34_1 = copyToArray(this_1);
    this.r34_1 = toBooleanArray(builder.w32_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.o34_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var tmp0_iterator = this_2.u();
    while (tmp0_iterator.v()) {
      var item = tmp0_iterator.w();
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.name2Index.<anonymous>' call
      var tmp$ret$2 = to(item.ec_1, item.dc_1);
      destination.r(tmp$ret$2);
    }
    tmp_1.s34_1 = toMap(destination);
    this.t34_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.u34_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).s33 = function () {
    return this.j34_1;
  };
  protoOf(SerialDescriptorImpl).w33 = function () {
    return this.k34_1;
  };
  protoOf(SerialDescriptorImpl).u33 = function () {
    return this.l34_1;
  };
  protoOf(SerialDescriptorImpl).t33 = function () {
    return this.m34_1;
  };
  protoOf(SerialDescriptorImpl).v34 = function () {
    return this.n34_1;
  };
  protoOf(SerialDescriptorImpl).a34 = function (index) {
    return getChecked(this.o34_1, index);
  };
  protoOf(SerialDescriptorImpl).z33 = function (name) {
    var tmp0_elvis_lhs = this.s34_1.m2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(SerialDescriptorImpl).x33 = function (index) {
    return getChecked(this.q34_1, index);
  };
  protoOf(SerialDescriptorImpl).y33 = function (index) {
    return getChecked(this.p34_1, index);
  };
  protoOf(SerialDescriptorImpl).b34 = function (index) {
    return getChecked_0(this.r34_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s33() === other.s33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.equals.<anonymous>' call
      if (!contentEquals(this.t34_1, other.t34_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.u33() === other.u33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.u33();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.y33(index).s33() === other.y33(index).s33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.y33(index).w33(), other.y33(index).w33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    var tmp = until(0, this.l34_1);
    var tmp_0 = this.j34_1 + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, SerialDescriptorImpl$toString$lambda(this));
  };
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.PrimitiveSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda($this$null) {
    return Unit_instance;
  }
  function buildClassSerialDescriptor$lambda($this$null) {
    return Unit_instance;
  }
  function _hashCode$factory() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef(receiver);
    }, null);
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).z5());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function OPEN() {
    OPEN_instance = this;
    PolymorphicKind.call(this);
  }
  var OPEN_instance;
  function OPEN_getInstance() {
    if (OPEN_instance == null)
      new OPEN();
    return OPEN_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).w34 = function () {
    throw SerializationException_init_$Create$_0('' + getKClassFromExpression(this) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).x34 = function () {
    return true;
  };
  protoOf(AbstractDecoder).y34 = function () {
    return null;
  };
  protoOf(AbstractDecoder).z34 = function () {
    var tmp = this.w34();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).a35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).b35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).c35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).d35 = function () {
    var tmp = this.w34();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).e35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).f35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).g35 = function () {
    var tmp = this.w34();
    return tmp instanceof Char ? tmp.p8_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).h35 = function () {
    var tmp = this.w34();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).i35 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).j35 = function (deserializer, previousValue) {
    return this.k35(deserializer);
  };
  protoOf(AbstractDecoder).l35 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).m35 = function (descriptor) {
  };
  protoOf(AbstractDecoder).n35 = function (descriptor, index) {
    return this.z34();
  };
  protoOf(AbstractDecoder).o35 = function (descriptor, index) {
    return this.a35();
  };
  protoOf(AbstractDecoder).p35 = function (descriptor, index) {
    return this.b35();
  };
  protoOf(AbstractDecoder).q35 = function (descriptor, index) {
    return this.c35();
  };
  protoOf(AbstractDecoder).r35 = function (descriptor, index) {
    return this.d35();
  };
  protoOf(AbstractDecoder).s35 = function (descriptor, index) {
    return this.e35();
  };
  protoOf(AbstractDecoder).t35 = function (descriptor, index) {
    return this.f35();
  };
  protoOf(AbstractDecoder).u35 = function (descriptor, index) {
    return this.g35();
  };
  protoOf(AbstractDecoder).v35 = function (descriptor, index) {
    return this.h35();
  };
  protoOf(AbstractDecoder).w35 = function (descriptor, index) {
    return this.i35(descriptor.y33(index));
  };
  protoOf(AbstractDecoder).x35 = function (descriptor, index, deserializer, previousValue) {
    return this.j35(deserializer, previousValue);
  };
  function AbstractEncoder() {
  }
  protoOf(AbstractEncoder).l35 = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).m35 = function (descriptor) {
  };
  protoOf(AbstractEncoder).d36 = function (descriptor, index) {
    return true;
  };
  protoOf(AbstractEncoder).e36 = function (value) {
    throw SerializationException_init_$Create$_0('Non-serializable ' + getKClassFromExpression(value) + ' is not supported by ' + getKClassFromExpression(this) + ' encoder');
  };
  protoOf(AbstractEncoder).f36 = function () {
    throw SerializationException_init_$Create$_0("'null' is not supported by default");
  };
  protoOf(AbstractEncoder).g36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).h36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).i36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).j36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).k36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).l36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).m36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).n36 = function (value) {
    return this.e36(new Char(value));
  };
  protoOf(AbstractEncoder).o36 = function (value) {
    return this.e36(value);
  };
  protoOf(AbstractEncoder).p36 = function (descriptor) {
    return this;
  };
  protoOf(AbstractEncoder).q36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.g36(value);
    }
  };
  protoOf(AbstractEncoder).r36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.h36(value);
    }
  };
  protoOf(AbstractEncoder).s36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.i36(value);
    }
  };
  protoOf(AbstractEncoder).t36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.j36(value);
    }
  };
  protoOf(AbstractEncoder).u36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.k36(value);
    }
  };
  protoOf(AbstractEncoder).v36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.l36(value);
    }
  };
  protoOf(AbstractEncoder).w36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.m36(value);
    }
  };
  protoOf(AbstractEncoder).x36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.n36(value);
    }
  };
  protoOf(AbstractEncoder).y36 = function (descriptor, index, value) {
    if (this.d36(descriptor, index)) {
      this.o36(value);
    }
  };
  protoOf(AbstractEncoder).z36 = function (descriptor, index) {
    return this.d36(descriptor, index) ? this.p36(descriptor.y33(index)) : NoOpEncoder_getInstance();
  };
  protoOf(AbstractEncoder).a37 = function (descriptor, index, serializer, value) {
    if (this.d36(descriptor, index)) {
      this.b37(serializer, value);
    }
  };
  function Decoder() {
  }
  function Companion() {
    this.e37_1 = -1;
    this.f37_1 = -3;
  }
  var Companion_instance_0;
  function Companion_getInstance_6() {
    return Companion_instance_0;
  }
  function CompositeDecoder() {
  }
  function Encoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.v35($this.m32(), 0);
    var serializer = findPolymorphicSerializer_0($this, compositeDecoder, klassName);
    return compositeDecoder.y35($this.m32(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).c33 = function (encoder, value) {
    var actualSerializer = findPolymorphicSerializer(this, encoder, value);
    // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
    var descriptor = this.m32();
    var composite = encoder.l35(descriptor);
    // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.serialize.<anonymous>' call
    composite.y36(this.m32(), 0, actualSerializer.m32().s33());
    var tmp = this.m32();
    // Inline function 'kotlinx.serialization.internal.cast' call
    var tmp$ret$0 = isInterface(actualSerializer, SerializationStrategy) ? actualSerializer : THROW_CCE();
    composite.a37(tmp, 1, tmp$ret$0, value);
    composite.m35(descriptor);
  };
  protoOf(AbstractPolymorphicSerializer).n32 = function (encoder, value) {
    return this.c33(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(AbstractPolymorphicSerializer).o32 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.m32();
    var composite = decoder.l35(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>' call
      var klassName = null;
      var value = null;
      if (composite.a36()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.b36(this.m32());
        if (index === -1) {
          break mainLoop;
        } else {
          if (index === 0) {
            klassName = composite.v35(this.m32(), index);
          } else {
            if (index === 1) {
              var tmp$ret$2;
              $l$block_0: {
                // Inline function 'kotlin.requireNotNull' call
                var value_0 = klassName;
                // Inline function 'kotlin.contracts.contract' call
                if (value_0 == null) {
                  // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
                  var message = 'Cannot read polymorphic value before its type token';
                  throw IllegalArgumentException_init_$Create$(toString(message));
                } else {
                  tmp$ret$2 = value_0;
                  break $l$block_0;
                }
              }
              klassName = tmp$ret$2;
              var serializer = findPolymorphicSerializer_0(this, composite, klassName);
              value = composite.y35(this.m32(), index, serializer);
            } else {
              var tmp0_elvis_lhs = klassName;
              throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
            }
          }
        }
      }
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        var value_1 = value;
        // Inline function 'kotlin.contracts.contract' call
        if (value_1 == null) {
          // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = value_1;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$0;
    composite.m35(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).d33 = function (decoder, klassName) {
    return decoder.z35().g37(this.b33(), klassName);
  };
  protoOf(AbstractPolymorphicSerializer).e33 = function (encoder, value) {
    return encoder.z35().h37(this.b33(), value);
  };
  function throwSubtypeNotRegistered(subClass, baseClass) {
    var tmp0_elvis_lhs = subClass.z5();
    throwSubtypeNotRegistered_0(tmp0_elvis_lhs == null ? '' + subClass : tmp0_elvis_lhs, baseClass);
  }
  function throwSubtypeNotRegistered_0(subClassName, baseClass) {
    var scope = "in the scope of '" + baseClass.z5() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default polymorphic serializers were registered ' + scope : "Class '" + subClassName + "' is not registered for polymorphic serialization " + scope + '.\n' + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.z5() + "' has to be sealed and '@Serializable'.\n") + ("Alternatively, register the serializer for '" + subClassName + "' explicitly in a corresponding SerializersModule."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.i37_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).m32 = function () {
    return this.i37_1;
  };
  protoOf(NothingSerializer_0).j37 = function (encoder, value) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' cannot be serialized");
  };
  protoOf(NothingSerializer_0).n32 = function (encoder, value) {
    var tmp;
    if (false) {
      tmp = value;
    } else {
      tmp = THROW_CCE();
    }
    return this.j37(encoder, tmp);
  };
  protoOf(NothingSerializer_0).o32 = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.k37_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).m32 = function () {
    return this.k37_1;
  };
  protoOf(DurationSerializer).l37 = function (encoder, value) {
    encoder.o36(Duration__toIsoString_impl_9h6wsm(value));
  };
  protoOf(DurationSerializer).n32 = function (encoder, value) {
    return this.l37(encoder, value instanceof Duration ? value.te_1 : THROW_CCE());
  };
  protoOf(DurationSerializer).m37 = function (decoder) {
    return Companion_getInstance().se(decoder.h35());
  };
  protoOf(DurationSerializer).o32 = function (decoder) {
    return new Duration(this.m37(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).s33 = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).s33 = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).s33 = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function HashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.HashMap', keyDesc, valueDesc);
  }
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ArrayClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayClassDesc).s33 = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.p37_1 = elementDescriptor;
    this.q37_1 = 1;
  }
  protoOf(ListLikeDescriptor).w33 = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).u33 = function () {
    return this.q37_1;
  };
  protoOf(ListLikeDescriptor).a34 = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).z33 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).b34 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).x33 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).y33 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.p37_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.p37_1, other.p37_1) ? this.s33() === other.s33() : false)
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.p37_1), 31) + getStringHashCode(this.s33()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.s33() + '(' + this.p37_1 + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.v37_1 = serialName;
    this.w37_1 = keyDescriptor;
    this.x37_1 = valueDescriptor;
    this.y37_1 = 2;
  }
  protoOf(MapLikeDescriptor).s33 = function () {
    return this.v37_1;
  };
  protoOf(MapLikeDescriptor).w33 = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).u33 = function () {
    return this.y37_1;
  };
  protoOf(MapLikeDescriptor).a34 = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).z33 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).b34 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).x33 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).y33 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.s33() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.w37_1;
        break;
      case 1:
        tmp = this.x37_1;
        break;
      default:
        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.s33() === other.s33()))
      return false;
    if (!equals(this.w37_1, other.w37_1))
      return false;
    if (!equals(this.x37_1, other.x37_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.s33());
    result = imul(31, result) + hashCode(this.w37_1) | 0;
    result = imul(31, result) + hashCode(this.x37_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.s33() + '(' + this.w37_1 + ', ' + this.x37_1 + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.d38_1 = primitive.s33() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).s33 = function () {
    return this.d38_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.f38_1 = new ArrayListClassDesc(element.m32());
  }
  protoOf(ArrayListSerializer).m32 = function () {
    return this.f38_1;
  };
  protoOf(ArrayListSerializer).g38 = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).h38 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(ArrayListSerializer).i38 = function (_this__u8e3s4) {
    return this.h38(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).j38 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).k38 = function (_this__u8e3s4) {
    return this.j38(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).l38 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).m38 = function (_this__u8e3s4) {
    return this.l38((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, List) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).n38 = function (_this__u8e3s4, size) {
    return _this__u8e3s4.u2(size);
  };
  protoOf(ArrayListSerializer).o38 = function (_this__u8e3s4, size) {
    return this.n38(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).p38 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.n1(index, element);
  };
  protoOf(ArrayListSerializer).q38 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.p38(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.b39_1 = new HashSetClassDesc(eSerializer.m32());
  }
  protoOf(HashSetSerializer).m32 = function () {
    return this.b39_1;
  };
  protoOf(HashSetSerializer).g38 = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).c39 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(HashSetSerializer).i38 = function (_this__u8e3s4) {
    return this.c39(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).d39 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).k38 = function (_this__u8e3s4) {
    return this.d39(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).e39 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).m38 = function (_this__u8e3s4) {
    return this.e39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Set) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).f39 = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).o38 = function (_this__u8e3s4, size) {
    return this.f39(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).g39 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.r(element);
  };
  protoOf(HashSetSerializer).q38 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.g39(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.i39_1 = new LinkedHashSetClassDesc(eSerializer.m32());
  }
  protoOf(LinkedHashSetSerializer).m32 = function () {
    return this.i39_1;
  };
  protoOf(LinkedHashSetSerializer).g38 = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).j39 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(LinkedHashSetSerializer).i38 = function (_this__u8e3s4) {
    return this.j39(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).k39 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).k38 = function (_this__u8e3s4) {
    return this.k39(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).e39 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).m38 = function (_this__u8e3s4) {
    return this.e39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Set) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).l39 = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).o38 = function (_this__u8e3s4, size) {
    return this.l39(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).m39 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.r(element);
  };
  protoOf(LinkedHashSetSerializer).q38 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.m39(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.p39_1 = new HashMapClassDesc(kSerializer.m32(), vSerializer.m32());
  }
  protoOf(HashMapSerializer).m32 = function () {
    return this.p39_1;
  };
  protoOf(HashMapSerializer).q39 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(HashMapSerializer).r39 = function (_this__u8e3s4) {
    return this.q39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).s39 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.b2().u();
  };
  protoOf(HashMapSerializer).t39 = function (_this__u8e3s4) {
    return this.s39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).g38 = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).u39 = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.n(), 2);
  };
  protoOf(HashMapSerializer).i38 = function (_this__u8e3s4) {
    return this.u39(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).v39 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).k38 = function (_this__u8e3s4) {
    return this.v39(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).w39 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).m38 = function (_this__u8e3s4) {
    return this.w39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).x39 = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).o38 = function (_this__u8e3s4, size) {
    return this.x39(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.e3a_1 = new LinkedHashMapClassDesc(kSerializer.m32(), vSerializer.m32());
  }
  protoOf(LinkedHashMapSerializer).m32 = function () {
    return this.e3a_1;
  };
  protoOf(LinkedHashMapSerializer).q39 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(LinkedHashMapSerializer).r39 = function (_this__u8e3s4) {
    return this.q39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).s39 = function (_this__u8e3s4) {
    // Inline function 'kotlin.collections.iterator' call
    return _this__u8e3s4.b2().u();
  };
  protoOf(LinkedHashMapSerializer).t39 = function (_this__u8e3s4) {
    return this.s39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).g38 = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).f3a = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.n(), 2);
  };
  protoOf(LinkedHashMapSerializer).i38 = function (_this__u8e3s4) {
    return this.f3a(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).g3a = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).k38 = function (_this__u8e3s4) {
    return this.g3a(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).w39 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).m38 = function (_this__u8e3s4) {
    return this.w39((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).h3a = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).o38 = function (_this__u8e3s4, size) {
    return this.h3a(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.j3a_1 = kClass;
    this.k3a_1 = new ArrayClassDesc(eSerializer.m32());
  }
  protoOf(ReferenceArraySerializer).m32 = function () {
    return this.k3a_1;
  };
  protoOf(ReferenceArraySerializer).l3a = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ReferenceArraySerializer).r39 = function (_this__u8e3s4) {
    return this.l3a((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).m3a = function (_this__u8e3s4) {
    return arrayIterator(_this__u8e3s4);
  };
  protoOf(ReferenceArraySerializer).t39 = function (_this__u8e3s4) {
    return this.m3a((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).g38 = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).n3a = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(ReferenceArraySerializer).i38 = function (_this__u8e3s4) {
    return this.n3a(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).o3a = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.j3a_1);
  };
  protoOf(ReferenceArraySerializer).k38 = function (_this__u8e3s4) {
    return this.o3a(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).p3a = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).m38 = function (_this__u8e3s4) {
    return this.p3a((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).q3a = function (_this__u8e3s4, size) {
    return _this__u8e3s4.u2(size);
  };
  protoOf(ReferenceArraySerializer).o38 = function (_this__u8e3s4, size) {
    return this.q3a(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).r3a = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.n1(index, element);
  };
  protoOf(ReferenceArraySerializer).q38 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.r3a(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  protoOf(CollectionSerializer).s38 = function (_this__u8e3s4) {
    return _this__u8e3s4.n();
  };
  protoOf(CollectionSerializer).r39 = function (_this__u8e3s4) {
    return this.s38((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CollectionSerializer).t38 = function (_this__u8e3s4) {
    return _this__u8e3s4.u();
  };
  protoOf(CollectionSerializer).t39 = function (_this__u8e3s4) {
    return this.t38((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.y39_1 = keySerializer;
    this.z39_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).a3a = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.l8_1;
    var last = progression.m8_1;
    var step_0 = progression.n8_1;
    if ((step_0 > 0 ? inductionVariable <= last : false) ? true : step_0 < 0 ? last <= inductionVariable : false)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.b3a(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).w38 = function (decoder, builder, startIndex, size) {
    return this.a3a(decoder, (!(builder == null) ? isInterface(builder, MutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).b3a = function (decoder, index, builder, checkIndex) {
    var key = decoder.y35(this.m32(), index, this.y39_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.b36(this.m32());
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>' call
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this_0 === (index + 1 | 0))) {
        // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>.<anonymous>' call
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.j2(key)) {
      var tmp_2 = this.z39_1.m32().w33();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.x35(this.m32(), vIndex, this.z39_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.y35(this.m32(), vIndex, this.z39_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.c2(key, value);
  };
  protoOf(MapLikeSerializer).x38 = function (decoder, index, builder, checkIndex) {
    return this.b3a(decoder, index, (!(builder == null) ? isInterface(builder, MutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(MapLikeSerializer).v38 = function (encoder, value) {
    var size = this.r39(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.m32();
    var composite = encoder.d37(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.serialize.<anonymous>' call
    var iterator = this.t39(value);
    var index = 0;
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = iterator;
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.serialize.<anonymous>.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var k = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var v = element.f2();
      var tmp = this.m32();
      var tmp0 = index;
      index = tmp0 + 1 | 0;
      composite.a37(tmp, tmp0, this.y39_1, k);
      var tmp_0 = this.m32();
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      composite.a37(tmp_0, tmp1, this.z39_1, v);
    }
    composite.m35(descriptor);
  };
  protoOf(MapLikeSerializer).n32 = function (encoder, value) {
    return this.v38(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.u38_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).v38 = function (encoder, value) {
    var size = this.r39(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.m32();
    var composite = encoder.d37(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.CollectionLikeSerializer.serialize.<anonymous>' call
    var iterator = this.t39(value);
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        composite.a37(this.m32(), index, this.u38_1, iterator.w());
      }
       while (inductionVariable < size);
    composite.m35(descriptor);
  };
  protoOf(CollectionLikeSerializer).n32 = function (encoder, value) {
    return this.v38(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(CollectionLikeSerializer).w38 = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.CollectionLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.x38(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).x38 = function (decoder, index, builder, checkIndex) {
    this.q38(builder, index, decoder.y35(this.m32(), index, this.u38_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.c36($this.m32());
    $this.o38(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).z38 = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.m38(previous);
    var builder = tmp1_elvis_lhs == null ? this.g38() : tmp1_elvis_lhs;
    var startIndex = this.i38(builder);
    var compositeDecoder = decoder.l35(this.m32());
    if (compositeDecoder.a36()) {
      this.w38(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.b36(this.m32());
        if (index === -1)
          break $l$loop;
        this.y38(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.m35(this.m32());
    return this.k38(builder);
  };
  protoOf(AbstractCollectionSerializer).o32 = function (decoder) {
    return this.z38(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).y38 = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.x38(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.x38.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.t3a_1 = new PrimitiveArrayDescriptor(primitiveSerializer.m32());
  }
  protoOf(PrimitiveArraySerializer).m32 = function () {
    return this.t3a_1;
  };
  protoOf(PrimitiveArraySerializer).u3a = function (_this__u8e3s4) {
    return _this__u8e3s4.v3a();
  };
  protoOf(PrimitiveArraySerializer).i38 = function (_this__u8e3s4) {
    return this.u3a(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).w3a = function (_this__u8e3s4) {
    return _this__u8e3s4.z15();
  };
  protoOf(PrimitiveArraySerializer).k38 = function (_this__u8e3s4) {
    return this.w3a(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).x3a = function (_this__u8e3s4, size) {
    return _this__u8e3s4.u2(size);
  };
  protoOf(PrimitiveArraySerializer).o38 = function (_this__u8e3s4, size) {
    return this.x3a(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).y3a = function (_this__u8e3s4) {
    var message = 'This method lead to boxing and must not be used, use writeContents instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).t39 = function (_this__u8e3s4) {
    return this.y3a((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).z3a = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).q38 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.z3a(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).g38 = function () {
    return this.m38(this.a3b());
  };
  protoOf(PrimitiveArraySerializer).d3b = function (encoder, value) {
    var size = this.r39(value);
    // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
    var descriptor = this.t3a_1;
    var composite = encoder.d37(descriptor, size);
    // Inline function 'kotlinx.serialization.internal.PrimitiveArraySerializer.serialize.<anonymous>' call
    this.c3b(composite, value, size);
    composite.m35(descriptor);
  };
  protoOf(PrimitiveArraySerializer).n32 = function (encoder, value) {
    return this.d3b(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).v38 = function (encoder, value) {
    return this.d3b(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).o32 = function (decoder) {
    return this.z38(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).e3b = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.v3a() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.u2(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.u2.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion_0() {
    Companion_instance_1 = this;
    this.f3b_1 = longArray(0);
  }
  var Companion_instance_1;
  function Companion_getInstance_7() {
    if (Companion_instance_1 == null)
      new Companion_0();
    return Companion_instance_1;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    Companion_getInstance_0();
    var elementsInLastSlot = elementsCount & (64 - 1 | 0);
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).o9(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    Companion_getInstance_0();
    var offsetInSlot = index & (64 - 1 | 0);
    $this.j3b_1[slot] = $this.j3b_1[slot].s9((new Long(1, 0)).o9(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.j3b_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = slot + 1 | 0;
        Companion_getInstance_0();
        var slotOffset = imul(tmp, 64);
        var slotMarks = $this.j3b_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.n9());
          slotMarks = slotMarks.s9((new Long(1, 0)).o9(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.h3b_1($this.g3b_1, index)) {
            $this.j3b_1[slot] = slotMarks;
            return index;
          }
        }
        $this.j3b_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.g3b_1 = descriptor;
    this.h3b_1 = readIfAbsent;
    var elementsCount = this.g3b_1.u33();
    Companion_getInstance_0();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      Companion_getInstance_0();
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).o9(elementsCount);
      }
      tmp.i3b_1 = tmp_0;
      this.j3b_1 = Companion_getInstance_7().f3b_1;
    } else {
      this.i3b_1 = new Long(0, 0);
      this.j3b_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).k3b = function (index) {
    Companion_getInstance_0();
    if (index < 64) {
      this.i3b_1 = this.i3b_1.s9((new Long(1, 0)).o9(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).l3b = function () {
    var elementsCount = this.g3b_1.u33();
    while (!this.i3b_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.i3b_1.n9());
      this.i3b_1 = this.i3b_1.s9((new Long(1, 0)).o9(index));
      if (this.h3b_1(this.g3b_1, index)) {
        return index;
      }
    }
    Companion_getInstance_0();
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.y3b_1 = true;
  }
  protoOf(InlineClassDescriptor).v33 = function () {
    return this.y3b_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s33() === other.s33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.InlineClassDescriptor.equals.<anonymous>' call
      if (!(other.y3b_1 ? contentEquals(this.l3c(), other.l3c()) : false)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.u33() === other.u33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.u33();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.y33(index).s33() === other.y33(index).s33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.y33(index).w33(), other.y33(index).w33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.m3c_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).n3c = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.m3c_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).m32 = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).n32 = function (encoder, value) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).o32 = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function NoOpEncoder() {
    NoOpEncoder_instance = this;
    AbstractEncoder.call(this);
    this.p3c_1 = EmptySerializersModule_0();
  }
  protoOf(NoOpEncoder).z35 = function () {
    return this.p3c_1;
  };
  protoOf(NoOpEncoder).e36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).f36 = function () {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).g36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).h36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).i36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).j36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).k36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).l36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).m36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).n36 = function (value) {
    return Unit_instance;
  };
  protoOf(NoOpEncoder).o36 = function (value) {
    return Unit_instance;
  };
  var NoOpEncoder_instance;
  function NoOpEncoder_getInstance() {
    if (NoOpEncoder_instance == null)
      new NoOpEncoder();
    return NoOpEncoder_instance;
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.q3c_1 = OBJECT_getInstance();
    this.r3c_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).w33 = function () {
    return this.q3c_1;
  };
  protoOf(NothingSerialDescriptor).s33 = function () {
    return this.r3c_1;
  };
  protoOf(NothingSerialDescriptor).u33 = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).a34 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).z33 = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).b34 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).y33 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).x33 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.r3c_1) + imul(31, this.q3c_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.s3c_1 = serializer;
    this.t3c_1 = new SerialDescriptorForNullable(this.s3c_1.m32());
  }
  protoOf(NullableSerializer).m32 = function () {
    return this.t3c_1;
  };
  protoOf(NullableSerializer).u3c = function (encoder, value) {
    if (!(value == null)) {
      encoder.c37();
      encoder.b37(this.s3c_1, value);
    } else {
      encoder.f36();
    }
  };
  protoOf(NullableSerializer).n32 = function (encoder, value) {
    return this.u3c(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(NullableSerializer).o32 = function (decoder) {
    return decoder.x34() ? decoder.k35(this.s3c_1) : decoder.y34();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.s3c_1, other.s3c_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.s3c_1);
  };
  function SerialDescriptorForNullable(original) {
    this.c34_1 = original;
    this.d34_1 = this.c34_1.s33() + '?';
    this.e34_1 = cachedSerialNames(this.c34_1);
  }
  protoOf(SerialDescriptorForNullable).t33 = function () {
    return this.c34_1.t33();
  };
  protoOf(SerialDescriptorForNullable).u33 = function () {
    return this.c34_1.u33();
  };
  protoOf(SerialDescriptorForNullable).v33 = function () {
    return this.c34_1.v33();
  };
  protoOf(SerialDescriptorForNullable).w33 = function () {
    return this.c34_1.w33();
  };
  protoOf(SerialDescriptorForNullable).x33 = function (index) {
    return this.c34_1.x33(index);
  };
  protoOf(SerialDescriptorForNullable).y33 = function (index) {
    return this.c34_1.y33(index);
  };
  protoOf(SerialDescriptorForNullable).z33 = function (name) {
    return this.c34_1.z33(name);
  };
  protoOf(SerialDescriptorForNullable).a34 = function (index) {
    return this.c34_1.a34(index);
  };
  protoOf(SerialDescriptorForNullable).b34 = function (index) {
    return this.c34_1.b34(index);
  };
  protoOf(SerialDescriptorForNullable).s33 = function () {
    return this.d34_1;
  };
  protoOf(SerialDescriptorForNullable).v34 = function () {
    return this.e34_1;
  };
  protoOf(SerialDescriptorForNullable).o33 = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.c34_1, other.c34_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return '' + this.c34_1 + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.c34_1), 31);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.r32_1 = this$0.w3c_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.v3c_1 = objectInstance;
    this.w3c_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.x3c_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).m32 = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.x3c_1;
    descriptor$factory_0();
    return this_0.f2();
  };
  protoOf(ObjectSerializer).c33 = function (encoder, value) {
    encoder.l35(this.m32()).m35(this.m32());
  };
  protoOf(ObjectSerializer).n32 = function (encoder, value) {
    return this.c33(encoder, !(value == null) ? value : THROW_CCE());
  };
  protoOf(ObjectSerializer).o32 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.m32();
    var composite = decoder.l35(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.serialization.internal.ObjectSerializer.deserialize.<anonymous>' call
      if (composite.a36()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.b36(this.m32());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else {
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    var result = tmp$ret$0;
    composite.m35(descriptor);
    return this.v3c_1;
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.m32();
    }, null);
  }
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.v34();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.u33());
    var inductionVariable = 0;
    var last = _this__u8e3s4.u33();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.a34(i);
        result.r(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.n6();
    var tmp;
    if (!(t == null) ? isInterface(t, KClass) : false) {
      tmp = t;
    } else {
      if (!(t == null) ? isInterface(t, KTypeParameter) : false) {
        var message = 'Captured type parameter ' + t + ' from generic non-reified function. ' + ('Such functionality cannot be supported as ' + t + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + t);
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        var message_0 = 'Only KClass supported as classifier, got ' + t;
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
    }
    var tmp_0 = tmp;
    return isInterface(tmp_0, KClass) ? tmp_0 : THROW_CCE();
  }
  function notRegisteredMessage(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0_elvis_lhs = _this__u8e3s4.z5();
    return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
  }
  function notRegisteredMessage_0(className) {
    _init_properties_Platform_common_kt__3qzecs();
    return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'kotlinx.serialization.internal.compactArray.<anonymous>' call
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(_this__u8e3s4 == null ? true : _this__u8e3s4.b1())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
  }
  function serializerNotRegistered(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4));
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function _get_childSerializers__7vnyfa($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.i3c_1;
    childSerializers$factory();
    return this_0.f2();
  }
  function _get__hashCode__tgwhef_0($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.k3c_1;
    _hashCode$factory_0();
    return this_0.f2();
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.a3c_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n3c();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.a3c_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o3c();
      var tmp;
      if (tmp1_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(tmp1_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp1_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp1_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.typeParameterDescriptors$delegate.<anonymous>.<anonymous>' call
          var tmp$ret$0 = item.m32();
          destination.r(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.l3c());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.a34(i) + ': ' + this$0.y33(i).s33();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.z3b_1 = serialName;
    this.a3c_1 = generatedSerializer;
    this.b3c_1 = elementsCount;
    this.c3c_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.b3c_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = fillArrayVal(Array(tmp_1), null);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.d3c_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.b3c_1;
    tmp_3.e3c_1 = fillArrayVal(Array(size), null);
    this.f3c_1 = null;
    this.g3c_1 = booleanArray(this.b3c_1);
    this.h3c_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.i3c_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.j3c_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.k3c_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).s33 = function () {
    return this.z3b_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).u33 = function () {
    return this.b3c_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).w33 = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).t33 = function () {
    var tmp0_elvis_lhs = this.f3c_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).v34 = function () {
    return this.h3c_1.z1();
  };
  protoOf(PluginGeneratedSerialDescriptor).l3c = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.j3c_1;
    typeParameterDescriptors$factory();
    return this_0.f2();
  };
  protoOf(PluginGeneratedSerialDescriptor).y33 = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).m32();
  };
  protoOf(PluginGeneratedSerialDescriptor).b34 = function (index) {
    return getChecked_0(this.g3c_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).x33 = function (index) {
    var tmp0_elvis_lhs = getChecked(this.e3c_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).a34 = function (index) {
    return getChecked(this.d3c_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).z33 = function (name) {
    var tmp0_elvis_lhs = this.h3c_1.m2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.s33() === other.s33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.equals.<anonymous>' call
      if (!contentEquals(this.l3c(), other.l3c())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.u33() === other.u33())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.u33();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.y33(index).s33() === other.y33(index).s33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.y33(index).w33(), other.y33(index).w33())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    var tmp = until(0, this.b3c_1);
    var tmp_0 = this.s33() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.s33());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var tmp0_iterator = elementDescriptors.u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      var tmp0_safe_receiver = element.s33();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var tmp0_iterator_0 = elementDescriptors.u();
    while (tmp0_iterator_0.v()) {
      var element_0 = tmp0_iterator_0.w();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      var tmp0_safe_receiver_0 = element_0.w33();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.l3c();
    }, null);
  }
  function _hashCode$factory_0() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef_0(receiver);
    }, null);
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function SerializerFactory() {
  }
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(Companion_getInstance_1()));
  }
  protoOf(CharArraySerializer_0).b3d = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(CharArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.b3d((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).c3d = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.c3d((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).a3b = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).d3d = function (decoder, index, builder, checkIndex) {
    builder.g3d(decoder.u35(this.t3a_1, index));
  };
  protoOf(CharArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.d3d(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.d3d(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).h3d = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.x36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(CharArraySerializer_0).c3b = function (encoder, content, size) {
    return this.h3d(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).k3d = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(DoubleArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.k3d((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).l3d = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.l3d((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).a3b = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).m3d = function (decoder, index, builder, checkIndex) {
    builder.p3d(decoder.t35(this.t3a_1, index));
  };
  protoOf(DoubleArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.m3d(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.m3d(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).q3d = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.w36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(DoubleArraySerializer_0).c3b = function (encoder, content, size) {
    return this.q3d(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).t3d = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(FloatArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.t3d((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).u3d = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.u3d((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).a3b = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).v3d = function (decoder, index, builder, checkIndex) {
    builder.y3d(decoder.s35(this.t3a_1, index));
  };
  protoOf(FloatArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.v3d(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.v3d(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).z3d = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.v36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(FloatArraySerializer_0).c3b = function (encoder, content, size) {
    return this.z3d(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_0()));
  }
  protoOf(LongArraySerializer_0).c3e = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(LongArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.c3e((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).d3e = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.d3e((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).a3b = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).e3e = function (decoder, index, builder, checkIndex) {
    builder.h3e(decoder.r35(this.t3a_1, index));
  };
  protoOf(LongArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.e3e(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.e3e(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).i3e = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.u36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(LongArraySerializer_0).c3b = function (encoder, content, size) {
    return this.i3e(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(Companion_getInstance_2()));
  }
  protoOf(ULongArraySerializer_0).l3e = function (_this__u8e3s4) {
    return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.l3e(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rg_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).m3e = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.m3e(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.rg_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).n3e = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).a3b = function () {
    return new ULongArray(this.n3e());
  };
  protoOf(ULongArraySerializer_0).o3e = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.w35(this.t3a_1, index).d35();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.r3e(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.o3e(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.o3e(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).s3e = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.z36(this.t3a_1, i);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = ULongArray__get_impl_pr71q9(content, i);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
        tmp.k36(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(ULongArraySerializer_0).c3b = function (encoder, content, size) {
    return this.s3e(encoder, content instanceof ULongArray ? content.rg_1 : THROW_CCE(), size);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).v3e = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(IntArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.v3e((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).w3e = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.w3e((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).a3b = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).x3e = function (decoder, index, builder, checkIndex) {
    builder.a3f(decoder.q35(this.t3a_1, index));
  };
  protoOf(IntArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.x3e(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.x3e(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).b3f = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.t36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(IntArraySerializer_0).c3b = function (encoder, content, size) {
    return this.b3f(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(Companion_getInstance_3()));
  }
  protoOf(UIntArraySerializer_0).e3f = function (_this__u8e3s4) {
    return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.e3f(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.gg_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).f3f = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.f3f(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.gg_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).g3f = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).a3b = function () {
    return new UIntArray(this.g3f());
  };
  protoOf(UIntArraySerializer_0).h3f = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.w35(this.t3a_1, index).c35();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.k3f(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.h3f(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.h3f(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).l3f = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.z36(this.t3a_1, i);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = UIntArray__get_impl_gp5kza(content, i);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
        tmp.j36(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UIntArraySerializer_0).c3b = function (encoder, content, size) {
    return this.l3f(encoder, content instanceof UIntArray ? content.gg_1 : THROW_CCE(), size);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).o3f = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ShortArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.o3f((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).p3f = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.p3f((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).a3b = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).q3f = function (decoder, index, builder, checkIndex) {
    builder.t3f(decoder.p35(this.t3a_1, index));
  };
  protoOf(ShortArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.q3f(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.q3f(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).u3f = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.s36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ShortArraySerializer_0).c3b = function (encoder, content, size) {
    return this.u3f(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(Companion_getInstance_4()));
  }
  protoOf(UShortArraySerializer_0).x3f = function (_this__u8e3s4) {
    return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.x3f(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.ch_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).y3f = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.y3f(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.ch_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).z3f = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).a3b = function () {
    return new UShortArray(this.z3f());
  };
  protoOf(UShortArraySerializer_0).a3g = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.w35(this.t3a_1, index).b35();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.d3g(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.a3g(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.a3g(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).e3g = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.z36(this.t3a_1, i);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = UShortArray__get_impl_fnbhmx(content, i);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
        tmp.i36(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UShortArraySerializer_0).c3b = function (encoder, content, size) {
    return this.e3g(encoder, content instanceof UShortArray ? content.ch_1 : THROW_CCE(), size);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).h3g = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(ByteArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.h3g((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).i3g = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.i3g((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).a3b = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).j3g = function (decoder, index, builder, checkIndex) {
    builder.m3g(decoder.o35(this.t3a_1, index));
  };
  protoOf(ByteArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.j3g(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.j3g(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).n3g = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.r36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(ByteArraySerializer_0).c3b = function (encoder, content, size) {
    return this.n3g(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(Companion_getInstance_5()));
  }
  protoOf(UByteArraySerializer_0).q3g = function (_this__u8e3s4) {
    return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.q3g(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.vf_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).r3g = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.r3g(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.vf_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).s3g = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).a3b = function () {
    return new UByteArray(this.s3g());
  };
  protoOf(UByteArraySerializer_0).t3g = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.w35(this.t3a_1, index).a35();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.w3g(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.t3g(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.t3g(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).x3g = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = encoder.z36(this.t3a_1, i);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = UByteArray__get_impl_t5f3hv(content, i);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
        tmp.h36(tmp$ret$0);
      }
       while (inductionVariable < size);
  };
  protoOf(UByteArraySerializer_0).c3b = function (encoder, content, size) {
    return this.x3g(encoder, content instanceof UByteArray ? content.vf_1 : THROW_CCE(), size);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_13(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).a3h = function (_this__u8e3s4) {
    return _this__u8e3s4.length;
  };
  protoOf(BooleanArraySerializer_0).r39 = function (_this__u8e3s4) {
    return this.a3h((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).b3h = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).m38 = function (_this__u8e3s4) {
    return this.b3h((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).a3b = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).c3h = function (decoder, index, builder, checkIndex) {
    builder.f3h(decoder.n35(this.t3a_1, index));
  };
  protoOf(BooleanArraySerializer_0).x38 = function (decoder, index, builder, checkIndex) {
    return this.c3h(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).b3b = function (decoder, index, builder, checkIndex) {
    return this.c3h(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).g3h = function (encoder, content, size) {
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        encoder.q36(this.t3a_1, i, content[i]);
      }
       while (inductionVariable < size);
  };
  protoOf(BooleanArraySerializer_0).c3b = function (encoder, content, size) {
    return this.g3h(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.e3d_1 = bufferWithData;
    this.f3d_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(CharArrayBuilder).v3a = function () {
    return this.f3d_1;
  };
  protoOf(CharArrayBuilder).u2 = function (requiredCapacity) {
    if (this.e3d_1.length < requiredCapacity)
      this.e3d_1 = copyOf(this.e3d_1, coerceAtLeast(requiredCapacity, imul(this.e3d_1.length, 2)));
  };
  protoOf(CharArrayBuilder).g3d = function (c) {
    this.e3b();
    var tmp = this.e3d_1;
    var tmp1 = this.f3d_1;
    this.f3d_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(CharArrayBuilder).z15 = function () {
    return copyOf(this.e3d_1, this.f3d_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.n3d_1 = bufferWithData;
    this.o3d_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(DoubleArrayBuilder).v3a = function () {
    return this.o3d_1;
  };
  protoOf(DoubleArrayBuilder).u2 = function (requiredCapacity) {
    if (this.n3d_1.length < requiredCapacity)
      this.n3d_1 = copyOf_0(this.n3d_1, coerceAtLeast(requiredCapacity, imul(this.n3d_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).p3d = function (c) {
    this.e3b();
    var tmp = this.n3d_1;
    var tmp1 = this.o3d_1;
    this.o3d_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(DoubleArrayBuilder).z15 = function () {
    return copyOf_0(this.n3d_1, this.o3d_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.w3d_1 = bufferWithData;
    this.x3d_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(FloatArrayBuilder).v3a = function () {
    return this.x3d_1;
  };
  protoOf(FloatArrayBuilder).u2 = function (requiredCapacity) {
    if (this.w3d_1.length < requiredCapacity)
      this.w3d_1 = copyOf_1(this.w3d_1, coerceAtLeast(requiredCapacity, imul(this.w3d_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).y3d = function (c) {
    this.e3b();
    var tmp = this.w3d_1;
    var tmp1 = this.x3d_1;
    this.x3d_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(FloatArrayBuilder).z15 = function () {
    return copyOf_1(this.w3d_1, this.x3d_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.f3e_1 = bufferWithData;
    this.g3e_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(LongArrayBuilder).v3a = function () {
    return this.g3e_1;
  };
  protoOf(LongArrayBuilder).u2 = function (requiredCapacity) {
    if (this.f3e_1.length < requiredCapacity)
      this.f3e_1 = copyOf_2(this.f3e_1, coerceAtLeast(requiredCapacity, imul(this.f3e_1.length, 2)));
  };
  protoOf(LongArrayBuilder).h3e = function (c) {
    this.e3b();
    var tmp = this.f3e_1;
    var tmp1 = this.g3e_1;
    this.g3e_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(LongArrayBuilder).z15 = function () {
    return copyOf_2(this.f3e_1, this.g3e_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.p3e_1 = bufferWithData;
    this.q3e_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.u2(10);
  }
  protoOf(ULongArrayBuilder).v3a = function () {
    return this.q3e_1;
  };
  protoOf(ULongArrayBuilder).u2 = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.p3e_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.p3e_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.p3e_1), 2));
      tmp.p3e_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(this_0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).r3e = function (c) {
    this.e3b();
    var tmp = this.p3e_1;
    var tmp1 = this.q3e_1;
    this.q3e_1 = tmp1 + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, tmp1, c);
  };
  protoOf(ULongArrayBuilder).h3h = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.p3e_1;
    var newSize = this.q3e_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(this_0), newSize));
  };
  protoOf(ULongArrayBuilder).z15 = function () {
    return new ULongArray(this.h3h());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.y3e_1 = bufferWithData;
    this.z3e_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(IntArrayBuilder).v3a = function () {
    return this.z3e_1;
  };
  protoOf(IntArrayBuilder).u2 = function (requiredCapacity) {
    if (this.y3e_1.length < requiredCapacity)
      this.y3e_1 = copyOf_3(this.y3e_1, coerceAtLeast(requiredCapacity, imul(this.y3e_1.length, 2)));
  };
  protoOf(IntArrayBuilder).a3f = function (c) {
    this.e3b();
    var tmp = this.y3e_1;
    var tmp1 = this.z3e_1;
    this.z3e_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(IntArrayBuilder).z15 = function () {
    return copyOf_3(this.y3e_1, this.z3e_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.i3f_1 = bufferWithData;
    this.j3f_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.u2(10);
  }
  protoOf(UIntArrayBuilder).v3a = function () {
    return this.j3f_1;
  };
  protoOf(UIntArrayBuilder).u2 = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.i3f_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.i3f_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.i3f_1), 2));
      tmp.i3f_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(this_0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).k3f = function (c) {
    this.e3b();
    var tmp = this.i3f_1;
    var tmp1 = this.j3f_1;
    this.j3f_1 = tmp1 + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, tmp1, c);
  };
  protoOf(UIntArrayBuilder).i3h = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.i3f_1;
    var newSize = this.j3f_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(this_0), newSize));
  };
  protoOf(UIntArrayBuilder).z15 = function () {
    return new UIntArray(this.i3h());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.r3f_1 = bufferWithData;
    this.s3f_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(ShortArrayBuilder).v3a = function () {
    return this.s3f_1;
  };
  protoOf(ShortArrayBuilder).u2 = function (requiredCapacity) {
    if (this.r3f_1.length < requiredCapacity)
      this.r3f_1 = copyOf_4(this.r3f_1, coerceAtLeast(requiredCapacity, imul(this.r3f_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).t3f = function (c) {
    this.e3b();
    var tmp = this.r3f_1;
    var tmp1 = this.s3f_1;
    this.s3f_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(ShortArrayBuilder).z15 = function () {
    return copyOf_4(this.r3f_1, this.s3f_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.b3g_1 = bufferWithData;
    this.c3g_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.u2(10);
  }
  protoOf(UShortArrayBuilder).v3a = function () {
    return this.c3g_1;
  };
  protoOf(UShortArrayBuilder).u2 = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.b3g_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.b3g_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.b3g_1), 2));
      tmp.b3g_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(this_0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).d3g = function (c) {
    this.e3b();
    var tmp = this.b3g_1;
    var tmp1 = this.c3g_1;
    this.c3g_1 = tmp1 + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, tmp1, c);
  };
  protoOf(UShortArrayBuilder).j3h = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.b3g_1;
    var newSize = this.c3g_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(this_0), newSize));
  };
  protoOf(UShortArrayBuilder).z15 = function () {
    return new UShortArray(this.j3h());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.k3g_1 = bufferWithData;
    this.l3g_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(ByteArrayBuilder).v3a = function () {
    return this.l3g_1;
  };
  protoOf(ByteArrayBuilder).u2 = function (requiredCapacity) {
    if (this.k3g_1.length < requiredCapacity)
      this.k3g_1 = copyOf_5(this.k3g_1, coerceAtLeast(requiredCapacity, imul(this.k3g_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).m3g = function (c) {
    this.e3b();
    var tmp = this.k3g_1;
    var tmp1 = this.l3g_1;
    this.l3g_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(ByteArrayBuilder).z15 = function () {
    return copyOf_5(this.k3g_1, this.l3g_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.u3g_1 = bufferWithData;
    this.v3g_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.u2(10);
  }
  protoOf(UByteArrayBuilder).v3a = function () {
    return this.v3g_1;
  };
  protoOf(UByteArrayBuilder).u2 = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.u3g_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.u3g_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.u3g_1), 2));
      tmp.u3g_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(this_0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).w3g = function (c) {
    this.e3b();
    var tmp = this.u3g_1;
    var tmp1 = this.v3g_1;
    this.v3g_1 = tmp1 + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, tmp1, c);
  };
  protoOf(UByteArrayBuilder).k3h = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.u3g_1;
    var newSize = this.v3g_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(this_0), newSize));
  };
  protoOf(UByteArrayBuilder).z15 = function () {
    return new UByteArray(this.k3h());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.d3h_1 = bufferWithData;
    this.e3h_1 = bufferWithData.length;
    this.u2(10);
  }
  protoOf(BooleanArrayBuilder).v3a = function () {
    return this.e3h_1;
  };
  protoOf(BooleanArrayBuilder).u2 = function (requiredCapacity) {
    if (this.d3h_1.length < requiredCapacity)
      this.d3h_1 = copyOf_6(this.d3h_1, coerceAtLeast(requiredCapacity, imul(this.d3h_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).f3h = function (c) {
    this.e3b();
    var tmp = this.d3h_1;
    var tmp1 = this.e3h_1;
    this.e3h_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(BooleanArrayBuilder).z15 = function () {
    return copyOf_6(this.d3h_1, this.e3h_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().m2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.l3h_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).m32 = function () {
    return this.l3h_1;
  };
  protoOf(StringSerializer).m3h = function (encoder, value) {
    return encoder.o36(value);
  };
  protoOf(StringSerializer).n32 = function (encoder, value) {
    return this.m3h(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  };
  protoOf(StringSerializer).o32 = function (decoder) {
    return decoder.h35();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.n3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).m32 = function () {
    return this.n3h_1;
  };
  protoOf(CharSerializer).o3h = function (encoder, value) {
    return encoder.n36(value);
  };
  protoOf(CharSerializer).n32 = function (encoder, value) {
    return this.o3h(encoder, value instanceof Char ? value.p8_1 : THROW_CCE());
  };
  protoOf(CharSerializer).p3h = function (decoder) {
    return decoder.g35();
  };
  protoOf(CharSerializer).o32 = function (decoder) {
    return new Char(this.p3h(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.q3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).m32 = function () {
    return this.q3h_1;
  };
  protoOf(DoubleSerializer).r3h = function (encoder, value) {
    return encoder.m36(value);
  };
  protoOf(DoubleSerializer).n32 = function (encoder, value) {
    return this.r3h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(DoubleSerializer).o32 = function (decoder) {
    return decoder.f35();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.s3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).m32 = function () {
    return this.s3h_1;
  };
  protoOf(FloatSerializer).t3h = function (encoder, value) {
    return encoder.l36(value);
  };
  protoOf(FloatSerializer).n32 = function (encoder, value) {
    return this.t3h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(FloatSerializer).o32 = function (decoder) {
    return decoder.e35();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.u3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).m32 = function () {
    return this.u3h_1;
  };
  protoOf(LongSerializer).v3h = function (encoder, value) {
    return encoder.k36(value);
  };
  protoOf(LongSerializer).n32 = function (encoder, value) {
    return this.v3h(encoder, value instanceof Long ? value : THROW_CCE());
  };
  protoOf(LongSerializer).o32 = function (decoder) {
    return decoder.d35();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.w3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).m32 = function () {
    return this.w3h_1;
  };
  protoOf(IntSerializer).x3h = function (encoder, value) {
    return encoder.j36(value);
  };
  protoOf(IntSerializer).n32 = function (encoder, value) {
    return this.x3h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(IntSerializer).o32 = function (decoder) {
    return decoder.c35();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.y3h_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).m32 = function () {
    return this.y3h_1;
  };
  protoOf(ShortSerializer).z3h = function (encoder, value) {
    return encoder.i36(value);
  };
  protoOf(ShortSerializer).n32 = function (encoder, value) {
    return this.z3h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ShortSerializer).o32 = function (decoder) {
    return decoder.b35();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.a3i_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).m32 = function () {
    return this.a3i_1;
  };
  protoOf(ByteSerializer).b3i = function (encoder, value) {
    return encoder.h36(value);
  };
  protoOf(ByteSerializer).n32 = function (encoder, value) {
    return this.b3i(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
  };
  protoOf(ByteSerializer).o32 = function (decoder) {
    return decoder.a35();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.c3i_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).m32 = function () {
    return this.c3i_1;
  };
  protoOf(BooleanSerializer).d3i = function (encoder, value) {
    return encoder.g36(value);
  };
  protoOf(BooleanSerializer).n32 = function (encoder, value) {
    return this.d3i(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
  };
  protoOf(BooleanSerializer).o32 = function (decoder) {
    return decoder.z34();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.e3i_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).m32 = function () {
    return this.e3i_1.m32();
  };
  protoOf(UnitSerializer).f3i = function (decoder) {
    this.e3i_1.o32(decoder);
  };
  protoOf(UnitSerializer).o32 = function (decoder) {
    this.f3i(decoder);
    return Unit_instance;
  };
  protoOf(UnitSerializer).g3i = function (encoder, value) {
    this.e3i_1.c33(encoder, Unit_instance);
  };
  protoOf(UnitSerializer).n32 = function (encoder, value) {
    return this.g3i(encoder, value instanceof Unit ? value : THROW_CCE());
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.h3i_1 = serialName;
    this.i3i_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).s33 = function () {
    return this.h3i_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).w33 = function () {
    return this.i3i_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).u33 = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).a34 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).z33 = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).b34 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).y33 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).x33 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.h3i_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.h3i_1 === other.h3i_1 ? equals(this.i3i_1, other.i3i_1) : false)
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.h3i_1) + imul(31, this.i3i_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var keys = get_BUILTIN_SERIALIZERS().z1();
    var tmp0_iterator = keys.u();
    while (tmp0_iterator.v()) {
      var primitive = tmp0_iterator.w();
      var simpleName = capitalize(ensureNotNull(primitive.z5()));
      var qualifiedName = 'kotlin.' + simpleName;
      if (equals_0(serialName, qualifiedName, true) ? true : equals_0(serialName, simpleName, true)) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exist ' + capitalize(simpleName) + 'Serializer.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  function capitalize(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    // Inline function 'kotlin.text.replaceFirstChar' call
    var tmp;
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(_this__u8e3s4) > 0) {
      // Inline function 'kotlinx.serialization.internal.capitalize.<anonymous>' call
      var it = charSequenceGet(_this__u8e3s4, 0);
      var tmp$ret$1 = isLowerCase(it) ? titlecase(it) : toString_0(it);
      var tmp_0 = toString(tmp$ret$1);
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = tmp_0 + _this__u8e3s4.substring(1);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = mapOf([to(PrimitiveClasses_getInstance().a7(), serializer_1(StringCompanionObject_instance)), to(getKClass(Char), serializer_2(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().d7(), CharArraySerializer()), to(PrimitiveClasses_getInstance().y6(), serializer_3(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().j7(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().x6(), serializer_4(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().i7(), FloatArraySerializer()), to(getKClass(Long), serializer_5(Companion_getInstance_0())), to(PrimitiveClasses_getInstance().h7(), LongArraySerializer()), to(getKClass(ULong), serializer_6(Companion_getInstance_2())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().w6(), serializer_7(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().g7(), IntArraySerializer()), to(getKClass(UInt), serializer_8(Companion_getInstance_3())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().v6(), serializer_9(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().f7(), ShortArraySerializer()), to(getKClass(UShort), serializer_10(Companion_getInstance_4())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().u6(), serializer_11(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().e7(), ByteArraySerializer()), to(getKClass(UByte), serializer_12(Companion_getInstance_5())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().t6(), serializer_13(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().c7(), BooleanArraySerializer()), to(getKClass(Unit), serializer_14(Unit_instance)), to(PrimitiveClasses_getInstance().s6(), NothingSerializer()), to(getKClass(Duration), serializer_15(Companion_getInstance()))]);
    }
  }
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).l3i = function (_this__u8e3s4, index) {
    return this.n3i(this.m3i(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).n3i = function (nestedName) {
    var tmp0_elvis_lhs = this.q3i();
    return this.r3i(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).m3i = function (descriptor, index) {
    return descriptor.a34(index);
  };
  protoOf(NamedValueDecoder).r3i = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.e3j(tag);
    var r = block();
    if (!$this.p3i_1) {
      $this.f3j();
    }
    $this.p3i_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.j35($deserializer, $previousValue);
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.o3i_1 = ArrayList_init_$Create$_0();
    this.p3i_1 = false;
  }
  protoOf(TaggedDecoder).z35 = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).s3i = function (tag) {
    throw SerializationException_init_$Create$_0('' + getKClassFromExpression(this) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).t3i = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).u3i = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).v3i = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).w3i = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).x3i = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).y3i = function (tag) {
    var tmp = this.s3i(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).z3i = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).a3j = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).b3j = function (tag) {
    var tmp = this.s3i(tag);
    return tmp instanceof Char ? tmp.p8_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).c3j = function (tag) {
    var tmp = this.s3i(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).d3j = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.internal.TaggedDecoder.decodeTaggedInline.<anonymous>' call
    this.e3j(tag);
    return this;
  };
  protoOf(TaggedDecoder).j35 = function (deserializer, previousValue) {
    return this.k35(deserializer);
  };
  protoOf(TaggedDecoder).i35 = function (descriptor) {
    return this.d3j(this.f3j(), descriptor);
  };
  protoOf(TaggedDecoder).x34 = function () {
    var tmp0_elvis_lhs = this.q3i();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.t3i(currentTag);
  };
  protoOf(TaggedDecoder).y34 = function () {
    return null;
  };
  protoOf(TaggedDecoder).z34 = function () {
    return this.u3i(this.f3j());
  };
  protoOf(TaggedDecoder).a35 = function () {
    return this.v3i(this.f3j());
  };
  protoOf(TaggedDecoder).b35 = function () {
    return this.w3i(this.f3j());
  };
  protoOf(TaggedDecoder).c35 = function () {
    return this.x3i(this.f3j());
  };
  protoOf(TaggedDecoder).d35 = function () {
    return this.y3i(this.f3j());
  };
  protoOf(TaggedDecoder).e35 = function () {
    return this.z3i(this.f3j());
  };
  protoOf(TaggedDecoder).f35 = function () {
    return this.a3j(this.f3j());
  };
  protoOf(TaggedDecoder).g35 = function () {
    return this.b3j(this.f3j());
  };
  protoOf(TaggedDecoder).h35 = function () {
    return this.c3j(this.f3j());
  };
  protoOf(TaggedDecoder).l35 = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).m35 = function (descriptor) {
  };
  protoOf(TaggedDecoder).n35 = function (descriptor, index) {
    return this.u3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).o35 = function (descriptor, index) {
    return this.v3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).p35 = function (descriptor, index) {
    return this.w3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).q35 = function (descriptor, index) {
    return this.x3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).r35 = function (descriptor, index) {
    return this.y3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).s35 = function (descriptor, index) {
    return this.z3i(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).t35 = function (descriptor, index) {
    return this.a3j(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).u35 = function (descriptor, index) {
    return this.b3j(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).v35 = function (descriptor, index) {
    return this.c3j(this.l3i(descriptor, index));
  };
  protoOf(TaggedDecoder).w35 = function (descriptor, index) {
    return this.d3j(this.l3i(descriptor, index), descriptor.y33(index));
  };
  protoOf(TaggedDecoder).x35 = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.l3i(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).q3i = function () {
    return lastOrNull(this.o3i_1);
  };
  protoOf(TaggedDecoder).e3j = function (name) {
    this.o3i_1.r(name);
  };
  protoOf(TaggedDecoder).f3j = function () {
    var r = this.o3i_1.h1(get_lastIndex_0(this.o3i_1));
    this.p3i_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.g3j_1 = key;
    this.h3j_1 = value;
  }
  protoOf(MapEntry).e2 = function () {
    return this.g3j_1;
  };
  protoOf(MapEntry).f2 = function () {
    return this.h3j_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + this.g3j_1 + ', value=' + this.h3j_1 + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.g3j_1 == null ? 0 : hashCode(this.g3j_1);
    result = imul(result, 31) + (this.h3j_1 == null ? 0 : hashCode(this.h3j_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.g3j_1, tmp0_other_with_cast.g3j_1))
      return false;
    if (!equals(this.h3j_1, tmp0_other_with_cast.h3j_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.x32('key', $keySerializer.m32());
      $this$buildSerialDescriptor.x32('value', $valueSerializer.m32());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.k3j_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).m32 = function () {
    return this.k3j_1;
  };
  protoOf(MapEntrySerializer_0).l3j = function (_this__u8e3s4) {
    return _this__u8e3s4.e2();
  };
  protoOf(MapEntrySerializer_0).m3j = function (_this__u8e3s4) {
    return this.l3j((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).n3j = function (_this__u8e3s4) {
    return _this__u8e3s4.f2();
  };
  protoOf(MapEntrySerializer_0).o3j = function (_this__u8e3s4) {
    return this.n3j((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(MapEntrySerializer_0).p3j = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.x32('first', $keySerializer.m32());
      $this$buildClassSerialDescriptor.x32('second', $valueSerializer.m32());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.v3j_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).m32 = function () {
    return this.v3j_1;
  };
  protoOf(PairSerializer_0).w3j = function (_this__u8e3s4) {
    return _this__u8e3s4.mc_1;
  };
  protoOf(PairSerializer_0).m3j = function (_this__u8e3s4) {
    return this.w3j(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).x3j = function (_this__u8e3s4) {
    return _this__u8e3s4.nc_1;
  };
  protoOf(PairSerializer_0).o3j = function (_this__u8e3s4) {
    return this.x3j(_this__u8e3s4 instanceof Pair ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PairSerializer_0).p3j = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.y35($this.b3k_1, 0, $this.y3j_1);
    var b = composite.y35($this.b3k_1, 1, $this.z3j_1);
    var c = composite.y35($this.b3k_1, 2, $this.a3k_1);
    composite.m35($this.b3k_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.b36($this.b3k_1);
      if (index === -1) {
        break mainLoop;
      } else {
        if (index === 0) {
          a = composite.y35($this.b3k_1, 0, $this.y3j_1);
        } else {
          if (index === 1) {
            b = composite.y35($this.b3k_1, 1, $this.z3j_1);
          } else {
            if (index === 2) {
              c = composite.y35($this.b3k_1, 2, $this.a3k_1);
            } else {
              throw SerializationException_init_$Create$_0('Unexpected index ' + index);
            }
          }
        }
      }
    }
    composite.m35($this.b3k_1);
    if (a === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'first' is missing");
    if (b === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'second' is missing");
    if (c === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'third' is missing");
    var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
    var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
    return new Triple(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
  }
  function TripleSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.x32('first', this$0.y3j_1.m32());
      $this$buildClassSerialDescriptor.x32('second', this$0.z3j_1.m32());
      $this$buildClassSerialDescriptor.x32('third', this$0.a3k_1.m32());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.y3j_1 = aSerializer;
    this.z3j_1 = bSerializer;
    this.a3k_1 = cSerializer;
    var tmp = this;
    tmp.b3k_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).m32 = function () {
    return this.b3k_1;
  };
  protoOf(TripleSerializer_0).c3k = function (encoder, value) {
    var structuredEncoder = encoder.l35(this.b3k_1);
    structuredEncoder.a37(this.b3k_1, 0, this.y3j_1, value.jf_1);
    structuredEncoder.a37(this.b3k_1, 1, this.z3j_1, value.kf_1);
    structuredEncoder.a37(this.b3k_1, 2, this.a3k_1, value.lf_1);
    structuredEncoder.m35(this.b3k_1);
  };
  protoOf(TripleSerializer_0).n32 = function (encoder, value) {
    return this.c3k(encoder, value instanceof Triple ? value : THROW_CCE());
  };
  protoOf(TripleSerializer_0).o32 = function (decoder) {
    var composite = decoder.l35(this.b3k_1);
    if (composite.a36()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.q3j_1 = keySerializer;
    this.r3j_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).s3j = function (encoder, value) {
    var structuredEncoder = encoder.l35(this.m32());
    structuredEncoder.a37(this.m32(), 0, this.q3j_1, this.m3j(value));
    structuredEncoder.a37(this.m32(), 1, this.r3j_1, this.o3j(value));
    structuredEncoder.m35(this.m32());
  };
  protoOf(KeyValueSerializer).n32 = function (encoder, value) {
    return this.s3j(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
  };
  protoOf(KeyValueSerializer).o32 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.m32();
    var composite = decoder.l35(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.KeyValueSerializer.deserialize.<anonymous>' call
      if (composite.a36()) {
        var key = composite.y35(this.m32(), 0, this.q3j_1);
        var value = composite.y35(this.m32(), 1, this.r3j_1);
        tmp$ret$0 = this.p3j(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.b36(this.m32());
        if (idx === -1) {
          break mainLoop;
        } else {
          if (idx === 0) {
            key_0 = composite.y35(this.m32(), 0, this.q3j_1);
          } else {
            if (idx === 1) {
              value_0 = composite.y35(this.m32(), 1, this.r3j_1);
            } else {
              throw SerializationException_init_$Create$_0('Invalid index: ' + idx);
            }
          }
        }
      }
      if (key_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'key' is missing");
      if (value_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'value' is missing");
      var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
      tmp$ret$0 = this.p3j(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.m35(descriptor);
    return result;
  };
  var properties_initialized_Tuples_kt_3vs7ar;
  function _init_properties_Tuples_kt__dz0qyd() {
    if (!properties_initialized_Tuples_kt_3vs7ar) {
      properties_initialized_Tuples_kt_3vs7ar = true;
      NULL = new Object();
    }
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.d3k_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_0()));
  }
  protoOf(ULongSerializer).m32 = function () {
    return this.d3k_1;
  };
  protoOf(ULongSerializer).e3k = function (encoder, value) {
    var tmp = encoder.p36(this.d3k_1);
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
    tmp.k36(tmp$ret$0);
  };
  protoOf(ULongSerializer).n32 = function (encoder, value) {
    return this.e3k(encoder, value instanceof ULong ? value.mg_1 : THROW_CCE());
  };
  protoOf(ULongSerializer).f3k = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.i35(this.d3k_1).d35();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).o32 = function (decoder) {
    return new ULong(this.f3k(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.g3k_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_7(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).m32 = function () {
    return this.g3k_1;
  };
  protoOf(UIntSerializer).h3k = function (encoder, value) {
    var tmp = encoder.p36(this.g3k_1);
    // Inline function 'kotlin.UInt.toInt' call
    var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
    tmp.j36(tmp$ret$0);
  };
  protoOf(UIntSerializer).n32 = function (encoder, value) {
    return this.h3k(encoder, value instanceof UInt ? value.bg_1 : THROW_CCE());
  };
  protoOf(UIntSerializer).i3k = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.i35(this.g3k_1).c35();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).o32 = function (decoder) {
    return new UInt(this.i3k(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.j3k_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_9(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).m32 = function () {
    return this.j3k_1;
  };
  protoOf(UShortSerializer).k3k = function (encoder, value) {
    var tmp = encoder.p36(this.j3k_1);
    // Inline function 'kotlin.UShort.toShort' call
    var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
    tmp.i36(tmp$ret$0);
  };
  protoOf(UShortSerializer).n32 = function (encoder, value) {
    return this.k3k(encoder, value instanceof UShort ? value.xg_1 : THROW_CCE());
  };
  protoOf(UShortSerializer).l3k = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.i35(this.j3k_1).b35();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).o32 = function (decoder) {
    return new UShort(this.l3k(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.m3k_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_11(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).m32 = function () {
    return this.m3k_1;
  };
  protoOf(UByteSerializer).n3k = function (encoder, value) {
    var tmp = encoder.p36(this.m3k_1);
    // Inline function 'kotlin.UByte.toByte' call
    var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
    tmp.h36(tmp$ret$0);
  };
  protoOf(UByteSerializer).n32 = function (encoder, value) {
    return this.n3k(encoder, value instanceof UByte ? value.qf_1 : THROW_CCE());
  };
  protoOf(UByteSerializer).o3k = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.i35(this.m3k_1).a35();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).o32 = function (decoder) {
    return new UByte(this.o3k(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).l33 = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.k33(kClass, typeArgumentsSerializers) : $super.k33.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider) {
    SerializersModule.call(this);
    this.q3k_1 = class2ContextualFactory;
    this.r3k_1 = polyBase2Serializers;
    this.s3k_1 = polyBase2DefaultSerializerProvider;
    this.t3k_1 = polyBase2NamedSerializers;
    this.u3k_1 = polyBase2DefaultDeserializerProvider;
  }
  protoOf(SerialModuleImpl).h37 = function (baseClass, value) {
    if (!baseClass.a6(value))
      return null;
    var tmp0_safe_receiver = this.r3k_1.m2(baseClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m2(getKClassFromExpression(value));
    var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy) : false) ? tmp : null;
    if (!(registered == null))
      return registered;
    var tmp_0 = this.s3k_1.m2(baseClass);
    var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
  };
  protoOf(SerialModuleImpl).g37 = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.t3k_1.m2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, Map) ? tmp0_safe_receiver : THROW_CCE()).m2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.u3k_1.m2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).k33 = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.q3k_1.m2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v3k(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).p3k = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.q3k_1.b2().u();
    while (tmp0_iterator.v()) {
      var element = tmp0_iterator.w();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.e2();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.f2();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.y3k_1;
        collector.z3k(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.x3k(kclass, serial.w3k_1);
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_0 = this.r3k_1.b2().u();
    while (tmp0_iterator_0.v()) {
      var element_0 = tmp0_iterator_0.w();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.e2();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.f2();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var tmp0_iterator_1 = classMap.b2().u();
      while (tmp0_iterator_1.v()) {
        var element_1 = tmp0_iterator_1.w();
        // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.e2();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.f2();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$9 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.a3l(tmp_1, tmp_2, tmp$ret$9);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_2 = this.s3k_1.b2().u();
    while (tmp0_iterator_2.v()) {
      var element_2 = tmp0_iterator_2.w();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.e2();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.f2();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.b3l(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_3 = this.u3k_1.b2().u();
    while (tmp0_iterator_3.v()) {
      var element_3 = tmp0_iterator_3.w();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.e2();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.f2();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.c3l(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap());
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith(serializer) {
    this.d3l_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.d3l_1.equals(tmp0_other_with_cast.d3l_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.d3l_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(serializer=' + this.d3l_1 + ')';
  };
  function createCache(factory) {
    return new createCache$1(factory);
  }
  function createParametrizedCache(factory) {
    return new createParametrizedCache$1(factory);
  }
  function compiledSerializerImpl(_this__u8e3s4) {
    var tmp1_elvis_lhs = constructSerializerForGivenTypeArgs(_this__u8e3s4, []);
    var tmp;
    if (tmp1_elvis_lhs == null) {
      // Inline function 'kotlin.js.asDynamic' call
      var tmp0_safe_receiver = get_js(_this__u8e3s4).Companion;
      var tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.serializer();
      tmp = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  }
  function platformSpecificSerializerNotRegistered(_this__u8e3s4) {
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4) + '\n' + 'On Kotlin/JS explicitly declared serializer should be used for interfaces and enums without @Serializable annotation');
  }
  function isReferenceArray(rootClass) {
    return rootClass.equals(PrimitiveClasses_getInstance().z6());
  }
  function constructSerializerForGivenTypeArgs(_this__u8e3s4, args) {
    var tmp;
    try {
      // Inline function 'kotlin.reflect.findAssociatedObject' call
      var assocObject = findAssociatedObject(_this__u8e3s4, getKClass(SerializableWith));
      var tmp_0;
      if (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) {
        tmp_0 = (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) ? assocObject : THROW_CCE();
      } else {
        if (!(assocObject == null) ? isInterface(assocObject, SerializerFactory) : false) {
          var tmp_1 = assocObject.y3c(args.slice());
          tmp_0 = isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
        } else {
          if (get_isInterface(_this__u8e3s4)) {
            tmp_0 = new PolymorphicSerializer(_this__u8e3s4);
          } else {
            tmp_0 = null;
          }
        }
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_2;
      var e = $p;
      tmp_2 = null;
      tmp = tmp_2;
    }
    return tmp;
  }
  function get_isInterface(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = get_js(_this__u8e3s4).$metadata$;
    return (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.kind) == 'interface';
  }
  function toNativeArrayImpl(_this__u8e3s4, eClass) {
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(_this__u8e3s4);
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4));
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4));
    return _this__u8e3s4[index];
  }
  function createCache$1($factory) {
    this.e3l_1 = $factory;
  }
  protoOf(createCache$1).m33 = function (key) {
    return this.e3l_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.f3l_1 = $factory;
  }
  protoOf(createParametrizedCache$1).n33 = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      // Inline function 'kotlinx.serialization.internal.<no name provided>.get.<anonymous>' call
      var value = this.f3l_1(key, types);
      tmp = _Result___init__impl__xyqfz8(value);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).o33 = get_isNullable;
  protoOf(SerialDescriptorImpl).v33 = get_isInline;
  protoOf(AbstractDecoder).y35 = decodeSerializableElement$default;
  protoOf(AbstractDecoder).k35 = decodeSerializableValue;
  protoOf(AbstractDecoder).a36 = decodeSequentially;
  protoOf(AbstractDecoder).c36 = decodeCollectionSize;
  protoOf(AbstractEncoder).c37 = encodeNotNullMark;
  protoOf(AbstractEncoder).d37 = beginCollection;
  protoOf(AbstractEncoder).b37 = encodeSerializableValue;
  protoOf(ListLikeDescriptor).o33 = get_isNullable;
  protoOf(ListLikeDescriptor).v33 = get_isInline;
  protoOf(ListLikeDescriptor).t33 = get_annotations;
  protoOf(MapLikeDescriptor).o33 = get_isNullable;
  protoOf(MapLikeDescriptor).v33 = get_isInline;
  protoOf(MapLikeDescriptor).t33 = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).o33 = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).v33 = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).o3c = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).o33 = get_isNullable;
  protoOf(NothingSerialDescriptor).v33 = get_isInline;
  protoOf(NothingSerialDescriptor).t33 = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).o33 = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).v33 = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).t33 = get_annotations;
  protoOf(TaggedDecoder).y35 = decodeSerializableElement$default;
  protoOf(TaggedDecoder).k35 = decodeSerializableValue;
  protoOf(TaggedDecoder).a36 = decodeSequentially;
  protoOf(TaggedDecoder).c36 = decodeCollectionSize;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = SerializationException_init_$Init$_0;
  _.$_$.b = SEALED_getInstance;
  _.$_$.c = STRING_getInstance;
  _.$_$.d = CONTEXTUAL_getInstance;
  _.$_$.e = ENUM_getInstance;
  _.$_$.f = CLASS_getInstance;
  _.$_$.g = LIST_getInstance;
  _.$_$.h = MAP_getInstance;
  _.$_$.i = Companion_instance_0;
  _.$_$.j = ListSerializer;
  _.$_$.k = MapSerializer;
  _.$_$.l = SetSerializer;
  _.$_$.m = get_nullable;
  _.$_$.n = serializer_1;
  _.$_$.o = serializer_10;
  _.$_$.p = serializer_8;
  _.$_$.q = serializer_12;
  _.$_$.r = serializer_6;
  _.$_$.s = PolymorphicKind;
  _.$_$.t = PrimitiveKind;
  _.$_$.u = PrimitiveSerialDescriptor;
  _.$_$.v = get_annotations;
  _.$_$.w = get_isInline;
  _.$_$.x = get_isNullable;
  _.$_$.y = SerialDescriptor;
  _.$_$.z = ENUM;
  _.$_$.a1 = buildSerialDescriptor;
  _.$_$.b1 = getContextualDescriptor;
  _.$_$.c1 = AbstractDecoder;
  _.$_$.d1 = AbstractEncoder;
  _.$_$.e1 = CompositeDecoder;
  _.$_$.f1 = Decoder;
  _.$_$.g1 = Encoder;
  _.$_$.h1 = AbstractPolymorphicSerializer;
  _.$_$.i1 = ElementMarker;
  _.$_$.j1 = InlinePrimitiveDescriptor;
  _.$_$.k1 = NamedValueDecoder;
  _.$_$.l1 = SerializerFactory;
  _.$_$.m1 = jsonCachedSerialNames;
  _.$_$.n1 = EmptySerializersModule_0;
  _.$_$.o1 = contextual;
  _.$_$.p1 = SerializersModuleCollector;
  _.$_$.q1 = BinaryFormat;
  _.$_$.r1 = DeserializationStrategy;
  _.$_$.s1 = KSerializer;
  _.$_$.t1 = MissingFieldException;
  _.$_$.u1 = SealedClassSerializer;
  _.$_$.v1 = SerializationException;
  _.$_$.w1 = StringFormat;
  _.$_$.x1 = findPolymorphicSerializer;
  _.$_$.y1 = serializerOrNull_0;
  _.$_$.z1 = serializer_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core-js-ir.js.map
