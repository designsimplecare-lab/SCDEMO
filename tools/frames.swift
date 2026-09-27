import AVFoundation
import AppKit
let url = URL(fileURLWithPath: CommandLine.arguments[1])
let out = CommandLine.arguments[2]
let step = Double(CommandLine.arguments[3])!
let asset = AVURLAsset(url: url)
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
let dur = CMTimeGetSeconds(asset.duration)
var t = 0.0; var n = 0
while t < dur {
  if let img = try? gen.copyCGImage(at: CMTime(seconds: t, preferredTimescale: 600), actualTime: nil) {
    let rep = NSBitmapImageRep(cgImage: img)
    let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.7])!
    try! data.write(to: URL(fileURLWithPath: String(format: "%@/f%03d_%05.1fs.jpg", out, n, t)))
    n += 1
  }
  t += step
}
print("frames:", n, "duration:", dur)
