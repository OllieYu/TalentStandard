using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            return await _awsService.GetStaticUrl(id, "ollie-talent");
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            switch (type)
            {
                case FileType.ProfilePhoto:
                case FileType.UserCV:
                case FileType.UserVideo:
                    return await SaveFileGeneral(file, "ollie-talent", null, true);
                default:
                    return null;
            }
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            switch (type)
            {
                case FileType.ProfilePhoto:
                case FileType.UserCV:
                case FileType.UserVideo:
                    return await DeleteFileGeneral(id, "ollie-talent");
                default:
                    return false;
            }
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            if (await _awsService.PutFileToS3(file.Name, file.OpenReadStream(), bucket, isPublic))
            {
                return await _awsService.GetStaticUrl(file.Name, bucket);
            }
            return null;
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            return await _awsService.RemoveFileFromS3(id, bucket);
        }
        #endregion
    }
}
