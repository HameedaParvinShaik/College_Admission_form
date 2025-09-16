export const config = {
  api: {
    bodyParser: false, // to parse FormData manually
  },
};

import formidable from 'formidable';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Parsing error' });

    global.submissions = global.submissions || [];
    global.submissions.push({
      name: fields.name,
      dob: fields.dob,
      gender: fields.gender,
      email: fields.email,
      phone: fields.phone,
      address: fields.address,
      course: fields.course,
      time: new Date(),
    });

    console.log('📩 Submission:', fields);
    return res.status(200).json({ ok: true });
  });
}
