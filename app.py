from flask import Flask, render_template, request
import io
import fitz
import google.generativeai as palm

app = Flask(__name__)

palm.configure(api_key="AIzaSyCTIl8o_TjFgwbfleiJxnN1BmY-uvyVj44")

defaults = {
    'model': 'models/text-bison-001',
    'temperature': 0.6,
    'candidate_count': 1,
    'top_k': 40,
    'top_p': 0.95,
    'max_output_tokens': 1024,
    'stop_sequences': []
}

def summarize_pdf(pdf_text):
    prompt = f"Summarize the content in a professional, to the point and in a holistic manner, of the PDF:\n\n{pdf_text}"

    response = palm.generate_text(
        **defaults,
        prompt=prompt
    )
    return response.result

@app.route("/", methods=["GET", "POST"])
def index():
    summary = None
    if request.method == "POST":
        pdf = request.files["pdf"]
        if pdf:
            pdf_content = pdf.read()
            with fitz.open(stream=pdf_content, filetype="pdf") as doc:
                pdf_text = ""
                for page in doc:
                    pdf_text += page.get_text()
                summary = summarize_pdf(pdf_text)
    return render_template("index.html", summary=summary)


if __name__ == "__main__":
    app.run(debug=True)
