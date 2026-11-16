const settings=import.meta.env||{};
export const enquiryEndpoint=settings.VITE_ENQUIRY_ENDPOINT||'';
export const enquiryEmail=settings.VITE_ENQUIRY_EMAIL||'hr@smartyieldpropeties.com';
export const enquiryButtonLabel=enquiryEndpoint?'Send Enquiry':'Continue in Email';
export function enquiryPayload(form,pageUrl){
 const values=new FormData(form);
 return {name:String(values.get('name')||'').trim(),phone:String(values.get('phone')||'').trim(),email:String(values.get('email')||'').trim(),message:String(values.get('message')||'').trim(),page:pageUrl};
}
export function enquiryEmailUrl(payload){
 const body=[`Name: ${payload.name}`,`Phone: ${payload.phone}`,`Email: ${payload.email}`,'',payload.message,'',`Property / page: ${payload.page}`].join('\n');
 return `mailto:${enquiryEmail}?subject=${encodeURIComponent('Property enquiry — SMART YIELD PROPERTY')}&body=${encodeURIComponent(body)}`;
}
export async function sendEnquiry(payload){
 const response=await fetch(enquiryEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
 if(!response.ok)throw new Error('We could not send your enquiry. Please try again or contact us by phone.');
}
