"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Plus, Search, Filter, Edit, Trash2, DoorOpen, Box } from "lucide-react"
import { MOCK_ROOMS } from "@/mocks/academic"
import { Badge } from "@/components/ui/badge"

export default function RoomManagementPage() {
  const { toast } = useToast()
  const [rooms, setRooms] = useState(MOCK_ROOMS)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<typeof MOCK_ROOMS[0] | null>(null)

  const filteredRooms = rooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.building.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "" || r.type === typeFilter
    return matchSearch && matchType
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingRoom ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu phòng học đã được lưu.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id))
    toast({ title: "Đã xóa phòng học", description: "Bản ghi đã bị xóa khỏi hệ thống." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Phòng học" 
        description="Quản lý danh sách phòng học, sức chứa và phân loại phòng chức năng." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingRoom(null); setIsModalOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Phòng học
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                placeholder="Tìm tên phòng, tòa nhà..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
              <Select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { label: "Tất cả loại", value: "" },
                  { label: "Lý thuyết", value: "Lý thuyết" },
                  { label: "Thực hành Tin", value: "Thực hành Tin" },
                  { label: "Thực hành Hóa", value: "Thực hành Hóa" },
                ]}
              />
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Lọc</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Tên Phòng</TableHead>
                  <TableHead>Tòa nhà</TableHead>
                  <TableHead>Loại phòng</TableHead>
                  <TableHead className="text-center">Sức chứa</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <DoorOpen className="w-4 h-4 text-primary" /> {room.name}
                    </TableCell>
                    <TableCell className="text-text-secondary">{room.building}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {room.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1">
                        <Box className="w-3 h-3 text-muted" /> {room.capacity}
                      </span>
                    </TableCell>
                    <TableCell>
                      {room.status === "Hoạt động" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Hoạt động</Badge>
                      ) : (
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">Bảo trì</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingRoom(room); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(room.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRooms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted">
                      Không tìm thấy phòng học nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRoom ? "Cập nhật phòng học" : "Thêm phòng học mới"}
        description="Điền thông tin phòng học, sức chứa tối đa và loại phòng."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Tên Phòng</label>
              <Input required defaultValue={editingRoom?.name} placeholder="VD: Phòng 101" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Tòa nhà</label>
              <Input required defaultValue={editingRoom?.building} placeholder="VD: Tòa A" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Sức chứa (người)</label>
              <Input required type="number" min={10} max={200} defaultValue={editingRoom?.capacity || 40} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Trạng thái</label>
              <Select 
                options={[
                  { label: "Hoạt động", value: "Hoạt động" },
                  { label: "Bảo trì", value: "Bảo trì" },
                ]}
                defaultValue={editingRoom?.status || "Hoạt động"}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-heading">Loại phòng</label>
            <Select 
              options={[
                { label: "Lý thuyết", value: "Lý thuyết" },
                { label: "Thực hành Tin", value: "Thực hành Tin" },
                { label: "Thực hành Hóa", value: "Thực hành Hóa" },
                { label: "Thể chất", value: "Thể chất" },
                { label: "Phòng chức năng khác", value: "Phòng chức năng khác" },
              ]}
              defaultValue={editingRoom?.type}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">Lưu</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
