ActiveAdmin.register User do
    permit_params :title, :description, :steps, :source
end
