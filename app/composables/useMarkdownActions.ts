export function useMarkdownActions() {
	const copyText = async (text: string) => {
		if (import.meta.server) {
			return false
		}

		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text)
			return true
		}

		const textarea = document.createElement('textarea')
		textarea.value = text
		textarea.setAttribute('readonly', '')
		textarea.style.position = 'fixed'
		textarea.style.opacity = '0'
		document.body.appendChild(textarea)
		textarea.select()
		const success = document.execCommand('copy')
		document.body.removeChild(textarea)
		return success
	}

	const downloadMarkdown = (text: string, filename = 'AGENTS.md') => {
		if (import.meta.server) {
			return
		}

		const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = filename
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	return { copyText, downloadMarkdown }
}
