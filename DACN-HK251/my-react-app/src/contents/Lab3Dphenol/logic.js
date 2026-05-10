import { MAX_COLOR_STRENGTH } from "./constants"

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export function getTubeVisual(naohDrops, phenolDrops) {
  const hasBase = naohDrops > 0
  const hasIndicator = phenolDrops > 0

  if (!hasBase || !hasIndicator) {
    return {
      color: "#f8fafc",
      opacity: 0.18,
      status: "Chưa đổi màu",
      description:
        "Dung dịch vẫn chưa đổi màu. Cần có môi trường base và phenolphthalein mới xuất hiện màu hồng.",
    }
  }

  const total = Math.min(naohDrops + phenolDrops, MAX_COLOR_STRENGTH)

  if (total <= 2) {
    return {
      color: "#f9a8d4",
      opacity: 0.4,
      status: "Hồng nhạt",
      description:
        "Phenolphthalein đã gặp môi trường base nên dung dịch bắt đầu chuyển hồng nhạt.",
    }
  }

  if (total <= 4) {
    return {
      color: "#f472b6",
      opacity: 0.58,
      status: "Hồng",
      description:
        "Dung dịch đã chuyển hồng rõ do phenolphthalein trong môi trường base.",
    }
  }

  return {
    color: "#db2777",
    opacity: 0.78,
    status: "Hồng đậm",
    description:
      "Màu hồng đậm hơn khi lượng dung dịch được thêm vào nhiều hơn.",
  }
}

export function getLoadedLiquidColor(type) {
  if (type === "naoh") return "#60a5fa"
  if (type === "phenol") return "#f472b6"
  return "#e5e7eb"
}

export function getLiquidLabel(type) {
  if (type === "naoh") return "NaOH"
  if (type === "phenol") return "Phenolphthalein"
  return "Chưa nạp"
}

export function getInstruction({
  loadedBottle,
  overTube,
  naohDrops,
  phenolDrops,
}) {
  if (!loadedBottle) {
    return "Bấm vào đầu bóp đỏ của một chai để nạp dung dịch."
  }

  if (!overTube) {
    return "Kéo chai tới gần miệng ống nghiệm."
  }

  if (naohDrops === 0 && loadedBottle === "naoh") {
    return "Đang ở đúng vị trí. Nhấn giữ rồi thả ở đầu đỏ để nhỏ NaOH vào ống nghiệm."
  }

  if (naohDrops === 0 && loadedBottle === "phenol") {
    return "Bro nên nhỏ NaOH trước để tạo môi trường base, rồi mới thêm phenolphthalein."
  }

  if (phenolDrops === 0 && loadedBottle === "phenol") {
    return "Đúng rồi. Nhấn giữ rồi thả ở đầu đỏ để nhỏ phenolphthalein vào ống nghiệm."
  }

  if (loadedBottle === "naoh") {
    return "Có thể tiếp tục thêm NaOH, hoặc chuyển sang chai phenolphthalein để quan sát đổi màu."
  }

  return "Tiếp tục thao tác trực tiếp trên mô hình để quan sát sự thay đổi màu."
}