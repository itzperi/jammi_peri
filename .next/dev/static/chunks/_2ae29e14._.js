(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/adminDb.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDocument",
    ()=>createDocument,
    "deleteDocument",
    ()=>deleteDocument,
    "fetchCollection",
    ()=>fetchCollection,
    "fetchDocument",
    ()=>fetchDocument,
    "updateDocument",
    ()=>updateDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
const fetchCollection = async (collectionName)=>{
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], collectionName)); // You can add default ordering if needed or pass as args
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
    return snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }));
};
const fetchDocument = async (collectionName, id)=>{
    const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], collectionName, id);
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
    if (snapshot.exists()) {
        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    }
    return null;
};
const createDocument = async (collectionName, data)=>{
    const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return docRef.id;
};
const updateDocument = async (collectionName, id, data)=>{
    const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], collectionName, id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
    });
};
const deleteDocument = async (collectionName, id)=>{
    const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], collectionName, id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(docRef);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(public)/product/[id]/ProductTemplate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminDb.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ProductTemplate({ productId }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedAngle, setSelectedAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Reviews & Bundles
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bundles, setBundles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Review Form States
    const [reviewName, setReviewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [reviewRating, setReviewRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [reviewComment, setReviewComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmittingReview, setIsSubmittingReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reviewSuccess, setReviewSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductTemplate.useEffect": ()=>{
            loadData();
        }
    }["ProductTemplate.useEffect"], [
        productId
    ]);
    async function loadData() {
        setIsLoading(true);
        try {
            // Fetch product
            const dbProduct = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchDocument"])('products', productId);
            if (dbProduct) {
                setProduct({
                    id: dbProduct.id,
                    name: dbProduct.name,
                    label: dbProduct.category || 'Wellness',
                    shortDesc: dbProduct.description || 'Traditional formulation.',
                    price: dbProduct.price || 0,
                    image: dbProduct.images?.[0] || 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
                    category: dbProduct.category || 'Wellness',
                    features: [],
                    botanicals: [],
                    ritual: []
                });
            } else {
                const mockP = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PRODUCTS"].find((m)=>String(m.id) === productId);
                if (mockP) {
                    setProduct({
                        ...mockP,
                        id: String(mockP.id)
                    });
                }
            }
            // Fetch reviews
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCollection"])('reviews');
            setReviews(r.filter((review)=>review.productId === productId && review.status === 'Approved').sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            // Fetch bundles
            const b = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCollection"])('bundles');
            setBundles(b.filter((bundle)=>bundle.isActive && bundle.productIds.includes(productId)));
        } catch (err) {
            console.error(err);
        } finally{
            setIsLoading(false);
        }
    }
    const handleReviewSubmit = async (e)=>{
        e.preventDefault();
        if (!product) return;
        setIsSubmittingReview(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminDb$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDocument"])('reviews', {
                productId: product.id,
                productName: product.name,
                customerName: reviewName,
                rating: reviewRating,
                comment: reviewComment,
                status: 'Pending',
                createdAt: new Date().toISOString()
            });
            setReviewSuccess(true);
            setReviewName('');
            setReviewRating(5);
            setReviewComment('');
        } catch (err) {
            console.error(err);
            alert("Failed to submit review.");
        } finally{
            setIsSubmittingReview(false);
        }
    };
    const handleQuantityChange = (action)=>{
        if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (action === 'increase') {
            setQuantity(quantity + 1);
        }
    };
    const imageAngles = [
        {
            id: 0,
            style: {},
            icon: 'image',
            label: 'Front View'
        },
        {
            id: 1,
            style: {
                transform: 'scale(1.2) translateY(-5%)'
            },
            icon: 'zoom_in',
            label: 'Details'
        },
        {
            id: 2,
            style: {
                transform: 'scale(1.4) translateY(10%)'
            },
            icon: 'vertical_align_top',
            label: 'Top Focus'
        },
        {
            id: 3,
            style: {
                transform: 'scaleX(-1)'
            },
            icon: 'flip',
            label: 'Profile'
        }
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background-light min-h-screen pt-20 flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                lineNumber: 126,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
            lineNumber: 125,
            columnNumber: 13
        }, this);
    }
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background-light min-h-screen pt-20 flex flex-col justify-center items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-4",
                    children: "Product Not Found"
                }, void 0, false, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 134,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/shop",
                    className: "text-primary underline font-bold",
                    children: "Back to Shop"
                }, void 0, false, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 135,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
            lineNumber: 133,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background-light text-slate-900 font-body min-h-screen pt-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "max-w-7xl mx-auto px-4 md:px-10 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8 font-body",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "hover:text-primary transition-colors",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-xs",
                            children: "chevron_right"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 146,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/shop",
                            className: "hover:text-primary transition-colors text-xs whitespace-nowrap",
                            children: "Wellness Collection"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 147,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-xs",
                            children: "chevron_right"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 148,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-secondary font-bold text-xs truncate max-w-[150px] sm:max-w-none",
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 149,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col-reverse md:flex-row gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar shrink-0 w-full md:w-auto",
                                    children: imageAngles.map((angle, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSelectedAngle(index),
                                            title: angle.label,
                                            className: `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl border-2 overflow-hidden p-2 cursor-pointer shadow-sm transition-all duration-300 flex-shrink-0 flex items-center justify-center relative ${selectedAngle === index ? 'border-primary bg-primary/5' : 'border-secondary/10 bg-white dark:bg-slate-800 hover:border-primary/40'}`,
                                            children: index === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                alt: "thumbnail",
                                                className: "w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal",
                                                src: product.image
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 165,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `material-symbols-outlined text-2xl sm:text-3xl ${selectedAngle === index ? 'text-primary' : 'text-slate-300 dark:text-slate-600'}`,
                                                children: angle.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 167,
                                                columnNumber: 41
                                            }, this)
                                        }, angle.id, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 158,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 aspect-square sm:aspect-[4/5] bg-gradient-to-t from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 rounded-[2rem] border border-secondary/5 flex items-center justify-center p-8 relative overflow-hidden group w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 174,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2 z-10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-secondary text-white text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg",
                                                children: product.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 176,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 175,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-[85%] h-[85%] relative z-10 drop-shadow-2xl transition-all duration-700 ease-in-out",
                                            style: imageAngles[selectedAngle].style,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                alt: product.name,
                                                className: "w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal pointer-events-none",
                                                src: product.image
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 179,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 178,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 173,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 155,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col pt-2 md:pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-secondary dark:text-primary mb-2 sm:mb-3 leading-tight font-display",
                                            children: product.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 191,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl sm:text-2xl font-light text-slate-500 dark:text-slate-400 tracking-wide",
                                            children: product.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 192,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 font-body leading-relaxed",
                                    children: product.shortDesc
                                }, void 0, false, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 194,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-end mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-500 font-bold mb-1",
                                                            children: "Price"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-baseline gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight",
                                                                    children: [
                                                                        "₹",
                                                                        product.price
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                    lineNumber: 204,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs sm:text-sm font-medium text-slate-500",
                                                                    children: "/ Unit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                    lineNumber: 205,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right hidden sm:block",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined text-[12px] sm:text-[14px]",
                                                                children: "bolt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 41
                                                            }, this),
                                                            " In Stock"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 200,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col sm:flex-row gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl overflow-hidden h-14 w-full sm:w-36 shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleQuantityChange('decrease'),
                                                            className: "flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined flex",
                                                                children: "remove"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 flex items-center justify-center font-bold text-lg select-none",
                                                            children: quantity
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleQuantityChange('increase'),
                                                            className: "flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined flex",
                                                                children: "add"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "flex-1 bg-secondary text-white font-bold text-base sm:text-lg h-14 rounded-xl shadow-lg shadow-secondary/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined flex",
                                                            children: "shopping_basket"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 37
                                                        }, this),
                                                        "Add to Cart"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 215,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 199,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 189,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 153,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full bg-cover bg-center rounded-3xl overflow-hidden mb-16 sm:mb-24 relative",
                    style: {
                        backgroundImage: "url('https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2670&auto=format&fit=crop')"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-forest/80 backdrop-blur-sm"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 238,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 p-8 sm:p-12 md:p-20 text-center max-w-4xl mx-auto flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-primary text-4xl sm:text-5xl mb-4 sm:mb-6 opacity-80",
                                    children: "auto_stories"
                                }, void 0, false, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 240,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl sm:text-3xl md:text-5xl font-display font-medium text-white mb-4 sm:mb-6 leading-tight",
                                    children: "A Formulation Born of Heritage"
                                }, void 0, false, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 241,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base sm:text-lg text-slate-300 font-body leading-relaxed md:px-12",
                                    children: "Every Jammi product is deeply rooted in ancient Ayurvedic texts. We preserve the integrity of these powerful botanicals to guarantee true, holistic wellness for the modern era."
                                }, void 0, false, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 242,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 239,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 237,
                    columnNumber: 17
                }, this),
                bundles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mb-16 sm:mb-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-3xl font-bold text-secondary dark:text-white mb-8 font-display",
                            children: "Special Offers & Bundles"
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 251,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: bundles.map((bundle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0",
                                            children: bundle.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: bundle.imageUrl,
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 256,
                                                columnNumber: 60
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-4xl text-slate-300 w-full h-full flex justify-center items-center",
                                                children: "image"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 256,
                                                columnNumber: 131
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 255,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-block bg-saffron text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2",
                                                    children: [
                                                        bundle.discountPercentage,
                                                        "% OFF Bundle"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-bold text-slate-800",
                                                    children: bundle.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500 line-clamp-2 mt-1",
                                                    children: bundle.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "mt-4 text-primary font-bold text-sm hover:underline",
                                                    children: "View Bundle Details →"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 258,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, bundle.id, true, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 254,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                            lineNumber: 252,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 250,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mb-16 sm:mb-24 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-secondary dark:text-white mb-2 font-display",
                                        children: "Customer Reviews"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                        lineNumber: 275,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 text-sm mb-8",
                                        children: "Share your experience with this formulation."
                                    }, void 0, false, {
                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                        lineNumber: 276,
                                        columnNumber: 29
                                    }, this),
                                    reviewSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm font-medium flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-[20px] text-green-500",
                                                children: "check_circle"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 280,
                                                columnNumber: 37
                                            }, this),
                                            "Thank you! Your review has been submitted and is pending moderation."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                        lineNumber: 279,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleReviewSubmit,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider",
                                                        children: "Your Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: reviewName,
                                                        onChange: (e)=>setReviewName(e.target.value),
                                                        required: true,
                                                        className: "w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 285,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider",
                                                        children: "Rating"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-1",
                                                        children: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                onClick: ()=>setReviewRating(star),
                                                                className: `material-symbols-outlined text-2xl cursor-pointer transition-colors ${star <= reviewRating ? 'text-saffron font-variation-settings-"FILL" 1' : 'text-slate-300'}`,
                                                                children: "star"
                                                            }, star, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 49
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 289,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider",
                                                        children: "Your Review"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: reviewComment,
                                                        onChange: (e)=>setReviewComment(e.target.value),
                                                        required: true,
                                                        rows: 4,
                                                        className: "w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none",
                                                        placeholder: "How did this product help you?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 299,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isSubmittingReview,
                                                className: "w-full bg-secondary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50",
                                                children: isSubmittingReview ? 'Submitting...' : 'Submit Review'
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 303,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                        lineNumber: 284,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                lineNumber: 274,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-6",
                                children: reviews.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-4xl mb-2",
                                            children: "reviews"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 314,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "No reviews yet. Be the first to share your experience!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                            lineNumber: 315,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                    lineNumber: 313,
                                    columnNumber: 33
                                }, this) : reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-slate-900 dark:text-white text-lg",
                                                                children: review.customerName
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-slate-500",
                                                                children: new Date(review.createdAt).toLocaleDateString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex text-saffron",
                                                        children: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `material-symbols-outlined text-[16px] ${star <= review.rating ? 'font-variation-settings-"FILL" 1' : ''}`,
                                                                children: "star"
                                                            }, star, false, {
                                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 320,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-slate-600 dark:text-slate-400 text-sm leading-relaxed",
                                                children: review.comment
                                            }, void 0, false, {
                                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                                lineNumber: 333,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, review.id, true, {
                                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                        lineNumber: 319,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                                lineNumber: 311,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                        lineNumber: 272,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
                    lineNumber: 271,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
            lineNumber: 142,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(public)/product/[id]/ProductTemplate.tsx",
        lineNumber: 141,
        columnNumber: 9
    }, this);
}
_s(ProductTemplate, "V2Sd+hikKEqqYn4BlEBBdam0sOk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductTemplate;
var _c;
__turbopack_context__.k.register(_c, "ProductTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2ae29e14._.js.map