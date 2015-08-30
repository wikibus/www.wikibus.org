import { ApiDocumentation } from '../../src/scripts/hydra';

describe('API Documentation', function() {
    var apiDocumentationJson = {
            "@context": [
                {
                    "hydra": "http://www.w3.org/ns/hydra/core#",
                    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "owl": "http://www.w3.org/2002/07/owl#",
                    "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
                    "dc": "http://purl.org/dc/terms/",
                    "cc": "http://creativecommons.org/ns#",
                    "apiDocumentation": "hydra:apiDocumentation",
                    "ApiDocumentation": "hydra:ApiDocumentation",
                    "title": "hydra:title",
                    "description": "hydra:description",
                    "entrypoint": {
                        "@id": "hydra:entrypoint",
                        "@type": "@id"
                    },
                    "supportedClass": {
                        "@id": "hydra:supportedClass",
                        "@type": "@vocab"
                    },
                    "Class": "hydra:Class",
                    "supportedProperty": {
                        "@id": "hydra:supportedProperty",
                        "@type": "@id"
                    },
                    "SupportedProperty": "hydra:SupportedProperty",
                    "property": {
                        "@id": "hydra:property",
                        "@type": "@vocab"
                    },
                    "required": "hydra:required",
                    "readonly": "hydra:readonly",
                    "writeonly": "hydra:writeonly",
                    "supportedOperation": {
                        "@id": "hydra:supportedOperation",
                        "@type": "@id"
                    },
                    "Operation": "hydra:Operation",
                    "CreateResourceOperation": "hydra:CreateResourceOperation",
                    "ReplaceResourceOperation": "hydra:ReplaceResourceOperation",
                    "DeleteResourceOperation": "hydra:DeleteResourceOperation",
                    "method": "hydra:method",
                    "expects": {
                        "@id": "hydra:expects",
                        "@type": "@vocab"
                    },
                    "returns": {
                        "@id": "hydra:returns",
                        "@type": "@vocab"
                    },
                    "statusCodes": {
                        "@id": "hydra:statusCodes",
                        "@type": "@id"
                    },
                    "StatusCodeDescription": "hydra:StatusCodeDescription",
                    "statusCode": "hydra:statusCode",
                    "Error": "hydra:Error",
                    "Resource": "hydra:Resource",
                    "operation": "hydra:operation",
                    "Collection": "hydra:Collection",
                    "member": {
                        "@id": "hydra:member",
                        "@type": "@id"
                    },
                    "search": "hydra:search",
                    "freetextQuery": "hydra:freetextQuery",
                    "PagedCollection": "hydra:PagedCollection",
                    "totalItems": "hydra:totalItems",
                    "itemsPerPage": "hydra:itemsPerPage",
                    "firstPage": {
                        "@id": "hydra:firstPage",
                        "@type": "@id"
                    },
                    "lastPage": {
                        "@id": "hydra:lastPage",
                        "@type": "@id"
                    },
                    "nextPage": {
                        "@id": "hydra:nextPage",
                        "@type": "@id"
                    },
                    "previousPage": {
                        "@id": "hydra:previousPage",
                        "@type": "@id"
                    },
                    "Link": "hydra:Link",
                    "TemplatedLink": "hydra:TemplatedLink",
                    "IriTemplate": "hydra:IriTemplate",
                    "template": "hydra:template",
                    "mapping": "hydra:mapping",
                    "IriTemplateMapping": "hydra:IriTemplateMapping",
                    "variable": "hydra:variable",
                    "defines": {
                        "@reverse": "rdfs:isDefinedBy"
                    },
                    "comment": "rdfs:comment",
                    "label": "rdfs:label",
                    "preferredPrefix": "http://purl.org/vocab/vann/preferredNamespacePrefix",
                    "cc:license": {
                        "@type": "@id"
                    },
                    "cc:attributionURL": {
                        "@type": "@id"
                    },
                    "domain": {
                        "@id": "rdfs:domain",
                        "@type": "@vocab"
                    },
                    "range": {
                        "@id": "rdfs:range",
                        "@type": "@vocab"
                    },
                    "subClassOf": {
                        "@id": "rdfs:subClassOf",
                        "@type": "@vocab"
                    },
                    "subPropertyOf": {
                        "@id": "rdfs:subPropertyOf",
                        "@type": "@vocab"
                    },
                    "seeAlso": {
                        "@id": "rdfs:seeAlso",
                        "@type": "@id"
                    }
                },
                {
                    "api": "http://wikibus.org/api#",
                    "wbo": "http://wikibus.org/ontology#",
                    "schema": "http://schema.org/",
                    "dcterms": "http://purl.org/dc/terms/",
                    "opus": "http://lsdis.cs.uga.edu/projects/semdis/opus#",
                    "bibo": "http://purl.org/ontology/bibo/"
                }
            ],
            "@id": "http://data.test.wikibus.org/doc",
            "supportedClass": [
                {
                    "@id": "http://wikibus.org/api#EntryPoint",
                    "supportedProperty": [
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "returns": "http://www.w3.org/ns/hydra/core#PagedCollection",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://wikibus.org/api#brochures",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "returns": "http://www.w3.org/ns/hydra/core#PagedCollection",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://wikibus.org/api#books",
                            "range": "http://www.w3.org/ns/hydra/core#PagedCollection",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "returns": "http://www.w3.org/ns/hydra/core#PagedCollection",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://wikibus.org/api#magazines",
                            "range": "http://www.w3.org/ns/hydra/core#PagedCollection",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        }
                    ],
                    "@type": "http://www.w3.org/ns/hydra/core#Class"
                },
                {
                    "@id": "http://wikibus.org/ontology#Book",
                    "supportedProperty": [
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://schema.org/isbn",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://schema.org/author",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/title",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/language",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/ontology/bibo/pages",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/date",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#year",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#month",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://schema.org/image",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        }
                    ],
                    "@type": "http://www.w3.org/ns/hydra/core#Class"
                },
                {
                    "@id": "http://wikibus.org/ontology#Brochure",
                    "supportedProperty": [
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/title",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://www.w3.org/2000/01/rdf-schema#comment",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/identifier",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/language",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/ontology/bibo/pages",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/date",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#year",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#month",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://schema.org/image",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        }
                    ],
                    "@type": "http://www.w3.org/ns/hydra/core#Class"
                },
                {
                    "@id": "http://wikibus.org/ontology#Magazine",
                    "supportedProperty": [
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/title",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://wikibus.org/api#issues",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        }
                    ],
                    "@type": "http://www.w3.org/ns/hydra/core#Class"
                },
                {
                    "@id": "http://wikibus.org/ontology#Issue",
                    "supportedProperty": [
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "supportedOperation": [
                                {
                                    "method": "GET",
                                    "@type": "http://www.w3.org/ns/hydra/core#Operation"
                                }
                            ],
                            "property": "http://schema.org/isPartOf",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://schema.org/issueNumber",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/language",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/ontology/bibo/pages",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://purl.org/dc/terms/date",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#year",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://lsdis.cs.uga.edu/projects/semdis/opus#month",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        },
                        {
                            "required": false,
                            "readonly": false,
                            "writeonly": false,
                            "property": "http://schema.org/image",
                            "@type": "http://www.w3.org/ns/hydra/core#SupportedProperty"
                        }
                    ],
                    "@type": "http://www.w3.org/ns/hydra/core#Class"
                }
            ],
            "entrypoint": "http://data.test.wikibus.org/",
            "@type": "http://www.w3.org/ns/hydra/core#ApiDocumentation"
        };
    var api;

    beforeEach(function() {
        api = new ApiDocumentation(apiDocumentationJson);
    });

    it('should have x', function() {
        expect(api.getX()).toBe(10);
    });

});