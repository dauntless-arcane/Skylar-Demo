import { useEffect, useRef, useState } from "react";

// ─── EMBEDDED DATA ────────────────────────────────────────────────────────────
const RAW_DATA = {"workOrders":[{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-075","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Raw images/videography","startDate":"2025-05-31","endDate":"2025-06-03","poDate":"2025-10-29","valueExGST":"264398.08","valueIncGST":"311989.7344","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Appa","company":"WOCOMPANY_038","id":"SDPLDEAL-101","nature":"Proof of Concept","status":"Not Started","sector":"Powerline","workType":"Powerline Inspection","startDate":"2025-08-11","endDate":"2025-08-15","poDate":"2025-07-31","valueExGST":"154150","valueIncGST":"181897","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_002","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-002","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Volumetric survey","startDate":"2025-05-01","endDate":"2026-04-30","poDate":"2025-05-16","valueExGST":"2984097.36","valueIncGST":"3521234.885","billedExGST":"23959.68248","collected":"","receivable":"28272.42533","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"Partially Billed","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-003","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-20","endDate":"2025-05-31","poDate":"2025-05-08","valueExGST":"184980","valueIncGST":"218276.4","billedExGST":"184980","collected":"66880.1356","receivable":"151396.2644","invoiceStatus":"Not billed yet","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"SpongeBob","company":"WOCOMPANY_032","id":"SDPLDEAL-004","nature":"One time Project","status":"Completed","sector":"Powerline","workType":"Powerline Inspection","startDate":"2025-05-24","endDate":"2025-06-20","poDate":"2025-05-06","valueExGST":"1132250.248","valueIncGST":"1336055.293","billedExGST":"1215157.544","collected":"","receivable":"1433885.902","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"BIlled","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Edward Elric","company":"WOCOMPANY_008","id":"SDPLDEAL-005","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology","startDate":"2025-05-20","endDate":"2025-05-31","poDate":"2025-05-16","valueExGST":"135652","valueIncGST":"160069.36","billedExGST":"135652","collected":"160069.36","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Pumbaa","company":"WOCOMPANY_047","id":"SDPLDEAL-001","nature":"Annual Rate Contract","status":"Ongoing","sector":"Renewables","workType":"Others","startDate":"2025-05-19","endDate":"2025-11-19","poDate":"2025-05-15","valueExGST":"3995568","valueIncGST":"4714770.24","billedExGST":"3662604","collected":"1405108.08","receivable":"2916764.64","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_005","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-006","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2026-04-30","poDate":"2025-05-21","valueExGST":"727588","valueIncGST":"858553.84","billedExGST":"151417.1918","collected":"178672.182","receivable":"0.10432872","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-007","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-20","endDate":"2026-04-30","poDate":"2025-05-22","valueExGST":"2293752","valueIncGST":"2706627.36","billedExGST":"1742808.444","collected":"1225606.682","receivable":"830907.2814","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-008","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-20","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"126649.64","valueIncGST":"149446.5752","billedExGST":"81360.37","collected":"","receivable":"96005.2366","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-009","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-15","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"1198053.8","valueIncGST":"1413703.484","billedExGST":"680159.9172","collected":"397840.8515","receivable":"404747.8508","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-010","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-14","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"112652.82","valueIncGST":"132930.3276","billedExGST":"112652.82","collected":"","receivable":"132930.3276","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-011","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-10","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"643730.4","valueIncGST":"759601.872","billedExGST":"593662.48","collected":"641154.9235","receivable":"59366.80294","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-012","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-14","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"770750","valueIncGST":"909485","billedExGST":"380158.564","collected":"371722.8964","receivable":"76864.20912","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-013","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-15","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"214576.8","valueIncGST":"253200.624","billedExGST":"172555.51","collected":"186359.8768","receivable":"17255.62499","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-014","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-09","endDate":"2025-06-20","poDate":"2025-04-10","valueExGST":"250339.6","valueIncGST":"295400.728","billedExGST":"177469.3187","collected":"191666.4104","receivable":"17747.38569","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-015","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-22","endDate":"2025-06-20","poDate":"2025-04-10","valueExGST":"109791.796","valueIncGST":"129554.3193","billedExGST":"109791.796","collected":"118573.9065","receivable":"10980.4128","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-016","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-25","endDate":"2025-06-13","poDate":"2025-04-10","valueExGST":"210799.5084","valueIncGST":"248743.4199","billedExGST":"210799.5084","collected":"189719.4712","receivable":"59023.94868","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-017","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-25","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"62584.9","valueIncGST":"73850.182","billedExGST":"62584.9","collected":"67591.91398","receivable":"6258.268024","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-018","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-28","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"260360.5832","valueIncGST":"307225.4882","billedExGST":"260353.184","collected":"281181.8333","receivable":"26034.92378","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-019","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"157535.134","valueIncGST":"185891.4581","billedExGST":"157399.2354","collected":"185891.3348","receivable":"-160.2370752","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-020","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-02","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"227987.85","valueIncGST":"269025.663","billedExGST":"215828.498","collected":"233094.3832","receivable":"21583.24442","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-021","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"151275.4108","valueIncGST":"178504.9847","billedExGST":"125206.796","collected":"147743.526","receivable":"0.49328","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-022","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"1164911.55","valueIncGST":"1374595.629","billedExGST":"1138011.758","collected":"1342853.678","receivable":"0.197312","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-024","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"371860.3612","valueIncGST":"438795.2262","billedExGST":"365246.7096","collected":"430990.772","receivable":"0.345296","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-023","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"440190.74","valueIncGST":"519425.0732","billedExGST":"396450.3692","collected":"467810.7204","receivable":"0.715256","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-025","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-07","endDate":"2025-06-15","poDate":"2025-04-10","valueExGST":"170274.09","valueIncGST":"200923.4262","billedExGST":"170274.09","collected":"","receivable":"200923.4262","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_005","id":"SDPLDEAL-026","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"183130.2","valueIncGST":"216093.636","billedExGST":"179510.758","collected":"17951.6924","receivable":"193871.002","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_005","id":"SDPLDEAL-027","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"937848.6","valueIncGST":"1106661.348","billedExGST":"937848.6","collected":"","receivable":"1106661.348","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_005","id":"SDPLDEAL-028","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"355161.6","valueIncGST":"419090.688","billedExGST":"336437.9244","collected":"","receivable":"396996.7508","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_005","id":"SDPLDEAL-029","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"358830.8633","valueIncGST":"423420.4187","billedExGST":"358830.37","collected":"","receivable":"423419.8366","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Armin","company":"WOCOMPANY_020","id":"SDPLDEAL-030","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-15","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"135488.712","valueIncGST":"159876.6801","billedExGST":"135489.2176","collected":"159876.9808","receivable":"0.295968","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Armin","company":"WOCOMPANY_020","id":"SDPLDEAL-031","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-15","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"236813.8624","valueIncGST":"279440.3576","billedExGST":"236813.8624","collected":"4737.9544","receivable":"274702.4032","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Armin","company":"WOCOMPANY_020","id":"SDPLDEAL-032","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-15","endDate":"2025-05-30","poDate":"2025-04-10","valueExGST":"382095.9212","valueIncGST":"450873.187","billedExGST":"382095.9212","collected":"450873.9516","receivable":"-0.764584","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Jessie","company":"WOCOMPANY_043","id":"SDPLDEAL-033","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-21","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"755939.268","valueIncGST":"892008.3362","billedExGST":"545913.7159","collected":"383312.436","receivable":"260865.7488","invoiceStatus":"Partially Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Naruto","company":"WOCOMPANY_001","id":"SDPLDEAL-034","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology","startDate":"2025-05-27","endDate":"2025-06-30","poDate":"2025-05-27","valueExGST":"308300","valueIncGST":"363794","billedExGST":"308300","collected":"120853.6","receivable":"242940.4","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Inosuke","company":"WOCOMPANY_045","id":"SDPLDEAL-035","nature":"Proof of Concept","status":"Ongoing","sector":"Railways","workType":"Road/rail survey","startDate":"2025-06-01","endDate":"2025-06-30","poDate":"2025-05-13","valueExGST":"1.2332","valueIncGST":"1.455176","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-037","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-06-04","endDate":"2025-06-30","poDate":"2025-04-25","valueExGST":"2250751.549","valueIncGST":"2655886.828","billedExGST":"2158261.919","collected":"","receivable":"2546749.065","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-038","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-06-12","endDate":"2025-06-30","poDate":"2025-04-10","valueExGST":"476015.2","valueIncGST":"561697.936","billedExGST":"476382.6936","collected":"562132.0224","receivable":"-0.443952","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-040","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB","startDate":"2025-06-16","endDate":"2025-07-04","poDate":"2025-06-11","valueExGST":"1426208.132","valueIncGST":"1682925.596","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-041","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-06-02","endDate":"2025-06-13","poDate":"2025-06-11","valueExGST":"443952","valueIncGST":"523863.36","billedExGST":"443952","collected":"523863.36","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-042","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-06-02","endDate":"2025-06-11","poDate":"2025-06-11","valueExGST":"881738","valueIncGST":"1040450.84","billedExGST":"881738","collected":"895103.4216","receivable":"145347.4184","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Erwin","company":"WOCOMPANY_021","id":"SDPLDEAL-043","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-06-16","endDate":"2025-06-23","poDate":"2025-04-10","valueExGST":"16648.2","valueIncGST":"19644.876","billedExGST":"16648.2","collected":"","receivable":"19644.876","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_005","id":"SDPLDEAL-044","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-06-14","endDate":"2025-06-23","poDate":"2025-04-10","valueExGST":"12774.7188","valueIncGST":"15074.16818","billedExGST":"12774.7188","collected":"15074.6368","receivable":"-0.468616","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_051","id":"SDPLDEAL-046","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-22","endDate":"2025-06-22","poDate":"2025-04-10","valueExGST":"390952.7636","valueIncGST":"461324.261","billedExGST":"390887.404","collected":"461247.63","receivable":"-0.49328","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_051","id":"SDPLDEAL-047","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-15","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"476539.31","valueIncGST":"562316.3858","billedExGST":"469116.7409","collected":"506645.9025","receivable":"46911.85167","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_051","id":"SDPLDEAL-048","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-14","endDate":"2025-06-30","poDate":"2025-04-10","valueExGST":"145842.4865","valueIncGST":"172094.1341","billedExGST":"145842.4865","collected":"157509.7547","receivable":"14584.37937","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_051","id":"SDPLDEAL-049","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-21","endDate":"2025-07-21","poDate":"2025-04-10","valueExGST":"707388.184","valueIncGST":"834718.0571","billedExGST":"707388.184","collected":"763979.732","receivable":"70738.32512","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-050","nature":"Proof of Concept","status":"Completed","sector":"Renewables","workType":"Videography for construction monitoring, Topography Survey: RGB","startDate":"2025-06-23","endDate":"2025-08-10","poDate":"2025-06-20","valueExGST":"1.2332","valueIncGST":"1.455176","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-051","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Others","startDate":"2025-01-01","endDate":"2025-06-20","poDate":"2025-06-17","valueExGST":"2466400","valueIncGST":"2910352","billedExGST":"2466400","collected":"2910352","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_005","expectedBillingMonth":""},{"name":"Mr. Krabs","company":"WOCOMPANY_031","id":"SDPLDEAL-053","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-05-15","endDate":"2025-05-19","poDate":"2025-01-21","valueExGST":"184980","valueIncGST":"218276.4","billedExGST":"184980","collected":"","receivable":"218276.4","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-054","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-06-04","endDate":"2025-06-11","poDate":"2025-05-14","valueExGST":"65976.2","valueIncGST":"77851.916","billedExGST":"65967.5676","collected":"77841.72977","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Asuna","company":"WOCOMPANY_018","id":"SDPLDEAL-055","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Videography for construction monitoring","startDate":"","endDate":"","poDate":"2023-04-11","valueExGST":"1775808","valueIncGST":"2095453.44","billedExGST":"369960","collected":"224434.0389","receivable":"212118.7611","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-056","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Raw images/videography","startDate":"2025-05-08","endDate":"","poDate":"2025-02-28","valueExGST":"30830","valueIncGST":"36379.4","billedExGST":"30830","collected":"","receivable":"36379.4","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_008","expectedBillingMonth":""},{"name":"Asuna","company":"WOCOMPANY_018","id":"SDPLDEAL-057","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Videography for construction monitoring","startDate":"","endDate":"","poDate":"2024-07-12","valueExGST":"665928","valueIncGST":"785795.04","billedExGST":"110988","collected":"81392.4332","receivable":"49573.4068","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Gohan","company":"WOCOMPANY_026","id":"SDPLDEAL-058","nature":"One time Project","status":"Completed","sector":"Construction","workType":"Topography Survey: RGB, Hydrology","startDate":"","endDate":"","poDate":"2025-03-28","valueExGST":"1514246.28","valueIncGST":"1786810.61","billedExGST":"1514246.28","collected":"1635385.982","receivable":"151424.628","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Powerpuff Girls","company":"WOCOMPANY_039","id":"SDPLDEAL-060","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"","endDate":"","poDate":"2025-01-23","valueExGST":"3877242.46","valueIncGST":"4575146.103","billedExGST":"2684244.78","collected":"2141430.836","receivable":"1025978.005","invoiceStatus":"Billed- Visit 7","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Rafiki","company":"WOCOMPANY_048","id":"SDPLDEAL-061","nature":"Monthly Contract","status":"Executed until current month","sector":"Mining","workType":"Topography Survey: RGB, Videography for construction monitoring","startDate":"","endDate":"","poDate":"2022-09-29","valueExGST":"2757435.2","valueIncGST":"3253773.536","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Bulbasaur","company":"WOCOMPANY_050","id":"SDPLDEAL-062","nature":"Annual Rate Contract","status":"Executed until current month","sector":"Others","workType":"Others","startDate":"2025-02-05","endDate":"2025-06-20","poDate":"2025-03-25","valueExGST":"158699.3858","valueIncGST":"187265.2752","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-063","nature":"Annual Rate Contract","status":"Executed until current month","sector":"Mining","workType":"Mine survey","startDate":"2025-04-01","endDate":"2026-04-01","poDate":"2025-04-01","valueExGST":"1.2332","valueIncGST":"1.455176","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Shanks","company":"WOCOMPANY_012","id":"SDPLDEAL-065","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Solar Inspection, Thermography","startDate":"2025-04-10","endDate":"2025-04-16","poDate":"2025-04-12","valueExGST":"24664","valueIncGST":"29103.52","billedExGST":"24664","collected":"2467.6332","receivable":"26635.8868","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-066","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-10","poDate":"2025-04-10","valueExGST":"81555.27726","valueIncGST":"96235.22717","billedExGST":"81555.27726","collected":"96235.2284","receivable":"-0.0012332","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Frieza","company":"WOCOMPANY_022","id":"SDPLDEAL-067","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"125169.8","valueIncGST":"147700.364","billedExGST":"116542.0245","collected":"20977.47192","receivable":"116542.117","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-068","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"61690.83","valueIncGST":"72795.1794","billedExGST":"61690.83","collected":"72795.796","receivable":"-0.6166","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-069","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"144622.2968","valueIncGST":"170654.3102","billedExGST":"144622.2968","collected":"","receivable":"170654.3102","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-070","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-17","poDate":"2025-04-10","valueExGST":"80098.8064","valueIncGST":"94516.59155","billedExGST":"80098.8064","collected":"73807.6366","receivable":"20708.95495","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-071","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-17","poDate":"2025-04-10","valueExGST":"94747.9892","valueIncGST":"111802.6273","billedExGST":"94747.9892","collected":"92852.5608","receivable":"18950.06646","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-072","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-17","poDate":"2025-04-10","valueExGST":"234398.0236","valueIncGST":"276589.6678","billedExGST":"234398.0236","collected":"","receivable":"276589.6678","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tanjiro","company":"WOCOMPANY_051","id":"SDPLDEAL-073","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Others","startDate":"2025-05-15","endDate":"2025-06-15","poDate":"2025-04-28","valueExGST":"321865.2","valueIncGST":"379800.936","billedExGST":"166482","collected":"196448.76","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Frieza","company":"WOCOMPANY_022","id":"SDPLDEAL-074","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-16","poDate":"2025-04-10","valueExGST":"188717.7922","valueIncGST":"222686.9948","billedExGST":"188717.7922","collected":"222687.5564","receivable":"-0.56159928","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Yuji Itadori","company":"WOCOMPANY_006","id":"SDPLDEAL-076","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-04-05","endDate":"2025-04-11","poDate":"2025-04-01","valueExGST":"431620","valueIncGST":"509311.6","billedExGST":"431620","collected":"509311.6","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"BIlled","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Winnie the Pooh","company":"WOCOMPANY_042","id":"SDPLDEAL-077","nature":"Proof of Concept","status":"Completed","sector":"Mining","workType":"Volumetric survey, Others","startDate":"2025-04-30","endDate":"2025-04-30","poDate":"2025-04-18","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-078","nature":"Proof of Concept","status":"Completed","sector":"Mining","workType":"Volumetric survey","startDate":"2025-06-13","endDate":"2025-06-13","poDate":"2025-06-06","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Trunks","company":"WOCOMPANY_015","id":"SDPLDEAL-079","nature":"Proof of Concept","status":"Completed","sector":"Railways","workType":"Road/rail survey","startDate":"2025-04-23","endDate":"2025-04-23","poDate":"2025-07-01","valueExGST":"554940","valueIncGST":"654829.2","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Tuxedo Mask","company":"WOCOMPANY_052","id":"SDPLDEAL-080","nature":"Annual Rate Contract","status":"Executed until current month","sector":"Mining","workType":"Topography Survey: RGB, Volumetric survey","startDate":"2025-04-01","endDate":"2028-03-31","poDate":"2025-04-01","valueExGST":"2959680","valueIncGST":"3492422.4","billedExGST":"493282.4664","collected":"","receivable":"582073.3104","invoiceStatus":"Billed- Visit 3","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-081","nature":"Proof of Concept","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Raw images/videography","startDate":"2025-07-01","endDate":"2025-08-17","poDate":"2025-06-27","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"","receivable":"327414.6","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-082","nature":"Proof of Concept","status":"Pause / struck","sector":"Renewables","workType":"Topography Survey: RGB, Raw images/videography, Others","startDate":"2025-07-01","endDate":"2025-08-17","poDate":"2025-06-19","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"","receivable":"327414.6","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-083","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-25","poDate":"2025-04-10","valueExGST":"143051.2","valueIncGST":"168800.416","billedExGST":"130176.592","collected":"26035.3184","receivable":"127573.0602","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Tuxedo Mask","company":"WOCOMPANY_041","id":"SDPLDEAL-084","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Others","startDate":"2025-07-01","endDate":"2025-07-10","poDate":"2025-06-21","valueExGST":"215810","valueIncGST":"254655.8","billedExGST":"215810","collected":"","receivable":"254655.8","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Luffy","company":"WOCOMPANY_032","id":"SDPLDEAL-085","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Thermography","startDate":"2025-06-01","endDate":"2025-06-30","poDate":"2025-06-21","valueExGST":"#VALUE!","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-086","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Volumetric survey","startDate":"2024-07-30","endDate":"2025-07-30","poDate":"2024-07-22","valueExGST":"710616.2083","valueIncGST":"838527.1258","billedExGST":"710616.2083","collected":"767463.522","receivable":"71063.60382","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-087","nature":"Annual Rate Contract","status":"Executed until current month","sector":"Mining","workType":"Volumetric survey","startDate":"2025-04-01","endDate":"2026-03-31","poDate":"2025-08-08","valueExGST":"1065928.752","valueIncGST":"1257795.927","billedExGST":"838526.672","collected":"618232.7568","receivable":"371228.7162","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-088","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-04-28","endDate":"2025-08-15","poDate":"2025-04-26","valueExGST":"154150","valueIncGST":"181897","billedExGST":"154150","collected":"166482","receivable":"15415","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Obito","company":"WOCOMPANY_023","id":"SDPLDEAL-089","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Others","startDate":"2025-06-21","endDate":"2026-06-20","poDate":"2025-07-09","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Mojo Jojo","company":"WOCOMPANY_036","id":"SDPLDEAL-090","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-12","endDate":"2025-06-20","poDate":"2025-04-15","valueExGST":"223971.3176","valueIncGST":"264286.1548","billedExGST":"223971.3176","collected":"264287.092","receivable":"-0.937232","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Rafiki","company":"WOCOMPANY_048","id":"SDPLDEAL-091","nature":"Proof of Concept","status":"Completed","sector":"Mining","workType":"Thermography","startDate":"2025-06-11","endDate":"2025-06-19","poDate":"2025-07-08","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-092","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-06-25","poDate":"2025-04-10","valueExGST":"357628","valueIncGST":"422001.04","billedExGST":"321686.386","collected":"347420.6186","receivable":"32169.31686","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Obito","company":"WOCOMPANY_023","id":"SDPLDEAL-093","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Others","startDate":"2025-07-21","endDate":"2025-07-25","poDate":"2025-07-15","valueExGST":"76458.4","valueIncGST":"90220.912","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"GG go","company":"WOCOMPANY_035","id":"SDPLDEAL-094","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology","startDate":"2025-07-15","endDate":"2025-07-31","poDate":"2025-07-10","valueExGST":"749785.6","valueIncGST":"884747.008","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-095","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-30","poDate":"2025-07-17","valueExGST":"155665.6028","valueIncGST":"183685.4113","billedExGST":"155665.6028","collected":"3115.0632","receivable":"180570.3481","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-096","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB","startDate":"2025-07-14","endDate":"2025-07-28","poDate":"2025-07-16","valueExGST":"986560","valueIncGST":"1164140.8","billedExGST":"986560","collected":"","receivable":"1164140.8","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-097","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-31","poDate":"2025-04-10","valueExGST":"84190.564","valueIncGST":"99344.86552","billedExGST":"79060.452","collected":"85383.90698","receivable":"7907.426384","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Erwin","company":"WOCOMPANY_021","id":"SDPLDEAL-098","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-26","endDate":"2025-06-25","poDate":"2025-05-22","valueExGST":"319811.922","valueIncGST":"377378.068","billedExGST":"319811.922","collected":"","receivable":"377378.068","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Goku","company":"WOCOMPANY_003","id":"SDPLDEAL-099","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"LiDAR Survey: LiDAR, Road/rail survey","startDate":"2025-07-28","endDate":"2025-09-30","poDate":"2025-07-23","valueExGST":"14391444","valueIncGST":"16981903.92","billedExGST":"246640","collected":"291035.2","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Partially Billed","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Erwin","company":"WOCOMPANY_021","id":"SDPLDEAL-100","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Volumetric survey","startDate":"2025-07-01","endDate":"2025-07-15","poDate":"2025-05-28","valueExGST":"791874.716","valueIncGST":"934412.1649","billedExGST":"594265.4161","collected":"","receivable":"701233.191","invoiceStatus":"Fully Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Nami","company":"WOCOMPANY_002","id":"SDPLDEAL-102","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Raw images/videography","startDate":"2025-08-04","endDate":"2025-08-09","poDate":"2025-08-02","valueExGST":"64373.04","valueIncGST":"75960.1872","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-103","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-07-01","endDate":"2025-07-31","poDate":"2025-08-01","valueExGST":"487114","valueIncGST":"574794.52","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Subaru","company":"WOCOMPANY_019","id":"SDPLDEAL-105","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-29","poDate":"2025-08-06","valueExGST":"20563.61","valueIncGST":"24265.0598","billedExGST":"20251.6104","collected":"23896.9496","receivable":"-0.049328","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Yuji Itadori","company":"WOCOMPANY_006","id":"SDPLDEAL-106","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-08-08","endDate":"2025-08-20","poDate":"2025-08-08","valueExGST":"339130","valueIncGST":"400173.4","billedExGST":"339130","collected":"400173.4","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-108","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-08-14","endDate":"2025-08-30","poDate":"2025-08-18","valueExGST":"477247.7957","valueIncGST":"563152.399","billedExGST":"477247.7957","collected":"563151.8788","receivable":"0.52016376","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Rafiki","company":"WOCOMPANY_048","id":"SDPLDEAL-109","nature":"Annual Rate Contract","status":"Ongoing","sector":"Renewables","workType":"Topography Survey: RGB, Thermography","startDate":"2025-09-01","endDate":"2027-08-31","poDate":"2025-08-11","valueExGST":"616600","valueIncGST":"727588","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_162","company":"WOCOMPANY_052","id":"SDPLDEAL-111","nature":"","status":"","sector":"Mining","workType":"Others","startDate":"","endDate":"","poDate":"2024-11-22","valueExGST":"863240","valueIncGST":"1018623.2","billedExGST":"739920","collected":"864473.2","receivable":"8632.4","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_034","id":"SDPLDEAL-112","nature":"","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"","endDate":"","poDate":"2024-05-16","valueExGST":"215810","valueIncGST":"254655.8","billedExGST":"215810","collected":"254655.8","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-113","nature":"","status":"","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"","endDate":"","poDate":"2024-12-20","valueExGST":"607351","valueIncGST":"716674.18","billedExGST":"607351","collected":"716674.18","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Yuji Itadori","company":"WOCOMPANY_006","id":"SDPLDEAL-115","nature":"","status":"Completed","sector":"Renewables","workType":"Hydrology","startDate":"","endDate":"","poDate":"2025-03-24","valueExGST":"616600","valueIncGST":"727588","billedExGST":"616600","collected":"727588","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Ace","company":"WOCOMPANY_013","id":"SDPLDEAL-116","nature":"","status":"Completed","sector":"Others","workType":"Topography Survey: RGB","startDate":"","endDate":"","poDate":"2025-03-05","valueExGST":"176347.6","valueIncGST":"208090.168","billedExGST":"176347.6","collected":"","receivable":"208090.168","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Shanks","company":"WOCOMPANY_012","id":"SDPLDEAL-117","nature":"","status":"Completed","sector":"Renewables","workType":"Thermography","startDate":"","endDate":"","poDate":"2025-03-31","valueExGST":"221636.87","valueIncGST":"261531.5066","billedExGST":"221636.87","collected":"","receivable":"261531.5066","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Bulbasaur","company":"WOCOMPANY_050","id":"SDPLDEAL-118","nature":"","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB","startDate":"","endDate":"","poDate":"2025-03-25","valueExGST":"308300","valueIncGST":"363794","billedExGST":"308300","collected":"","receivable":"363794","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Sesshomaru","company":"WOCOMPANY_017","id":"SDPLDEAL-119","nature":"","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"","endDate":"","poDate":"2024-12-03","valueExGST":"446418.4","valueIncGST":"526773.712","billedExGST":"446418.4","collected":"526773.712","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Mr. Krabs","company":"WOCOMPANY_031","id":"SDPLDEAL-120","nature":"","status":"Completed","sector":"Mining","workType":"Volumetric survey","startDate":"","endDate":"","poDate":"2025-01-21","valueExGST":"554940","valueIncGST":"654829.2","billedExGST":"554940","collected":"588236.4","receivable":"66592.8","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Pumbaa","company":"WOCOMPANY_047","id":"SDPLDEAL-121","nature":"Annual Rate Contract","status":"Ongoing","sector":"Renewables","workType":"Thermography","startDate":"2025-09-02","endDate":"2026-09-02","poDate":"2025-09-02","valueExGST":"5224698.44","valueIncGST":"6165144.159","billedExGST":"2330748","collected":"","receivable":"2750282.64","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"Partially Billed","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Stitch","company":"WOCOMPANY_044","id":"SDPLDEAL-122","nature":"","status":"Completed","sector":"Renewables","workType":"Flood Risk","startDate":"","endDate":"","poDate":"2025-04-01","valueExGST":"431620","valueIncGST":"509311.6","billedExGST":"431620","collected":"509311.6","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Sasuke","company":"WOCOMPANY_002","id":"SDPLDEAL-123","nature":"","status":"Completed","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"","endDate":"","poDate":"2024-12-25","valueExGST":"371193.2","valueIncGST":"438007.976","billedExGST":"371193.2","collected":"","receivable":"438007.976","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-124","nature":"","status":"","sector":"Renewables","workType":"Others","startDate":"","endDate":"","poDate":"2025-07-24","valueExGST":"24664","valueIncGST":"29103.52","billedExGST":"24664","collected":"","receivable":"29103.52","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-125","nature":"Proof of Concept","status":"Completed","sector":"Renewables","workType":"Others","startDate":"2025-09-11","endDate":"2025-10-26","poDate":"2025-09-08","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"","receivable":"327414.6","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Gohan","company":"WOCOMPANY_026","id":"SDPLDEAL-126","nature":"One time Project","status":"Completed","sector":"Construction","workType":"Topography Survey: RGB","startDate":"2025-08-01","endDate":"2025-09-05","poDate":"2025-09-10","valueExGST":"788298.436","valueIncGST":"930192.1545","billedExGST":"788298.436","collected":"914425.1992","receivable":"15766.95528","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Kaguya","company":"WOCOMPANY_014","id":"SDPLDEAL-127","nature":"One time Project","status":"Completed","sector":"Railways","workType":"Others","startDate":"2025-09-15","endDate":"2025-10-31","poDate":"2025-09-12","valueExGST":"5061052.8","valueIncGST":"5972042.304","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Bugs Bunny","company":"WOCOMPANY_028","id":"SDPLDEAL-128","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"Others","startDate":"2025-09-15","endDate":"2025-10-31","poDate":"2025-09-12","valueExGST":"8789158.711","valueIncGST":"10371207.28","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Armin","company":"WOCOMPANY_020","id":"SDPLDEAL-129","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-07-24","endDate":"2025-12-31","poDate":"2025-09-10","valueExGST":"218478.6448","valueIncGST":"257804.8009","billedExGST":"145653.4986","collected":"","receivable":"171871.1284","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Armin","company":"WOCOMPANY_020","id":"SDPLDEAL-130","nature":"Annual Rate Contract","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-07-24","endDate":"2025-12-31","poDate":"2025-09-11","valueExGST":"484453.9876","valueIncGST":"571655.7054","billedExGST":"322971.0351","collected":"","receivable":"381105.8214","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-131","nature":"One time Project","status":"Pause / struck","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-09-15","endDate":"2025-10-15","poDate":"2025-09-17","valueExGST":"1224740.248","valueIncGST":"1445193.493","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Stuck","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-132","nature":"One time Project","status":"Pause / struck","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-09-15","endDate":"2025-10-15","poDate":"2025-09-17","valueExGST":"1219634.8","valueIncGST":"1439169.064","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Stuck","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Gojo","company":"WOCOMPANY_005","id":"SDPLDEAL-134","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB, Mine survey","startDate":"2025-09-27","endDate":"2025-10-15","poDate":"2025-09-20","valueExGST":"192009.24","valueIncGST":"226570.9032","billedExGST":"58823.64","collected":"","receivable":"69411.8952","invoiceStatus":"Partially Billed","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Faye Valentine","company":"WOCOMPANY_010","id":"SDPLDEAL-133","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Solar Inspection","startDate":"2025-09-11","endDate":"2025-09-19","poDate":"2024-07-19","valueExGST":"57487090.49","valueIncGST":"67834766.78","billedExGST":"57487090.49","collected":"57487090.49","receivable":"10347676.29","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"BIlled","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-135","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Mine survey, Topography Survey: RGB","startDate":"2025-05-01","endDate":"2025-05-27","poDate":"2025-07-25","valueExGST":"89407","valueIncGST":"105500.26","billedExGST":"89407","collected":"104886.6197","receivable":"613.64032","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-136","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"Others","startDate":"2025-09-29","endDate":"2025-10-10","poDate":"2025-09-27","valueExGST":"143051.2","valueIncGST":"168800.416","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-137","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"Others","startDate":"2025-09-29","endDate":"2025-10-30","poDate":"2025-09-27","valueExGST":"143051.2","valueIncGST":"168800.416","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-138","nature":"One time Project","status":"Pause / struck","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-10-06","endDate":"2025-10-30","poDate":"2025-09-19","valueExGST":"261901.7132","valueIncGST":"309044.0216","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-139","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-09-20","endDate":"2025-10-20","poDate":"2025-10-03","valueExGST":"699730.012","valueIncGST":"825681.4142","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Trunks","company":"WOCOMPANY_015","id":"SDPLDEAL-140","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"LiDAR Survey: LiDAR","startDate":"2025-09-29","endDate":"2025-10-31","poDate":"2025-10-08","valueExGST":"3237150","valueIncGST":"3819837","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-141","nature":"One time Project","status":"Not Started","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-09-30","endDate":"2025-10-30","poDate":"2025-10-09","valueExGST":"383192.236","valueIncGST":"452166.8385","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Inuyasha","company":"WOCOMPANY_016","id":"SDPLDEAL-142","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology, Flood Risk","startDate":"2025-10-17","endDate":"2025-11-10","poDate":"2025-10-14","valueExGST":"419288","valueIncGST":"494759.84","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Stuck","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Patrick Star","company":"WOCOMPANY_030","id":"SDPLDEAL-143","nature":"One time Project","status":"Completed","sector":"Others","workType":"Hydrology","startDate":"2025-10-08","endDate":"2025-10-16","poDate":"2025-10-16","valueExGST":"246640","valueIncGST":"291035.2","billedExGST":"246640","collected":"","receivable":"291035.2","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Kaguya","company":"WOCOMPANY_014","id":"SDPLDEAL-144","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"Road/rail survey, LiDAR Survey: LiDAR","startDate":"2025-11-03","endDate":"2025-12-01","poDate":"2025-10-27","valueExGST":"4628199.6","valueIncGST":"5461275.528","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-145","nature":"One time Project","status":"Not Started","sector":"Mining","workType":"Raw images/videography","startDate":"2025-10-27","endDate":"2025-11-03","poDate":"2025-10-27","valueExGST":"64373.04","valueIncGST":"75960.1872","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-146","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"LiDAR Survey: LiDAR, Mine survey","startDate":"2025-10-27","endDate":"2025-11-03","poDate":"2025-10-27","valueExGST":"679308.22","valueIncGST":"801583.6996","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Katara","company":"WOCOMPANY_037","id":"SDPLDEAL-147","nature":"One time Project","status":"Partial Completed","sector":"Railways","workType":"LiDAR Survey: LiDAR, Road/rail survey, Others","startDate":"2025-11-03","endDate":"2025-11-11","poDate":"2025-10-28","valueExGST":"1850391.936","valueIncGST":"2183462.484","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Stuck","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sakura","company":"WOCOMPANY_002","id":"SDPLDEAL-149","nature":"Monthly Contract","status":"Ongoing","sector":"Renewables","workType":"Others","startDate":"2025-11-01","endDate":"2026-04-01","poDate":"2025-10-30","valueExGST":"6011850","valueIncGST":"7093983","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Dolphin","company":"WOCOMPANY_029","id":"SDPLDEAL-150","nature":"One time Project","status":"Ongoing","sector":"Powerline","workType":"LiDAR Survey: LiDAR","startDate":"2025-08-20","endDate":"2025-12-16","poDate":"2025-08-12","valueExGST":"5026523.2","valueIncGST":"5931297.376","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_002","expectedBillingMonth":""},{"name":"Yuji Itadori","company":"WOCOMPANY_006","id":"SDPLDEAL-151","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-11-10","endDate":"2025-12-01","poDate":"2025-11-06","valueExGST":"339130","valueIncGST":"400173.4","billedExGST":"339130","collected":"400173.4","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-152","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-11-07","endDate":"2025-11-28","poDate":"2025-11-04","valueExGST":"295968","valueIncGST":"349242.24","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Megumi","company":"WOCOMPANY_007","id":"SDPLDEAL-153","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Others","startDate":"2025-04-01","endDate":"2025-04-10","poDate":"2025-04-01","valueExGST":"365779.452","valueIncGST":"431619.7534","billedExGST":"365779.452","collected":"431620","receivable":"-0.24664","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Donkey","company":"WOCOMPANY_040","id":"SDPLDEAL-154","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"LiDAR Survey: LiDAR, Road/rail survey, Raw images/videography","startDate":"2025-11-13","endDate":"2025-12-31","poDate":"2025-11-10","valueExGST":"1346654.4","valueIncGST":"1589052.192","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Donkey","company":"WOCOMPANY_040","id":"SDPLDEAL-155","nature":"One time Project","status":"Ongoing","sector":"Railways","workType":"LiDAR Survey: LiDAR, Road/rail survey","startDate":"2025-11-13","endDate":"2026-01-31","poDate":"2025-11-12","valueExGST":"9089917.2","valueIncGST":"10726102.3","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Golden fish","company":"WOCOMPANY_027","id":"SDPLDEAL-156","nature":"Proof of Concept","status":"Not Started","sector":"Mining","workType":"LiDAR Survey: LiDAR, Volumetric survey","startDate":"2025-12-01","endDate":"2025-12-31","poDate":"2025-10-16","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"Not Billable","owner":"OWNER_006","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-157","nature":"One time Project","status":"","sector":"Renewables","workType":"Others","startDate":"2025-11-14","endDate":"2025-11-14","poDate":"2025-11-14","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"321865.2","receivable":"5549.4","invoiceStatus":"Partially Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_005","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-158","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-10-16","endDate":"2025-10-31","poDate":"2025-10-23","valueExGST":"477248.4","valueIncGST":"563153.112","billedExGST":"477248.4","collected":"515428.272","receivable":"47724.84","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-159","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Others","startDate":"2025-11-03","endDate":"2025-12-20","poDate":"2025-11-08","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"","receivable":"327414.6","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-160","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Powerline Inspection, Videography for construction monitoring, Others","startDate":"2025-11-03","endDate":"2025-12-20","poDate":"2025-11-08","valueExGST":"277470","valueIncGST":"327414.6","billedExGST":"277470","collected":"","receivable":"327414.6","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-161","nature":"One time Project","status":"Completed","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-11-20","endDate":"2025-11-30","poDate":"2025-11-21","valueExGST":"304452.416","valueIncGST":"359253.8509","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Whis","company":"WOCOMPANY_025","id":"SDPLDEAL-162","nature":"One time Project","status":"Partial Completed","sector":"Railways","workType":"LiDAR Survey: LiDAR","startDate":"2025-12-01","endDate":"2025-12-31","poDate":"2025-12-01","valueExGST":"924900","valueIncGST":"1091382","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Rengoku","company":"WOCOMPANY_002","id":"SDPLDEAL-163","nature":"One time Project","status":"Not Started","sector":"Mining","workType":"Topography Survey: RGB, LiDAR Survey: LiDAR","startDate":"2025-12-01","endDate":"2025-12-31","poDate":"2025-12-01","valueExGST":"141818","valueIncGST":"167345.24","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-164","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB","startDate":"2025-11-27","endDate":"2025-12-23","poDate":"2025-11-27","valueExGST":"511777.963","valueIncGST":"603897.9963","billedExGST":"511778.0123","collected":"552719.0068","receivable":"51179.04775","invoiceStatus":"Fully Billed","woStatus":"Closed","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-165","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-11-25","endDate":"2025-12-25","poDate":"2025-11-28","valueExGST":"709081.3676","valueIncGST":"836716.0138","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-166","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-11-13","endDate":"2025-12-03","poDate":"2025-11-28","valueExGST":"487112.7668","valueIncGST":"574793.0648","billedExGST":"487116.0224","collected":"","receivable":"574796.9065","invoiceStatus":"Fully Billed","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Obito","company":"WOCOMPANY_023","id":"SDPLDEAL-167","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Mine survey","startDate":"2025-12-11","endDate":"2025-12-31","poDate":"2025-12-05","valueExGST":"1.2332","valueIncGST":"1.455176","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Stewie Griffin","company":"WOCOMPANY_029","id":"SDPLDEAL-168","nature":"One time Project","status":"Ongoing","sector":"Powerline","workType":"Thermography","startDate":"2025-12-22","endDate":"2026-01-16","poDate":"2025-12-17","valueExGST":"608584.2","valueIncGST":"718129.356","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_002","expectedBillingMonth":""},{"name":"Scooby-Doo","company":"WOCOMPANY_002","id":"SDPLDEAL-169","nature":"One time Project","status":"Not Started","sector":"Mining","workType":"LiDAR Survey: LiDAR","startDate":"2025-12-13","endDate":"2026-01-31","poDate":"2025-12-13","valueExGST":"680726.4","valueIncGST":"803257.152","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Sesshomaru","company":"WOCOMPANY_017","id":"SDPLDEAL-170","nature":"One time Project","status":"Completed","sector":"Renewables","workType":"Hydrology","startDate":"2025-12-16","endDate":"2026-01-31","poDate":"2025-12-20","valueExGST":"308300","valueIncGST":"363794","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"Update Required","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Erwin","company":"WOCOMPANY_021","id":"SDPLDEAL-171","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"Topography Survey: RGB, Raw images/videography","startDate":"2025-12-22","endDate":"2025-12-31","poDate":"2025-12-17","valueExGST":"425454","valueIncGST":"502035.72","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-172","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-12-20","endDate":"2025-12-31","poDate":"2025-12-12","valueExGST":"53644.2","valueIncGST":"63300.156","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Alias_160","company":"WOCOMPANY_051","id":"SDPLDEAL-173","nature":"One time Project","status":"Completed","sector":"Mining","workType":"Topography Survey: RGB","startDate":"2025-12-20","endDate":"2025-12-31","poDate":"2025-12-12","valueExGST":"51852.3604","valueIncGST":"61185.78527","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Octopus","company":"WOCOMPANY_002","id":"SDPLDEAL-174","nature":"One time Project","status":"Ongoing","sector":"Mining","workType":"Others","startDate":"2025-12-20","endDate":"2026-01-31","poDate":"2025-12-20","valueExGST":"43162","valueIncGST":"50931.16","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-175","nature":"One time Project","status":"Ongoing","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-12-25","endDate":"2026-01-15","poDate":"2025-12-22","valueExGST":"289802","valueIncGST":"341966.36","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-176","nature":"One time Project","status":"Ongoing","sector":"Renewables","workType":"Hydrology, Topography Survey: RGB","startDate":"2025-12-25","endDate":"2026-01-15","poDate":"2025-12-22","valueExGST":"289802","valueIncGST":"341966.36","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Alphonse","company":"WOCOMPANY_009","id":"SDPLDEAL-177","nature":"Monthly Contract","status":"Not Started","sector":"Renewables","workType":"Surveillance- needs continues monitoring","startDate":"2025-11-01","endDate":"2026-03-31","poDate":"2025-12-16","valueExGST":"462450","valueIncGST":"545691","billedExGST":"184980","collected":"213910.872","receivable":"4365.528","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_005","expectedBillingMonth":""},{"name":"Whale","company":"WOCOMPANY_004","id":"SDPLDEAL-178","nature":"Proof of Concept","status":"Completed","sector":"Powerline","workType":"Thermography, LiDAR Survey: LiDAR, Powerline Inspection","startDate":"","endDate":"","poDate":"","valueExGST":"0","valueIncGST":"0","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_002","expectedBillingMonth":""},{"name":"Squirtle","company":"WOCOMPANY_049","id":"SDPLDEAL-179","nature":"Proof of Concept","status":"Ongoing","sector":"Powerline","workType":"Powerline Inspection","startDate":"2025-12-24","endDate":"2025-12-31","poDate":"2025-12-24","valueExGST":"55494","valueIncGST":"65482.92","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_002","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-180","nature":"One time Project","status":"Ongoing","sector":"Renewables","workType":"Topography Survey: RGB, Hydrology","startDate":"2025-12-31","endDate":"2026-01-31","poDate":"2025-12-29","valueExGST":"295968","valueIncGST":"349242.24","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Turtle","company":"WOCOMPANY_024","id":"SDPLDEAL-181","nature":"Proof of Concept","status":"Details pending from Client","sector":"Mining","workType":"Mine survey","startDate":"2026-01-12","endDate":"2026-02-12","poDate":"2026-01-01","valueExGST":"184980","valueIncGST":"218276.4","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"Open","collectionStatus":"","billingStatus":"","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Bugs Bunny","company":"WOCOMPANY_028","id":"SDPLDEAL-182","nature":"One time Project","status":"Not Started","sector":"Railways","workType":"LiDAR Survey: LiDAR","startDate":"2026-01-09","endDate":"2026-03-31","poDate":"2026-01-12","valueExGST":"8986062.029","valueIncGST":"10603553.19","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Bulbasaur","company":"WOCOMPANY_050","id":"SDPLDEAL-185","nature":"One time Project","status":"Not Started","sector":"Others","workType":"Others","startDate":"2026-01-12","endDate":"2026-01-16","poDate":"2026-01-09","valueExGST":"139072.8968","valueIncGST":"164106.0182","billedExGST":"164106.0182","collected":"69560.56979","receivable":"124084.5317","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_004","expectedBillingMonth":""},{"name":"Timon","company":"WOCOMPANY_046","id":"SDPLDEAL-186","nature":"One time Project","status":"Ongoing","sector":"Renewables","workType":"Others","startDate":"2026-01-13","endDate":"2026-01-30","poDate":"2026-01-06","valueExGST":"209027.4","valueIncGST":"246652.332","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"Not billed yet","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_001","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-187","nature":"One time Project","status":"Not Started","sector":"Renewables","workType":"Others","startDate":"2026-01-19","endDate":"2026-06-30","poDate":"2026-01-09","valueExGST":"610434","valueIncGST":"720312.12","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""},{"name":"Ben Tennyson","company":"WOCOMPANY_033","id":"SDPLDEAL-188","nature":"One time Project","status":"Not Started","sector":"Renewables","workType":"Others","startDate":"2026-01-19","endDate":"2026-02-28","poDate":"2026-01-09","valueExGST":"215810","valueIncGST":"254655.8","billedExGST":"","collected":"","receivable":"0","invoiceStatus":"","woStatus":"","collectionStatus":"","billingStatus":"","owner":"OWNER_003","expectedBillingMonth":""}],"deals":[{"name":"Naruto","owner":"OWNER_001","client":"COMPANY089","status":"Open","closeDate":"","probability":"High","value":"489360","tentativeClose":"2026-02-26","stage":"B. Sales Qualified Leads","product":"Service + Spectra","sector":"Mining","createdDate":"2025-12-26"},{"name":"Sasuke","owner":"OWNER_001","client":"COMPANY091","status":"Open","closeDate":"","probability":"","value":"17616960","tentativeClose":"2026-02-28","stage":"B. Sales Qualified Leads","product":"","sector":"Mining","createdDate":"2025-09-15"},{"name":"Sasuke","owner":"OWNER_002","client":"COMPANY124","status":"Open","closeDate":"","probability":"Medium","value":"611700","tentativeClose":"2026-02-26","stage":"E. Proposal/Commercials Sent","product":"","sector":"Powerline","createdDate":"2025-11-12"},{"name":"Sakura","owner":"OWNER_002","client":"COMPANY046","status":"Open","closeDate":"","probability":"Low","value":"2348928","tentativeClose":"2026-03-20","stage":"E. Proposal/Commercials Sent","product":"","sector":"Powerline","createdDate":"2025-10-14"},{"name":"Sakura","owner":"OWNER_002","client":"COMPANY148","status":"Open","closeDate":"","probability":"High","value":"428190","tentativeClose":"2026-02-26","stage":"E. Proposal/Commercials Sent","product":"","sector":"Powerline","createdDate":"2025-10-10"},{"name":"Sakura","owner":"OWNER_002","client":"COMPANY047","status":"Open","closeDate":"","probability":"Medium","value":"2936160","tentativeClose":"2026-02-12","stage":"E. Proposal/Commercials Sent","product":"","sector":"Powerline","createdDate":"2025-07-07"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY197","status":"Open","closeDate":"","probability":"Low","value":"305850000","tentativeClose":"2024-09-30","stage":"D. Feasibility","product":"Pure Service","sector":"Tender","createdDate":"2024-08-30"},{"name":"Sakura","owner":"OWNER_001","client":"COMPANY177","status":"On Hold","closeDate":"","probability":"Medium","value":"","tentativeClose":"2025-06-11","stage":"M. Projects On Hold","product":"","sector":"Powerline","createdDate":"2024-11-17"},{"name":"Sakura","owner":"OWNER_001","client":"COMPANY094","status":"Open","closeDate":"","probability":"Medium","value":"","tentativeClose":"2025-06-12","stage":"M. Projects On Hold","product":"","sector":"Renewables","createdDate":"2024-11-17"},{"name":"Sakura","owner":"OWNER_001","client":"COMPANY178","status":"On Hold","closeDate":"","probability":"Medium","value":"","tentativeClose":"2025-06-23","stage":"M. Projects On Hold","product":"","sector":"Renewables","createdDate":"2024-08-09"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY149","status":"Open","closeDate":"","probability":"High","value":"4281900","tentativeClose":"2026-01-31","stage":"H. Work Order Received","product":"Spectra + DMO","sector":"DSP","createdDate":"2025-11-19"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY149","status":"Open","closeDate":"","probability":"Low","value":"6117000","tentativeClose":"2026-03-25","stage":"F. Negotiations","product":"Hardware","sector":"DSP","createdDate":"2025-11-19"},{"name":"Sakura","owner":"OWNER_002","client":"COMPANY171","status":"Open","closeDate":"","probability":"Low","value":"1835100","tentativeClose":"2026-02-20","stage":"E. Proposal/Commercials Sent","product":"","sector":"Renewables","createdDate":"2025-05-21"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY111","status":"Open","closeDate":"","probability":"Medium","value":"7832265.523","tentativeClose":"2026-01-31","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Railways","createdDate":"2025-09-15"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY111","status":"Open","closeDate":"","probability":"Medium","value":"7832265.523","tentativeClose":"2026-02-28","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Railways","createdDate":"2026-01-08"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY111","status":"Open","closeDate":"","probability":"Medium","value":"7832265.523","tentativeClose":"2026-03-31","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Railways","createdDate":"2026-01-08"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY149","status":"Open","closeDate":"","probability":"High","value":"12234000","tentativeClose":"2026-02-14","stage":"E. Proposal/Commercials Sent","product":"Dock + DMO + Spectra + Service","sector":"DSP","createdDate":""},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY129","status":"Open","closeDate":"","probability":"High","value":"1835100","tentativeClose":"2026-01-08","stage":"F. Negotiations","product":"Service + Spectra","sector":"Mining","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY129","status":"Open","closeDate":"","probability":"Medium","value":"1101060","tentativeClose":"2026-01-15","stage":"E. Proposal/Commercials Sent","product":"Dock + Spectra + Service","sector":"Mining","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY107","status":"Open","closeDate":"","probability":"Medium","value":"3670200","tentativeClose":"2026-01-15","stage":"E. Proposal/Commercials Sent","product":"Dock + DMO + Spectra + Service","sector":"DSP","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY103","status":"Open","closeDate":"","probability":"Low","value":"5505300","tentativeClose":"2026-02-13","stage":"E. Proposal/Commercials Sent","product":"Dock + DMO + Spectra + Service","sector":"DSP","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY077","status":"Open","closeDate":"","probability":"Low","value":"367020","tentativeClose":"2025-12-15","stage":"C. Demo Done","product":"Pure Service","sector":"DSP","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY026","status":"Open","closeDate":"","probability":"High","value":"122340","tentativeClose":"2026-03-10","stage":"E. Proposal/Commercials Sent","product":"Dock + DMO + Spectra","sector":"Construction","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_004","client":"COMPANY193","status":"Open","closeDate":"","probability":"High","value":"122340","tentativeClose":"2026-01-31","stage":"F. Negotiations","product":"Service + Spectra","sector":"Mining","createdDate":"2025-11-14"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY111","status":"Open","closeDate":"","probability":"Medium","value":"5235907.32","tentativeClose":"2026-01-15","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Railways","createdDate":"2025-11-17"},{"name":"Sakura","owner":"OWNER_001","client":"COMPANY169","status":"Open","closeDate":"","probability":"High","value":"14680800","tentativeClose":"2026-01-31","stage":"D. Feasibility","product":"Service + Spectra","sector":"Renewables","createdDate":"2025-11-17"},{"name":"Sakura","owner":"OWNER_001","client":"COMPANY183","status":"Open","closeDate":"","probability":"High","value":"89308.2","tentativeClose":"2025-11-19","stage":"F. Negotiations","product":"Pure Service","sector":"Mining","createdDate":"2025-11-17"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY009","status":"Open","closeDate":"","probability":"Low","value":"2446800","tentativeClose":"2026-02-15","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Renewables","createdDate":"2025-11-18"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY052","status":"Open","closeDate":"","probability":"Medium","value":"1223400","tentativeClose":"2026-02-28","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Sakura","owner":"OWNER_003","client":"COMPANY108","status":"Open","closeDate":"","probability":"Medium","value":"1223400","tentativeClose":"2026-02-28","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Kakashi","owner":"OWNER_003","client":"COMPANY021","status":"Open","closeDate":"","probability":"Low","value":"1223400","tentativeClose":"2026-02-28","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Goku","owner":"OWNER_003","client":"COMPANY067","status":"Open","closeDate":"","probability":"Medium","value":"2018605.106","tentativeClose":"2026-01-31","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Goku","owner":"OWNER_003","client":"COMPANY043","status":"Open","closeDate":"","probability":"Low","value":"1223400","tentativeClose":"2026-02-28","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Mining","createdDate":"2025-11-18"},{"name":"Luffy","owner":"OWNER_003","client":"COMPANY093","status":"Open","closeDate":"","probability":"High","value":"122340000","tentativeClose":"2026-02-28","stage":"F. Negotiations","product":"Service + Spectra","sector":"Tender","createdDate":"2025-11-18"},{"name":"Zoro","owner":"OWNER_003","client":"COMPANY067","status":"Open","closeDate":"","probability":"Medium","value":"3058500","tentativeClose":"2026-01-15","stage":"B. Sales Qualified Leads","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Nami","owner":"OWNER_004","client":"COMPANY110","status":"Open","closeDate":"","probability":"Low","value":"91755000","tentativeClose":"2026-01-15","stage":"E. Proposal/Commercials Sent","product":"Service + Spectra","sector":"Tender","createdDate":"2025-11-19"},{"name":"Sanji","owner":"OWNER_003","client":"COMPANY048","status":"Open","closeDate":"","probability":"Medium","value":"7340400","tentativeClose":"2026-02-15","stage":"F. Negotiations","product":"Dock + DMO","sector":"Security and Surveillance","createdDate":"2025-11-19"},{"name":"Sanji","owner":"OWNER_002","client":"COMPANY124","status":"Open","closeDate":"","probability":"Medium","value":"12019562.45","tentativeClose":"2026-01-30","stage":"E. Proposal/Commercials Sent","product":"","sector":"Tender","createdDate":"2025-11-20"},{"name":"Rukia","owner":"OWNER_001","client":"COMPANY087","status":"Open","closeDate":"","probability":"High","value":"3058500","tentativeClose":"2026-04-01","stage":"C. Demo Done","product":"Service + Spectra","sector":"Renewables","createdDate":"2025-11-26"},{"name":"Rukia","owner":"OWNER_001","client":"COMPANY095","status":"Open","closeDate":"","probability":"High","value":"1835100","tentativeClose":"2026-02-10","stage":"C. Demo Done","product":"Service + Spectra","sector":"Renewables","createdDate":"2025-11-26"},{"name":"Light Yagami","owner":"OWNER_003","client":"COMPANY007","status":"Open","closeDate":"","probability":"Medium","value":"6117000","tentativeClose":"2026-03-31","stage":"E. Proposal/Commercials Sent","product":"Spectra Deal","sector":"Mining","createdDate":"2025-12-01"},{"name":"Light Yagami","owner":"OWNER_003","client":"COMPANY067","status":"Open","closeDate":"","probability":"Medium","value":"7340400","tentativeClose":"2026-02-28","stage":"F. Negotiations","product":"Pure Service","sector":"Railways","createdDate":"2025-12-08"},{"name":"Eren Yeager","owner":"OWNER_003","client":"COMPANY068","status":"Open","closeDate":"","probability":"Medium","value":"5872320","tentativeClose":"2026-01-31","stage":"F. Negotiations","product":"Pure Service","sector":"Railways","createdDate":"2025-12-08"},{"name":"Mikasa","owner":"OWNER_001","client":"COMPANY050","status":"Open","closeDate":"","probability":"Low","value":"611696.3298","tentativeClose":"2025-12-15","stage":"F. Negotiations","product":"Pure Service","sector":"Renewables","createdDate":"2025-12-08"},{"name":"Levi","owner":"OWNER_003","client":"COMPANY051","status":"Open","closeDate":"","probability":"High","value":"841699.2","tentativeClose":"2026-01-15","stage":"F. Negotiations","product":"Pure Service","sector":"Railways","createdDate":"2025-12-08"},{"name":"Tanjiro","owner":"OWNER_003","client":"COMPANY161","status":"Open","closeDate":"","probability":"High","value":"489360","tentativeClose":"2026-01-31","stage":"F. Negotiations","product":"Pure Service","sector":"Railways","createdDate":"2026-01-08"},{"name":"Tanjiro","owner":"OWNER_003","client":"COMPANY186","status":"Open","closeDate":"","probability":"High","value":"489360","tentativeClose":"2026-01-31","stage":"E. Proposal/Commercials Sent","product":"Pure Service","sector":"Mining","createdDate":"2026-01-08"},{"name":"Tanjiro","owner":"OWNER_001","client":"COMPANY038","status":"","closeDate":"","probability":"","value":"","tentativeClose":"","stage":"A. Lead Generated","product":"","sector":"","createdDate":"2026-01-08"},{"name":"Tanjiro","owner":"OWNER_001","client":"COMPANY039","status":"Open","closeDate":"","probability":"High","value":"2079780","tentativeClose":"2026-01-13","stage":"A. Lead Generated","product":"","sector":"","createdDate":"2026-01-08"},{"name":"Tanjiro","owner":"OWNER_001","client":"COMPANY136","status":"Open","closeDate":"","probability":"High","value":"1468080","tentativeClose":"2026-01-31","stage":"A. Lead Generated","product":"","sector":"","createdDate":"2026-01-08"},{"name":"Zenitsu","owner":"OWNER_003","client":"COMPANY190","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2024-10-31","stage":"N. Not relevant at the moment","product":"Pure Service","sector":"Others","createdDate":"2024-09-12"},{"name":"Inosuke","owner":"OWNER_003","client":"COMPANY186","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2024-10-31","stage":"N. Not relevant at the moment","product":"Pure Service","sector":"Others","createdDate":"2024-09-12"},{"name":"Gojo","owner":"OWNER_005","client":"COMPANY101","status":"Dead","closeDate":"","probability":"","value":"13457400","tentativeClose":"2025-06-30","stage":"E. Proposal/Commercials Sent","product":"","sector":"Railways","createdDate":"2025-06-01"},{"name":"Yuji Itadori","owner":"","client":"COMPANY172","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-06-19","stage":"L. Project Lost","product":"","sector":"Mining","createdDate":"2024-08-09"},{"name":"Yuji Itadori","owner":"","client":"COMPANY172","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-06-19","stage":"L. Project Lost","product":"","sector":"Mining","createdDate":"2024-08-16"},{"name":"Yuji Itadori","owner":"OWNER_006","client":"COMPANY118","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-05-31","stage":"L. Project Lost","product":"","sector":"Construction","createdDate":"2025-04-25"},{"name":"Megumi","owner":"OWNER_002","client":"COMPANY070","status":"Dead","closeDate":"","probability":"","value":"97872","tentativeClose":"2025-05-31","stage":"N. Not relevant at the moment","product":"","sector":"Powerline","createdDate":"2025-04-25"},{"name":"Nobara","owner":"OWNER_006","client":"COMPANY146","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-06-23","stage":"L. Project Lost","product":"","sector":"Renewables","createdDate":"2025-04-30"},{"name":"Saitama","owner":"OWNER_006","client":"COMPANY014","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-05-31","stage":"C. Demo Done","product":"","sector":"Powerline","createdDate":"2025-04-30"},{"name":"Genos","owner":"OWNER_002","client":"COMPANY168","status":"Dead","closeDate":"","probability":"","value":"53217.9","tentativeClose":"2025-06-30","stage":"N. Not relevant at the moment","product":"","sector":"Powerline","createdDate":"2025-05-05"},{"name":"Edward Elric","owner":"OWNER_002","client":"COMPANY179","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2025-06-23","stage":"L. Project Lost","product":"","sector":"Powerline","createdDate":"2025-05-05"},{"name":"Alphonse","owner":"OWNER_007","client":"COMPANY078","status":"Dead","closeDate":"","probability":"","value":"","tentativeClose":"2024-09-30","stage":"C. Demo Done","product":"","sector":"Railways","createdDate":"2024-08-16"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY058","status":"Dead","closeDate":"","probability":"","value":"244680","tentativeClose":"2025-01-14","stage":"L. Project Lost","product":"Pure Service","sector":"Renewables","createdDate":"2024-08-19"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY143","status":"Dead","closeDate":"","probability":"","value":"611700","tentativeClose":"2025-01-14","stage":"L. Project Lost","product":"Pure Service","sector":"Renewables","createdDate":"2024-08-19"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY071","status":"Dead","closeDate":"","probability":"","value":"489360","tentativeClose":"2025-01-14","stage":"L. Project Lost","product":"Pure Service","sector":"Renewables","createdDate":"2024-08-19"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY063","status":"Dead","closeDate":"","probability":"","value":"256914000","tentativeClose":"2025-05-13","stage":"M. Projects On Hold","product":"Pure Service","sector":"Mining","createdDate":"2024-08-19"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY045","status":"Dead","closeDate":"","probability":"","value":"6117000","tentativeClose":"2025-05-13","stage":"M. Projects On Hold","product":"Pure Service","sector":"Others","createdDate":"2024-08-21"},{"name":"Alphonse","owner":"OWNER_003","client":"COMPANY071","status":"Dead","closeDate":"","probability":"","value":"489360","tentativeClose":"2025-01-14","stage":"L. Project Lost","product":"Pure Service","sector":"Renewables","createdDate":"2024-09-20"},{"name":"Bulma","owner":"OWNER_003","client":"COMPANY072","status":"Dead","closeDate":"","probability":"","value":"4037220","tentativeClose":"2025-07-04","stage":"L. Project Lost","product":"Pure Service","sector":"Mining","createdDate":"2025-01-14"},{"name":"Krillin","owner":"OWNER_001","client":"COMPANY147","status":"Open","closeDate":"","probability":"","value":"1101060","tentativeClose":"2025-10-31","stage":"D. Feasibility","product":"","sector":"Renewables","createdDate":"2025-09-15"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY111","status":"Dead","closeDate":"","probability":"Medium","value":"9200237.148","tentativeClose":"2025-10-31","stage":"L. Project Lost","product":"Pure Service","sector":"Railways","createdDate":"2025-09-15"},{"name":"Donald Duck","owner":"OWNER_003","client":"COMPANY035","status":"Dead","closeDate":"","probability":"Low","value":"1223400","tentativeClose":"2025-11-24","stage":"L. Project Lost","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Bugs Bunny","owner":"OWNER_003","client":"COMPANY126","status":"Won","closeDate":"","probability":"","value":"","tentativeClose":"","stage":"A. Lead Generated","product":"","sector":"Powerline","createdDate":"2025-11-27"},{"name":"Bugs Bunny","owner":"OWNER_003","client":"COMPANY036","status":"Won","closeDate":"","probability":"","value":"","tentativeClose":"","stage":"A. Lead Generated","product":"","sector":"Renewables","createdDate":"2025-11-27"},{"name":"Katara","owner":"OWNER_001","client":"COMPANY038","status":"Won","closeDate":"","probability":"","value":"","tentativeClose":"","stage":"H. Work Order Received","product":"","sector":"Renewables","createdDate":"2025-08-13"},{"name":"Ochaco","owner":"OWNER_002","client":"COMPANY148","status":"Won","closeDate":"2025-07-31","probability":"High","value":"152925","tentativeClose":"2025-07-31","stage":"H. Work Order Received","product":"","sector":"Powerline","createdDate":"2025-06-10"},{"name":"Zuko","owner":"OWNER_003","client":"COMPANY033","status":"Won","closeDate":"","probability":"","value":"134574","tentativeClose":"2025-05-27","stage":"H. Work Order Received","product":"Pure Service","sector":"Renewables","createdDate":"2025-05-06"},{"name":"Appa","owner":"OWNER_003","client":"COMPANY163","status":"Won","closeDate":"","probability":"","value":"1079650.5","tentativeClose":"2024-11-17","stage":"H. Work Order Received","product":"Pure Service","sector":"Renewables","createdDate":"2024-08-30"},{"name":"Timon","owner":"OWNER_002","client":"COMPANY125","status":"Won","closeDate":"2025-08-29","probability":"High","value":"4986578.4","tentativeClose":"2025-08-29","stage":"H. Work Order Received","product":"Service + Spectra","sector":"Powerline","createdDate":"2025-05-13"},{"name":"Tuxedo Mask","owner":"OWNER_003","client":"COMPANY131","status":"Won","closeDate":"","probability":"","value":"1205049","tentativeClose":"2025-05-13","stage":"H. Work Order Received","product":"Pure Service","sector":"Powerline","createdDate":"2024-08-09"},{"name":"Bulbasaur","owner":"OWNER_003","client":"COMPANY007","status":"Won","closeDate":"","probability":"","value":"2424950.076","tentativeClose":"2025-09-15","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2025-07-28"},{"name":"Bulbasaur","owner":"OWNER_003","client":"COMPANY011","status":"Won","closeDate":"","probability":"","value":"14277078","tentativeClose":"2025-08-31","stage":"H. Work Order Received","product":"Pure Service","sector":"Railways","createdDate":"2025-07-28"},{"name":"Bulbasaur","owner":"OWNER_003","client":"COMPANY061","status":"Won","closeDate":"","probability":"","value":"5020833.6","tentativeClose":"2025-09-15","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-07-28"},{"name":"Alias_160","owner":"OWNER_003","client":"COMPANY062","status":"Won","closeDate":"","probability":"","value":"14552343","tentativeClose":"2025-08-31","stage":"H. Work Order Received","product":"Pure Service","sector":"Railways","createdDate":"2025-07-28"},{"name":"Alias_160","owner":"OWNER_003","client":"COMPANY111","status":"Won","closeDate":"","probability":"","value":"8719220.736","tentativeClose":"2025-10-31","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-09-15"},{"name":"Alias_160","owner":"OWNER_003","client":"COMPANY007","status":"Won","closeDate":"","probability":"","value":"1368079.284","tentativeClose":"2025-10-31","stage":"G. Project Won","product":"Pure Service","sector":"Mining","createdDate":"2025-09-15"},{"name":"Alias_160","owner":"OWNER_002","client":"COMPANY180","status":"Won","closeDate":"2025-12-31","probability":"High","value":"54900.6867","tentativeClose":"2025-12-31","stage":"H. Work Order Received","product":"Spectra Deal","sector":"Powerline","createdDate":"2025-10-14"},{"name":"Alias_160","owner":"OWNER_001","client":"COMPANY105","status":"Won","closeDate":"2025-11-21","probability":"High","value":"428190","tentativeClose":"2025-11-21","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2025-11-17"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY007","status":"Won","closeDate":"","probability":"","value":"305850","tentativeClose":"2025-11-30","stage":"G. Project Won","product":"Pure Service","sector":"Mining","createdDate":"2025-11-18"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY096","status":"Won","closeDate":"","probability":"High","value":"140691","tentativeClose":"2025-12-31","stage":"G. Project Won","product":"Pure Service","sector":"Mining","createdDate":"2025-11-18"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY104","status":"Won","closeDate":"","probability":"High","value":"1223400","tentativeClose":"2025-11-22","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"},{"name":"Alias_162","owner":"OWNER_001","client":"COMPANY038","status":"Won","closeDate":"2025-11-28","probability":"High","value":"483241.7766","tentativeClose":"2024-12-20","stage":"G. Project Won","product":"","sector":"Renewables","createdDate":"2024-12-12"},{"name":"Alias_162","owner":"OWNER_002","client":"COMPANY124","status":"Won","closeDate":"2025-12-31","probability":"High","value":"611700","tentativeClose":"2025-12-31","stage":"H. Work Order Received","product":"","sector":"Powerline","createdDate":"2025-06-23"},{"name":"Alias_162","owner":"OWNER_001","client":"COMPANY086","status":"Won","closeDate":"2025-12-17","probability":"High","value":"422073","tentativeClose":"2025-12-12","stage":"G. Project Won","product":"Pure Service","sector":"Mining","createdDate":"2025-12-08"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY111","status":"Won","closeDate":"2026-01-12","probability":"High","value":"4787115.264","tentativeClose":"2025-12-31","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-11-17"},{"name":"Alias_162","owner":"OWNER_003","client":"COMPANY111","status":"Won","closeDate":"2026-01-12","probability":"High","value":"4127536.282","tentativeClose":"2025-12-16","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-11-27"},{"name":"Vegeta","owner":"OWNER_001","client":"COMPANY182","status":"Won","closeDate":"2025-12-12","probability":"High","value":"53217.9","tentativeClose":"2025-12-16","stage":"G. Project Won","product":"","sector":"","createdDate":"2026-01-08"},{"name":"Alias_170","owner":"OWNER_001","client":"COMPANY040","status":"Won","closeDate":"2025-11-28","probability":"High","value":"550530","tentativeClose":"2025-11-28","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2025-11-26"},{"name":"Alias_171","owner":"OWNER_001","client":"COMPANY041","status":"Won","closeDate":"2025-11-28","probability":"High","value":"473455.8","tentativeClose":"2025-11-28","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2025-11-26"},{"name":"Alias_172","owner":"OWNER_004","client":"COMPANY181","status":"Won","closeDate":"2026-01-08","probability":"High","value":"159042","tentativeClose":"2025-12-02","stage":"F. Negotiations","product":"Pure Service","sector":"DSP","createdDate":"2025-11-26"},{"name":"Alias_173","owner":"OWNER_001","client":"COMPANY170","status":"Won","closeDate":"2026-01-01","probability":"High","value":"207366.3","tentativeClose":"2026-01-31","stage":"G. Project Won","product":"","sector":"Renewables","createdDate":"2026-01-09"},{"name":"Alias_174","owner":"OWNER_003","client":"COMPANY132","status":"Won","closeDate":"2026-01-15","probability":"High","value":"244680","tentativeClose":"2026-01-31","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2026-01-08"},{"name":"Alias_174","owner":"OWNER_003","client":"COMPANY132","status":"Won","closeDate":"2026-01-15","probability":"High","value":"611700","tentativeClose":"2026-02-28","stage":"G. Project Won","product":"Pure Service","sector":"Renewables","createdDate":"2026-01-08"},{"name":"Alias_175","owner":"OWNER_003","client":"COMPANY078","status":"Won","closeDate":"2026-01-15","probability":"High","value":"1027656","tentativeClose":"2026-01-15","stage":"G. Project Won","product":"Pure Service","sector":"Railways","createdDate":"2025-11-18"}]};

// ─── DATA PROCESSING UTILITIES ───────────────────────────────────────────────
const parseNum = (s) => {
  if (!s || s === "#VALUE!" || s === "") return 0;
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
};

const fmtCr = (n) => {
  if (n >= 1e7) return `₹${(n/1e7).toFixed(2)}Cr`;
  if (n >= 1e5) return `₹${(n/1e5).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN", {maximumFractionDigits:0})}`;
};

// Pre-compute summary stats for the system prompt
const computeStats = () => {
  const wo = RAW_DATA.workOrders;
  const deals = RAW_DATA.deals.filter(d => d.name && d.stage !== "Deal Stage");

  const totalWOValue = wo.reduce((s,r) => s + parseNum(r.valueExGST), 0);
  const totalCollected = wo.reduce((s,r) => s + parseNum(r.collected), 0);
  const totalReceivable = wo.reduce((s,r) => s + parseNum(r.receivable), 0);
  const totalBilled = wo.reduce((s,r) => s + parseNum(r.billedExGST), 0);

  const openDeals = deals.filter(d => d.status === "Open");
  const wonDeals = deals.filter(d => d.status === "Won");
  const deadDeals = deals.filter(d => d.status === "Dead");
  const pipelineValue = openDeals.reduce((s,d) => s + parseNum(d.value), 0);
  const wonValue = wonDeals.reduce((s,d) => s + parseNum(d.value), 0);

  // Sector breakdown for WOs
  const woBySector = {};
  wo.forEach(r => {
    const sec = r.sector || "Unknown";
    if (!woBySector[sec]) woBySector[sec] = {count:0,value:0,collected:0};
    woBySector[sec].count++;
    woBySector[sec].value += parseNum(r.valueExGST);
    woBySector[sec].collected += parseNum(r.collected);
  });

  // Sector breakdown for deals
  const dealsBySector = {};
  openDeals.forEach(d => {
    const sec = d.sector || "Unknown";
    if (!dealsBySector[sec]) dealsBySector[sec] = {count:0,value:0};
    dealsBySector[sec].count++;
    dealsBySector[sec].value += parseNum(d.value);
  });

  // Stage funnel
  const stageMap = {};
  openDeals.forEach(d => {
    const s = d.stage || "Unknown";
    if (!stageMap[s]) stageMap[s] = {count:0,value:0};
    stageMap[s].count++;
    stageMap[s].value += parseNum(d.value);
  });

  // WO status breakdown
  const woByStatus = {};
  wo.forEach(r => {
    const s = r.status || "Unknown";
    woByStatus[s] = (woByStatus[s] || 0) + 1;
  });

  // High-value ongoing WOs
  const ongoingWOs = wo.filter(r => ["Ongoing","Not Started","Executed until current month","Partial Completed"].includes(r.status));
  const stuckWOs = wo.filter(r => r.status === "Pause / struck" || r.billingStatus === "Stuck");

  return {
    wo: {totalCount: wo.length, totalValue: totalWOValue, totalCollected, totalReceivable, totalBilled,
         bySector: woBySector, byStatus: woByStatus, ongoingCount: ongoingWOs.length,
         stuckCount: stuckWOs.length,
         topOngoing: ongoingWOs.sort((a,b) => parseNum(b.valueExGST)-parseNum(a.valueExGST)).slice(0,5)},
    deals: {total: deals.length, open: openDeals.length, won: wonDeals.length, dead: deadDeals.length,
            pipelineValue, wonValue, bySector: dealsBySector, byStage: stageMap,
            highProbOpen: openDeals.filter(d=>d.probability==="High"),
            lateDeals: openDeals.filter(d => d.tentativeClose && d.tentativeClose < "2026-03-10")}
  };
};

const STATS = computeStats();

const SYSTEM_PROMPT = `
You are a Business Intelligence analyst for Skylark Drones, a drone survey and geospatial data services company.

Your job is to help founders and leadership quickly understand the company’s operational and sales performance using internal data.

You have access to two internal datasets:
1. Work Orders Board (execution + billing performance)
2. Deals Board (sales pipeline and opportunities)

All names are anonymized (anime/cartoon characters) and company identifiers are masked.

--------------------------------
HOW YOU SHOULD THINK
--------------------------------

When answering questions:

• Focus on business insights, not just raw numbers  
• Connect insights across boards when relevant  
• Highlight risks, bottlenecks, and opportunities  
• Prioritize clarity and executive usefulness  

Always answer like an experienced **startup COO or BI analyst** speaking to founders.

--------------------------------
HOW TO FORMAT ANSWERS
--------------------------------

Use structured, executive-friendly responses.

Typical structure:

Summary  
Key Metrics  
Insights  
Risks / Watchouts  
Opportunities  

Use bullet points where helpful.

Use ₹ formatting with:
• Cr for crores
• L for lakhs

Example:
₹12.4Cr, ₹86.3L

--------------------------------
IMPORTANT ANALYSIS RULES
--------------------------------

• Do not invent data that is not provided
• If information is incomplete, clearly state the limitation
• When possible, compare metrics across boards
• Focus on what leadership should care about

--------------------------------
DATA QUALITY NOTES
--------------------------------

- Some records contain blank fields or "#VALUE!" errors (treated as 0)
- Some Work Orders have "Not Billable" status (POCs with ₹0 value)
- Billing status labels may have inconsistent capitalization
- Some older records may have missing fields
- All financial values are in INR

--------------------------------
WORK ORDERS BOARD
--------------------------------

Records: ${STATS.wo.totalCount}

Total Portfolio Value (Ex-GST): ${fmtCr(STATS.wo.totalValue)}
Total Billed (Ex-GST): ${fmtCr(STATS.wo.totalBilled)}
Total Collected (Inc-GST): ${fmtCr(STATS.wo.totalCollected)}
Total Receivable: ${fmtCr(STATS.wo.totalReceivable)}

Ongoing Work Orders: ${STATS.wo.ongoingCount}
Stuck / Paused Work Orders: ${STATS.wo.stuckCount}

Status Breakdown:
${Object.entries(STATS.wo.byStatus).map(([k,v])=>`- ${k}: ${v}`).join("\n")}

Sector Breakdown (Value Ex-GST):
${Object.entries(STATS.wo.bySector)
.sort((a,b)=>b[1].value-a[1].value)
.map(([k,v])=>`- ${k}: ${fmtCr(v.value)} (${v.count} WOs, collected ${fmtCr(v.collected)})`)
.join("\n")}

Top Ongoing Work Orders by Value:
${STATS.wo.topOngoing.map(w=>`- ${w.name} [${w.id}] — ${fmtCr(parseNum(w.valueExGST))} | ${w.sector} | ${w.status}`).join("\n")}

--------------------------------
DEALS BOARD
--------------------------------

Total Active Deals: ${STATS.deals.total}

Open Deals: ${STATS.deals.open}
Pipeline Value: ${fmtCr(STATS.deals.pipelineValue)}

Won Deals: ${STATS.deals.won}
Won Value: ${fmtCr(STATS.deals.wonValue)}

Dead / Lost Deals: ${STATS.deals.dead}

High Probability Deals: ${STATS.deals.highProbOpen.length}

Pipeline by Sector:
${Object.entries(STATS.deals.bySector)
.sort((a,b)=>b[1].value-a[1].value)
.map(([k,v])=>`- ${k}: ${fmtCr(v.value)} (${v.count} deals)`)
.join("\n")}

Pipeline Stage Funnel:
${Object.entries(STATS.deals.byStage)
.sort((a,b)=>b[1].value-a[1].value)
.map(([k,v])=>`- ${k}: ${fmtCr(v.value)} (${v.count} deals)`)
.join("\n")}

Top High-Probability Deals:
${STATS.deals.highProbOpen
.sort((a,b)=>parseNum(b.value)-parseNum(a.value))
.slice(0,10)
.map(d=>`- ${d.name} → ${d.client} | ${fmtCr(parseNum(d.value))} | ${d.sector} | Stage: ${d.stage} | Close: ${d.tentativeClose||"TBD"}`)
.join("\n")}

--------------------------------
YOUR TASK
--------------------------------

Answer leadership questions about:

• revenue performance  
• pipeline health  
• operational execution  
• billing and collections  
• sector performance  
• deal conversion  

Provide concise, data-backed analysis with clear business implications.
`;

// ─── SUGGESTED QUERIES ────────────────────────────────────────────────────────
const SUGGESTED = [
  "How's our pipeline looking for this quarter?",
  "What's our total receivables situation?",
  "Which sectors are performing best?",
  "Show me all stuck/paused work orders",
  "Prepare a leadership update for this week",
  "What's our win rate and deal velocity?",
  "Which deals are high probability and closing soon?",
  "How's collections vs billing tracking?",
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `**Skylark Drones BI Agent** ready.\n\nI have full access to your **Work Orders** (${STATS.wo.totalCount} records, ${fmtCr(STATS.wo.totalValue)} portfolio) and **Deal Funnel** (${STATS.deals.total} records, ${fmtCr(STATS.deals.pipelineValue)} open pipeline).\n\nAsk me anything — pipeline health, sector performance, collections, receivables, or ask for a leadership update.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setLoading(true);

      try {
    const apiMessages = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-nano-30b-a3b:free",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...apiMessages,
        ],
      }),
    });

    const data = await res.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "Sorry, I couldn't generate a response.";

    setMessages([
      ...newMessages,
      { role: "assistant", content: reply },
    ]);

  } catch (err) {
    console.error(err);
  }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Markdown renderer using plain CSS classes
  const renderContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
        elements.push(<p key={i} className="md-h2">{line.slice(2,-2)}</p>);
      } else if (line.startsWith("### ")) {
        elements.push(<p key={i} className="md-h3">{line.slice(4)}</p>);
      } else if (line.startsWith("## ")) {
        elements.push(<p key={i} className="md-h2">{line.slice(3)}</p>);
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        elements.push(
          <div key={i} className="md-li">
            <span className="md-li-dot">◆</span>
            <span className="md-li-text">{formatInline(line.slice(2))}</span>
          </div>
        );
      } else if (/^\d+\. /.test(line)) {
        const num = line.match(/^(\d+)\. /)[1];
        elements.push(
          <div key={i} className="md-li">
            <span className="md-num">{num}.</span>
            <span className="md-li-text">{formatInline(line.replace(/^\d+\. /, ""))}</span>
          </div>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} style={{height:6}} />);
      } else {
        elements.push(<p key={i} className="md-p">{formatInline(line)}</p>);
      }
      i++;
    }
    return elements;
  };

  const formatInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="md-bold">{p.slice(2,-2)}</strong>;
      if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="md-code">{p.slice(1,-1)}</code>;
      return p;
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }

        .chat-root {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          width: 100%;
          max-width: 780px;
          margin: 0 auto;
          font-family: 'DM Sans', sans-serif;
          background: #0d0d14;
          position: relative;
        }

        /* ── HEADER ── */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(13,13,20,0.95);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 20;
          flex-shrink: 0;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-logo {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 0 20px rgba(245,158,11,0.3);
          flex-shrink: 0;
        }
        .header-title { font-size: 14px; font-weight: 600; color: #f5f5f5; letter-spacing: 0.01em; }
        .header-sub { font-size: 11px; color: #555; margin-top: 1px; font-weight: 400; }
        .header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #3ecf8e;
          background: rgba(62,207,142,0.1);
          border: 1px solid rgba(62,207,142,0.2);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3ecf8e;
          box-shadow: 0 0 6px #3ecf8e;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── STATS TICKER ── */
        .stats-bar {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: none;
        }
        .stats-bar::-webkit-scrollbar { display: none; }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 18px;
          border-right: 1px solid rgba(255,255,255,0.05);
          min-width: fit-content;
          gap: 1px;
        }
        .stat-label { font-size: 10px; color: #444; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; }
        .stat-val { font-size: 13px; font-weight: 600; font-family: 'DM Mono', monospace; }

        /* ── MESSAGES ── */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          scrollbar-width: thin;
          scrollbar-color: #1e1e2e transparent;
        }
        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 4px; }

        .msg-row {
          display: flex;
          gap: 10px;
          animation: fadeUp 0.25s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-row.user { flex-direction: row-reverse; }

        .msg-avatar {
          width: 30px; height: 30px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .avatar-ai {
          background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.15));
          border: 1px solid rgba(245,158,11,0.25);
          color: #f59e0b;
        }
        .avatar-user {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8;
          font-size: 11px;
          font-weight: 600;
        }

        .msg-bubble {
          max-width: 82%;
          padding: 12px 16px;
          border-radius: 16px;
          line-height: 1.6;
          font-size: 14px;
        }
        .bubble-ai {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #d4d4d4;
          border-top-left-radius: 4px;
        }
        .bubble-user {
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          color: #e0e0f0;
          border-top-right-radius: 4px;
        }

        /* inline content styles */
        .bubble-ai .md-h2 { color: #f59e0b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin: 12px 0 6px; }
        .bubble-ai .md-h3 { color: #c8a951; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 10px 0 4px; }
        .bubble-ai .md-bold { color: #f0c060; font-weight: 600; }
        .bubble-ai .md-code { font-family: 'DM Mono', monospace; background: rgba(245,158,11,0.1); color: #fbbf24; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
        .bubble-ai .md-p { margin: 4px 0; color: #b0b0c0; font-size: 13.5px; }
        .bubble-ai .md-li { display: flex; gap: 8px; margin: 3px 0; padding-left: 4px; }
        .bubble-ai .md-li-dot { color: #f59e0b; flex-shrink: 0; font-size: 10px; margin-top: 5px; }
        .bubble-ai .md-li-text { color: #b0b0c0; font-size: 13.5px; }
        .bubble-ai .md-num { color: #f59e0b; flex-shrink: 0; font-family: 'DM Mono', monospace; font-size: 12px; margin-top: 2px; min-width: 18px; text-align: right; }

        /* ── TYPING INDICATOR ── */
        .typing-dots { display: flex; gap: 4px; align-items: center; padding: 4px 2px; }
        .typing-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #f59e0b;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* ── SUGGESTED QUERIES ── */
        .suggestions {
          padding: 0 20px 12px;
          flex-shrink: 0;
        }
        .suggestions-label { font-size: 11px; color: #333; margin-bottom: 8px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500; }
        .suggestions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .suggestion-chip {
          font-size: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #777;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .suggestion-chip:hover {
          background: rgba(245,158,11,0.08);
          border-color: rgba(245,158,11,0.3);
          color: #f59e0b;
          transform: translateY(-1px);
        }

        /* ── INPUT AREA ── */
        .input-area {
          padding: 12px 16px 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(13,13,20,0.98);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .input-box {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          padding: 10px 12px 10px 16px;
          transition: border-color 0.2s;
        }
        .input-box:focus-within {
          border-color: rgba(245,158,11,0.4);
          background: rgba(255,255,255,0.05);
        }
        .input-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e0e0e0;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          resize: none;
          line-height: 1.5;
          max-height: 120px;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .input-textarea::placeholder { color: #333; }
        .input-textarea::-webkit-scrollbar { display: none; }
        .send-btn {
          width: 34px; height: 34px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .send-btn:not(:disabled) {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #0d0d14;
          box-shadow: 0 2px 12px rgba(245,158,11,0.3);
        }
        .send-btn:not(:disabled):hover { transform: scale(1.06); box-shadow: 0 4px 16px rgba(245,158,11,0.4); }
        .send-btn:disabled { background: rgba(255,255,255,0.06); color: #2a2a2a; cursor: default; }
        .input-footer { text-align: center; font-size: 10.5px; color: #282830; margin-top: 8px; letter-spacing: 0.02em; }
      `}</style>

      <div className="chat-root">
        {/* Header */}
        <div className="chat-header">
          <div className="header-brand">
            <div className="header-logo">🛸</div>
            <div>
              <div className="header-title">Skylark Drones</div>
              <div className="header-sub">Business Intelligence Agent</div>
            </div>
          </div>
          <div className="header-status">
            <div className="status-dot" />
            Live
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          {[
            { label: "Portfolio", val: fmtCr(STATS.wo.totalValue), color: "#f59e0b" },
            { label: "Collected", val: fmtCr(STATS.wo.totalCollected), color: "#3ecf8e" },
            { label: "Receivable", val: fmtCr(STATS.wo.totalReceivable), color: "#f87171" },
            { label: "Pipeline", val: fmtCr(STATS.deals.pipelineValue), color: "#818cf8" },
            { label: "Won Deals", val: fmtCr(STATS.deals.wonValue), color: "#3ecf8e" },
            { label: "Work Orders", val: String(STATS.wo.totalCount), color: "#aaa" },
            { label: "Total Deals", val: String(STATS.deals.total), color: "#aaa" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-label">{s.label}</span>
              <span className="stat-val" style={{ color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="messages-area">
          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === "user" ? "user" : ""}`}>
              <div className={`msg-avatar ${m.role === "assistant" ? "avatar-ai" : "avatar-user"}`}>
                {m.role === "assistant" ? "✦" : "ME"}
              </div>
              <div className={`msg-bubble ${m.role === "assistant" ? "bubble-ai" : "bubble-user"}`}>
                {m.role === "assistant" ? renderContent(m.content) : (
                  <span style={{ fontSize: 14 }}>{m.content}</span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row">
              <div className="msg-avatar avatar-ai">✦</div>
              <div className="msg-bubble bubble-ai">
                <div className="typing-dots">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="suggestions">
            <div className="suggestions-label">Try asking</div>
            <div className="suggestions-grid">
              {SUGGESTED.map((s, i) => (
                <button key={i} className="suggestion-chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="input-area">
          <div className="input-box">
            <textarea
              ref={inputRef}
              className="input-textarea"
              value={input}
              rows={1}
              placeholder="Ask about pipeline, revenue, collections…"
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
              onInput={e => { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
            />
            <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="input-footer">Data from Monday.com · All identities masked · Powered by Claude</div>
        </div>
      </div>
    </>
  );
}
